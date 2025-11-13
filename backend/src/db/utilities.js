import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // ✅ Corrected: ensure cookie setup is valid
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    httpOnly: true, // prevent JS access (XSS protection)
    sameSite: "lax", // CSRF protection
    secure: process.env.NODE_ENV !== "development", // ✅ fixed typo (NODE_ENV not NODE.ENV)
  });

  return token;
};