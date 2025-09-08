const express = require("express");
const router = express.Router();
const verifyAdminToken = require("../middleware/verifyAdminToken");
const isAuthenticated  = require("../middleware/isAuthenticated")

const {
  postAProject,
  getAllProject,
  getSingleProject,
  updateProject,
  deleteProject,
  likeProject,
  getLikedProjectsForUser
} = require("./Project.controller");

//  Post a Project (Admin only)
router.post("/create-project", verifyAdminToken, postAProject);

// Get all Projects
router.get("/", getAllProject);

//  Get single Project
router.get("/:id", getSingleProject);

//  Update a Project
router.put("/update/:id", updateProject);

//  Delete a Project
router.delete("/:id", deleteProject);

router.put("/like/:projectId", isAuthenticated, likeProject);
router.get("/liked/dashboard", isAuthenticated, getLikedProjectsForUser);


module.exports = router;
