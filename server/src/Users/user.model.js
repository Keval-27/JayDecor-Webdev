const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    // For Google login
    googleId: { type: String, unique: true, sparse: true },

    // Common fields
    displayName: String,
    email: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },
    image: String,

    // Local login fields (only required when googleId is not present)
    username: {
      type: String,
      required: function () {
        return !this.googleId;
      },
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },

    // Role-based access
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // Projects this user has liked
    likedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  },
  { timestamps: true }
);

// Hash password before saving (only for local users)
userSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Helper method to clean up the user object before sending to client
userSchema.methods.toClient = function () {
  return {
    id: this._id,
    username: this.username || this.displayName,
    email: this.email,
    role: this.role,
    authType: this.googleId ? "google" : "local",
  };
};

const User = mongoose.model("User", userSchema);
module.exports = User;
