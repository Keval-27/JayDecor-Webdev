const axios = require('axios');
const Design = require("../Designs/Design.model");
const Project = require("../Projects/Project.model");

exports.getStyleBasedRecommendations = async (req, res) => {
  try {
    console.log("🎯 AI Style Finder Hit!");

    const answers = req.body;
    console.log("📝 User Quiz Answers:", answers);

    // Validate quiz answers (make sure all required fields present)
    const requiredFields = ["color", "furniture", "vibe", "space", "material"];
    const missing = requiredFields.filter(f => !(f in answers));
    if (missing.length > 0) {
      return res.status(400).json({ error: `Missing fields: ${missing.join(", ")}` });
    }

    // Call Flask AI backend to get predicted style
    const aiResponse = await axios.post("http://localhost:5000/predict", answers);
    const selectedStyle = aiResponse.data.style;

    if (!selectedStyle) {
      return res.status(500).json({ error: "AI prediction failed or returned no style" });
    }

    console.log("🧠 Predicted Style:", selectedStyle);

    // Query MongoDB for matching projects and designs
    const [projects, designs] = await Promise.all([
      Project.find({ style: { $regex: selectedStyle, $options: "i" } }),
      Design.find({ style: { $regex: selectedStyle, $options: "i" } }),
    ]);

    res.json({
      style: selectedStyle,
      matchingProjects: projects,
      matchingDesigns: designs,
    });
  } catch (error) {
    console.error("❌ Error in getStyleBasedRecommendations:", error.message);
    res.status(500).json({ message: "Server error while fetching style recommendations." });
  }
};
