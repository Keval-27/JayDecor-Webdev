const express = require('express');
const router = express.Router();
const { postAMessage , getConsultantMessages} = require('./Consultant.controller');

router.post("/", postAMessage);

// Get all Projects
router.get("/",getConsultantMessages);

// POST: Save contact message

module.exports = router;