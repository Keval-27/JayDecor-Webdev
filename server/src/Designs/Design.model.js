const mongoose = require("mongoose");

const designSchema = new mongoose.Schema({
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
      required: true, // or false if you want to allow empty
    },
    tags: {
      type: [String],
      required: true,
    },
   createdAt:{
    type : Date,
    default : Date.now
  }
},
{
    timestamps: true,
}); 


const Design = mongoose.model('Design',designSchema);
module.exports = Design;