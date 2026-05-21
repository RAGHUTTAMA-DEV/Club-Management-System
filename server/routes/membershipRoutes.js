const express = require('express');
const router = express.Router();
const Membership = require('../models/Membership');

// GET all memberships
router.get('/', async (req, res) => {
  try {
    const memberships = await Membership.find().populate('student_id').populate('club_id');
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET memberships by club
router.get('/club/:clubId', async (req, res) => {
  try {
    const memberships = await Membership.find({ club_id: req.params.clubId }).populate('student_id');
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE membership
router.post('/', async (req, res) => {
  const body = { ...req.body };
  if (!body.membership_id) {
    body.membership_id = `MEM${Date.now()}`;
  }
  const membership = new Membership(body);
  try {
    const newMembership = await membership.save();
    const populatedMembership = await Membership.findById(newMembership._id).populate('student_id').populate('club_id');
    res.status(201).json(populatedMembership);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE membership
router.patch('/:id', async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);
    if (!membership) return res.status(404).json({ message: 'Membership not found' });
    
    Object.assign(membership, req.body);
    await membership.save();
    const updatedMembership = await Membership.findById(req.params.id).populate('student_id').populate('club_id');
    res.json(updatedMembership);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE membership
router.delete('/:id', async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);
    if (!membership) return res.status(404).json({ message: 'Membership not found' });
    
    await Membership.deleteOne({ _id: req.params.id });
    res.json({ message: 'Membership deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
