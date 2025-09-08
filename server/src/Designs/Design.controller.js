const Design = require("./Design.model");
const { default: mongoose } = require("mongoose");

// Create a new design

const postADesign = async (req, res) => {
  try {
    const newDesign = await Design({ ...req.body });
    await newDesign.save();
    res
      .status(200)
      .send({ message: "New Design Posted Successfully !", design: newDesign });
  } catch (error) {
    console.error("Error Creating Design", error);
    res.status(500).send({ message: "Failed to Create Design " });
  }
};

// Get all Designs
const getAllDesign = async (req, res) => {
  try {
    const designs = await Design.find().sort({ createdAt: -1 });
    res.status(200).send({ designs });
  } catch (error) {
    console.error("Error Fetching Designs", error);
    res.status(500).send({ message: "Failed to fetch Designs " });
  }
};

// get single Design
const getSingleDesign = async (req, res) => {
  try {
    const { id } = req.params;
    const design = await Design.findById(id);
    if (!design) {
      res.status(404).send({ message: "Design Not Found !" });
    }
    res.status(200).send(design);
  } catch (error) {
    console.error("Error Fetching Design", error);
    res.status(500).send({ message: "Failed to fetch a Design " });
  }
};

// Update a Design data
const updateDesign = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDesign = await Design.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedDesign) {
      res.status(404).send({ message: "Design Not Found !" });
    }
    res
      .status(200)
      .send({
        message: "Design Updated Successfully !",
        design: updatedDesign,
      });
  } catch (error) {
    console.error("Error updating Design", error);
    res.status(500).send({ message: "Failed to update a Design " });
  }
};

// Delete a Design
const deleteDesign = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDesign = await Design.findByIdAndDelete(id);
    if (!deletedDesign) {
      res.status(404).send({ message: "Design Not Found !" });
    }
    res
      .status(200)
      .send({
        message: "Design Deleted Successfully !",
        design: deletedDesign,
      });
  } catch (error) {
    console.error("Error delelting Design", error);
    res.status(500).send({ message: "Failed to delete a Design " });
  }
};

module.exports =
  {postADesign, getAllDesign, getSingleDesign, updateDesign, deleteDesign};
