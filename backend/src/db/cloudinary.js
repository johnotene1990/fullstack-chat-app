import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,   // ✅ Correct spelling
  api_key: process.env.CLOUDINARY_API_KEY,         // ✅ Correct spelling
  api_secret: process.env.CLOUDINARY_API_SECRET,   // ✅ Correct key name
});

export default cloudinary;
