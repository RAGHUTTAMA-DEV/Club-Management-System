const jwt = require('jsonwebtoken');
const Membership = require('../models/Membership');

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// Check if user is club leader (President or Vice-President)
const isClubLeader = async (req, res, next) => {
  try {
    const { clubId } = req.body || req.params;
    
    const membership = await Membership.findOne({
      student_id: req.userId,
      club_id: clubId,
      role: { $in: ['President', 'Vice-President'] }
    });

    if (!membership) {
      return res.status(403).json({ message: 'Only club leaders can perform this action' });
    }

    req.clubLeader = true;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check if user is club member
const isClubMember = async (req, res, next) => {
  try {
    const { clubId } = req.body || req.params;
    
    const membership = await Membership.findOne({
      student_id: req.userId,
      club_id: clubId
    });

    if (!membership) {
      return res.status(403).json({ message: 'You must be a member of this club' });
    }

    req.membership = membership;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Optional: Check membership role
const checkRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const { clubId } = req.body || req.params;
      
      const membership = await Membership.findOne({
        student_id: req.userId,
        club_id: clubId
      });

      if (!membership || !allowedRoles.includes(membership.role)) {
        return res.status(403).json({ 
          message: `Only ${allowedRoles.join(', ')} can perform this action` 
        });
      }

      req.membership = membership;
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = {
  verifyToken,
  isClubLeader,
  isClubMember,
  checkRole
};
