import QRCode from 'qrcode';
import cloudinary from './cloudinary.js';

export const generateAndUploadQR = async (url, code) => {
  try {
    const dataUrl = await QRCode.toDataURL(url);
    
    const uploadResponse = await cloudinary.uploader.upload(dataUrl, {
      folder: 'qr-codes',
      public_id: `${code}-qr`,
      overwrite: true,
    });

    return uploadResponse.secure_url; 
  } catch (error) {
    console.error('QR Upload Failed:', error);
    throw new Error('QR code generation or upload failed');
  }
};
