const Consultant = require('./Consultant.Model');

const postAMessage = async (req, res) => {
  try {
    const newConsultant = new Consultant(req.body);
    await newConsultant.save();
    res.status(201).json({ message: 'Consultant message saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save Consultant message' });
  }
};

// GET: Fetch all contact messages
const getConsultantMessages = async (req, res) => {
  try {
    const consultants = await Consultant.find();
    res.status(200).json(consultants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Consultant messages' });
  }
};  


module.exports = {
    postAMessage,
    getConsultantMessages
  };