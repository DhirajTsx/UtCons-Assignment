import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  action: String,
  articleId: mongoose.Schema.Types.ObjectId,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("AuditLog", logSchema);