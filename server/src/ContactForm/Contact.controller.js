const Contact = require('./ContactModel');

const postAMessage = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: 'Contact message saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save contact message' });
  }
};

// GET: Fetch all contact messages
const getContactMessages = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact messages' });
  }
};  


module.exports = {
    postAMessage,
    getContactMessages
  };