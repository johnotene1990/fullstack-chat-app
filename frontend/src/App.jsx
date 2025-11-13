import { useEffect } from 'react';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SettingPage from './pages/SettingPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';
import { useAuthStore } from './store/useAuthStore';
import { Loader} from "lucide-react";
import { Toaster} from "react-hot-toast";
import { useThemeStor } from './Stor/useThemeStor';

const App = () => {
  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();
  const {theme} = useThemeStor();

  console.log((onlineUsers));

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

   console.log({authUser});

  if(isCheckingAuth && !authUser) 
    return (
    <div className=" flex items-center justify-center h-screen" >
      <Loader className=" size-10 animate-spin" />
    </div>
  )

  return (
    <div data-theme={theme}>

      <Navbar />

      <Routes>
        <Route path='/' element={ authUser ? <HomePage /> : <Navigate to="/Login"/> } />
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to="/"/> } />
        <Route path='/login' element={ !authUser ? <LoginPage /> : <Navigate to="/"/> } />
        <Route path='/settings' element={ <SettingPage />} />
        <Route path='/profile' element={ authUser ? <ProfilePage /> : <Navigate to="/login"/> } />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;

