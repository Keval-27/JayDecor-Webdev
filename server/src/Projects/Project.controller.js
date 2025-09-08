const Project = require("./Project.model");
const User = require("../Users/user.model");
const { default: mongoose } = require("mongoose");


// Post a Project 
const postAProject = async (req, res) => {
    
    try{
        const newProject = await Project({...req.body});
        await newProject.save();
        res.status(200).send({message:"Project Posted Successfully !", project : newProject})
    }
    catch(error){
        console.error("Error Creating Project",error);
        res.status(500).send({message:"Failed to Create Project " })

    }
}

// Get all Projects
const getAllProject = async (req, res) => {

    try{
        const projects = await Project.find().sort({createdAt:-1});
        res.status(200).send({projects})
    }
    catch(error){   
        console.error("Error Fetching Projects",error);
        res.status(500).send({message:"Failed to fetch projects " })

    }
}

// get single project
const getSingleProject =  async (req, res) => {

    try{
        const {id} = req.params;
        const project = await Project.findById(id);
        if(!project){
            res.status(404).send({message:"Project Not Found !"});
        }
        res.status(200).send(project);
    }
    catch(error){
        console.error("Error Fetching  Project",error);
        res.status(500).send({message:"Failed to fetch a project " })

    }
}

// Update a Project data
const updateProject =  async (req, res) => {

    try{
        const {id} = req.params;
        const updatedProject = await Project.findByIdAndUpdate(id,req.body,{new:true});
        if(!updatedProject){
            res.status(404).send({message:"Project Not Found !"});
        }
        res.status(200).send({message:"Project Updated Successfully !",project:updatedProject});
    }
    catch(error){
        console.error("Error updating Project",error);
        res.status(500).send({message:"Failed to update a project " })

    }
}

// Delete a Project 
const deleteProject =  async (req, res) => {

    try{
        const {id} = req.params;
        const deletedProject = await Project.findByIdAndDelete(id);
        if(!deletedProject){
            res.status(404).send({message:"Project Not Found !"});
        }
        res.status(200).send({message:"Project Deleted Successfully !", project:deletedProject});
    }
    catch(error){
        console.error("Error delelting Project",error);
        res.status(500).send({message:"Failed to delete a project " })

    }
}


const likeProject = async (req, res) => {
  try {
    const userId = req.user._id;
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await Project.findById(projectId).select("likes likedBy");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const isLiked = project.likedBy.includes(userId);
    const update = {};

    if (isLiked) {
      update.$pull = { likedBy: userId };
      update.$inc = { likes: -1 };
    } else {
      update.$addToSet = { likedBy: userId };
      update.$inc = { likes: 1 };
    }

    // Apply atomic update to avoid full save (bypass validation)
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      update,
      { new: true }
    );

    // Update user's likedProjects
    await User.findByIdAndUpdate(userId, {
      [isLiked ? "$pull" : "$addToSet"]: { likedProjects: projectId },
    });

    return res.status(200).json({
      success: true,
      isLiked: !isLiked,
      likes: updatedProject.likes,
    });

  } catch (error) {
    console.error("Like error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


const getLikedProjectsForUser = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming req.user._id is available from authentication
    const user = await User.findById(userId)
      .populate('likedProjects') // Make sure 'likedProjects' is populated
      .exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      likedProjects: user.likedProjects
    });
  } catch (error) {
    console.error("Error in getLikedProjectsForUser:", error);
    res.status(500).json({
      message: "Failed to fetch liked projects",
      error: error.message
    });
  }
};


module.exports = {
    postAProject,
    getAllProject,
    getSingleProject,
    updateProject,
    deleteProject,
    getLikedProjectsForUser,
    likeProject 

};