import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["admin", "editor", "viewer"],
    default: "viewer"
  }
});

export default mongoose.model("User", userSchema);