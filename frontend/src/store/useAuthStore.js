import { axiosInstance } from "../components/lib/axios.js";
import { create } from "zustand";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: JSON.parse(localStorage.getItem("authUser")) || null,
  isSigningUp: false,
  isLogging: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  isAuthenticated: !!localStorage.getItem("token"),
  onlineUsers: [],
  socket: null,

  // =========================
  // CHECK AUTH ON REFRESH
  // =========================
  checkAuth: async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        set({
          authUser: null,
          isCheckingAuth: false,
          isAuthenticated: false,
        });
        return;
      }

      // ✅ FIXED Authorization header formatting
      const res = await axiosInstance.get("/auth/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      set({
        authUser: res.data,
        isAuthenticated: true,
      });

      get().connectSocket();

      localStorage.setItem("authUser", JSON.stringify(res.data));
    } catch (error) {
      console.log("Error in checkAuth", error);

      // ❗ ONLY logout for actual token failure
      if (error?.response?.status === 401) {
        localStorage.removeItem("authUser");
        localStorage.removeItem("token");

        set({
          authUser: null,
          isAuthenticated: false,
        });
      }
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // =========================
  // SIGNUP
  // =========================
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      const userData = res.data.user || res.data;
      localStorage.setItem("authUser", JSON.stringify(userData));

      set({
        authUser: userData,
        isAuthenticated: true,
      });

      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      console.error("Error in signup:", error);
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // =========================
  // LOGIN
  // =========================
  login: async (data) => {
    set({ isLogging: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      const userData = res.data.user || res.data;
      localStorage.setItem("authUser", JSON.stringify(userData));

      set({
        authUser: userData,
        isAuthenticated: true,
      });

      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      console.error("Error in login:", error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      set({ isLogging: false });
    }
  },

  // =========================
  // LOGOUT
  // =========================
  logout: async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("authUser");

      await axiosInstance.post("/auth/logout", {}, { withCredentials: true });

      set({
        authUser: null,
        isAuthenticated: false,
      });

      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      console.error("Error in logout:", error);
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  },

  // =========================
  // UPDATE PROFILE
  // =========================
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });

      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error in update profile:", error);
      toast.error(
        error?.response?.data?.message || "Profile update failed"
      );
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // =========================
  // SOCKET CONNECTION
  // =========================
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: { userId: authUser._id },
    });

    socket.connect();

    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
