const express = require('express');
const router = express.Router();
const { postAMessage , getContactMessages} = require('./Contact.controller');

router.post("/", postAMessage);

// Get all Projects
router.get("/",getContactMessages);

// POST: Save contact message

module.exports = router;
