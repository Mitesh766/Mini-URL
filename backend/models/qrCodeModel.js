import mongoose, { mongo } from "mongoose";

const QrCodeSchema = new mongoose.Schema({
  shortUrlId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShortUrl",
    required: true,
  },
  qrImageUrl: {
    type: String,
    required: true,
  },
});

QrCodeSchema.index(
  {
    shortUrlId: 1,
  },
  {
    unique: true,
  }
);

const QrCode = mongoose.model("QrCode", QrCodeSchema);

export default QrCode;
