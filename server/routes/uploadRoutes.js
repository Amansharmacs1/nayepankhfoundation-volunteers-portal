import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const router = express.Router();

router.post('/', upload.single('file'), async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'nvms',
      resource_type: 'auto', // Auto detects image or raw (pdf)
    });

    // Delete local file after upload
    fs.unlinkSync(req.file.path);

    res.send({
      message: 'File Uploaded Successfully',
      url: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file' });
  }
});

export default router;
