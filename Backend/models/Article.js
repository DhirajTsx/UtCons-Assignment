import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft"
  }
}, { timestamps: true });

export default mongoose.model("Article", articleSchema);