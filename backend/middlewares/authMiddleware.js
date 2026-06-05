const { verifyToken } = require('../utils/jwtUtil');
const { AdminUser } = require('../models');
const { apiResponse } = require('../utils/apiResponse');

const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json(apiResponse(false, 'Access denied. No token provided.'));
      }

      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token);

      const admin = await AdminUser.findByPk(decoded.id);
      if (!admin || !admin.isActive) {
        return res.status(401).json(apiResponse(false, 'Invalid token or inactive user.'));
      }

      if (roles.length > 0 && !roles.includes(admin.role)) {
        return res.status(403).json(apiResponse(false, 'Insufficient permissions.'));
      }

      req.admin = admin;
      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json(apiResponse(false, 'Token expired.'));
      }
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json(apiResponse(false, 'Invalid token.'));
      }
      next(err);
    }
  };
};

module.exports = authMiddleware;
