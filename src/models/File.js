import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  filename: String,
  key: String,
  size: Number,
  contentType: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model("File", fileSchema);
