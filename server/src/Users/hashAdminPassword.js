const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./user.model'); // adjust path
const mongoUri = "mongodb+srv://KevalSid:mh6704MSZePpdUKm@cluster0.wap2w.mongodb.net/JD-Studio?retryWrites=true&w=majority&appName=Cluster0";

async function hashAdminPassword() {
  try {
    await mongoose.connect(mongoUri);

    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      console.log("Admin user not found!");
      return;
    }

    const plainPassword = "Jaysid08";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    admin.password = hashedPassword;
    await admin.save();

    console.log("Admin password hashed and saved successfully.");
    await mongoose.disconnect();
  } catch (err) {
    console.error("Error:", err);
  } 
}

hashAdminPassword();
