const express = require('express');
const router = express.Router();

const validationRoutes = require('./validationRoutes');
const leadRoutes = require('./leadRoutes');
const reportRoutes = require('./reportRoutes');
const adminAuthRoutes = require('./adminAuthRoutes');
const adminLeadRoutes = require('./adminLeadRoutes');
const adminSettingsRoutes = require('./adminSettingsRoutes');

router.use('/validations', validationRoutes);
router.use('/leads', leadRoutes);
router.use('/reports', reportRoutes);
router.use('/admin/auth', adminAuthRoutes);
router.use('/admin/leads', adminLeadRoutes);
router.use('/admin/settings', adminSettingsRoutes);

module.exports = router;
