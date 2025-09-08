const express = require("express");
const router = express.Router();
const { getStyleBasedRecommendations } = require("./StyleFinder.controller");

router.post("/", getStyleBasedRecommendations);

module.exports = router;
