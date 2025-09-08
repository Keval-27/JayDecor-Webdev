const mongoose = require('mongoose');


const consultantSchema = new mongoose.Schema(
  {
    propertyType: {
      type: String,
      required: true,
      enum: ["Residential", "Commercial", "Industrial", "Land"],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    whatsappUpdates: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Consultant = mongoose.model("Consultant", consultantSchema);

 module.exports = Consultant;