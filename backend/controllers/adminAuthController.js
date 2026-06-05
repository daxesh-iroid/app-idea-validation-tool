const adminAuthService = require('../services/adminAuthService');
const AdminResource = require('../resources/adminResource');
const { apiResponse } = require('../utils/apiResponse');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token, admin } = await adminAuthService.login(email, password);
    return res.json(apiResponse(true, 'Login successful', {
      token,
      admin: AdminResource.user(admin),
    }));
  } catch (err) {
    next(err);
  }
};
