import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // pehle purane users delete (optional)
    await User.deleteMany();

    const hashedPassword = await bcrypt.hash("123456", 10);

    const users = [
      {
        name: "Admin User",
        email: "admin@test.com",
        password: hashedPassword,
        role: "admin"
      },
      {
        name: "Editor User",
        email: "editor@test.com",
        password: hashedPassword,
        role: "editor"
      },
      {
        name: "Viewer User",
        email: "viewer@test.com",
        password: hashedPassword,
        role: "viewer"
      }
    ];

    await User.insertMany(users);

    console.log("✅ Users Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUsers();