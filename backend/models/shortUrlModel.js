import mongoose from "mongoose";
const ShortUrlSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    originalUrl: { type: String, required: true },
    shortCode: { type: String, unique: true, required: true },
    shortUrl: { type: String, unique: true, required: true },
    isCustomAlias: { type: Boolean, default: false },
    isPasswordProtected: { type: Boolean, default: false },
    password: { type: String },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
    isActive: { type: Boolean, default: true },
    isOneTime: { type: Boolean, default: false },
    hasBeenUsed: { type: Boolean, default: false },
     qrUrl: { type: String },
    clickCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ShortUrlSchema.index({ shortCode: 1 });
ShortUrlSchema.index({ userId: 1 });
ShortUrlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const ShortUrl = mongoose.model("ShortUrl", ShortUrlSchema);

export default ShortUrl;
