const { AdminUser } = require('../models');
const { signToken } = require('../utils/jwtUtil');

/**
 * Admin login: validate credentials and return JWT.
 */
const login = async (email, password) => {
  const admin = await AdminUser.findOne({
    where: { email, isActive: true },
  });

  if (!admin) {
    const err = new Error('Invalid email or password');
    err.status = 401;
    throw err;
  }

  const isMatch = await admin.validatePassword(password);
  if (!isMatch) {
    const err = new Error('Invalid email or password');
    err.status = 401;
    throw err;
  }

  const token = signToken({
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  });

  return {
    token,
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  };
};

/**
 * Create a new admin user.
 */
const createAdmin = async (data) => {
  const existing = await AdminUser.findOne({
    where: { email: data.email },
  });

  if (existing) {
    const err = new Error('Admin with this email already exists');
    err.status = 409;
    throw err;
  }

  const admin = await AdminUser.create(data);

  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    isActive: admin.isActive,
  };
};

module.exports = {
  login,
  createAdmin,
};
