import mongoose from "mongoose";

const ClickEventSchema = new mongoose.Schema(
  {
    shortUrlId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShortUrl",
      required: true,
    },

    clickedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

ClickEventSchema.index({
  shortUrlId: 1,
  clickedAt: 1,
});

ClickEventSchema.index(
  {
    clickedAt: 1,
  },
  {
    expireAfterSeconds: 604800,
  }
);

const ClickEvent = mongoose.model("ClickEvent", ClickEventSchema);

export default ClickEvent;
