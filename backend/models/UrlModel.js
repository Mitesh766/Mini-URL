const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    trim: true
  },
  alias: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 30,
    match: /^[a-zA-Z0-9-_]+$/
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expireAt: {
    type: Date,
    required: true
  },
  clickCount: {
    type: Number,
    default: 0
  }
});


urlSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('ShortUrl', urlSchema);
