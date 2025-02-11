import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';
import path from 'path';

import { env } from './env.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: env(CLOUDINARY.CLOUD_NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  if (!file?.path) {
    console.log('No valid file path provided.');
    return null;
  }

  const filePath = path.resolve(file.path);
  console.log('Resolved file path for upload:', filePath);

  try {
    const response = await cloudinary.v2.uploader.upload(filePath);
    console.log('Cloudinary response:', response);
    await fs.unlink(filePath);
    return response.secure_url;
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    return null;
  }
};
