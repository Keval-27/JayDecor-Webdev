const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    img: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
     style: {
      type: String,
      required: true, 
      default: "Modern"
    },
    tags: {
      type: [String],
      required: false,
      default: []
    },
    desc: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

    likes: {
      type: Number,
      default: 0,
      min : 0
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
