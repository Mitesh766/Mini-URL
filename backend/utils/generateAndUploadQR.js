import QRCode from "qrcode";
import cloudinary from "../config/cloudinary.js";

export const generateAndUploadQR = async (url, code) => {
  try {
    const qrOptions = {
      errorCorrectionLevel: "H", // High error correction for better scanability
      width: 500, // Larger size, 500px wide (adjust as needed)
      margin: 2, // Margin around QR code
      color: {
        dark: "#000000", // QR code color
        light: "#FFFFFF", // Background color
      },
    };
    const dataUrl = await QRCode.toDataURL(url, qrOptions);
    const uploadResponse = await cloudinary.uploader.upload(dataUrl, {
      folder: "qr-codes",
      public_id: `${code}-qr`,
      overwrite: true,
    });

    return uploadResponse.secure_url;
  } catch (error) {
    console.error("QR Upload Failed:", error);
    throw new Error("QR code generation or upload failed");
  }
};
