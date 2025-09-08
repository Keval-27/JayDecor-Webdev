const express = require("express");
const router = express.Router();
const verifyAdminToken = require("../middleware/verifyAdminToken");
const {postADesign, getAllDesign, getSingleDesign, updateDesign, deleteDesign} = require("./Design.controller");

//  Post a Design (Admin only)
router.post("/create-design", verifyAdminToken, postADesign);

// Get all Design
router.get("/", getAllDesign);

//  Get single Design
router.get("/:id", getSingleDesign);

//  Update a Design
router.put("/update/:id", updateDesign);

//  Delete a Design
router.delete("/:id", deleteDesign);
    
module.exports = router;
