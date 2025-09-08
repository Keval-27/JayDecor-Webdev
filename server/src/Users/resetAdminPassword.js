require("dotenv").config(); // Load env variables (if you use dotenv)
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./user.model"); // Adjust path as needed

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://KevalSid:mh6704MSZePpdUKm@cluster0.wap2w.mongodb.net/JD-Studio?retryWrites=true&w=majority&appName=Cluster0";

async function resetPassword() {
  try {
    // Connect to DB
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const username = "Jay";
    const role = "admin";
    const newPlainPassword = "Jaysid08";
    const saltRounds = 10;

    // Hash the new password
    const newHashedPassword = await bcrypt.hash(newPlainPassword, saltRounds);

    // Update admin user's password
    const result = await User.updateOne(
      { username, role },
      { $set: { password: newHashedPassword } }
    );

    console.log("Password reset result:", result);

    // Disconnect from DB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");

  } catch (error) {
    console.error("Error resetting password:", error);
  }
}

resetPassword();
