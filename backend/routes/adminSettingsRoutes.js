const express = require('express');
const router = express.Router();
const adminSettingsController = require('../controllers/adminSettingsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware());

router.get('/weights', adminSettingsController.getWeights);
router.put('/weights/:type', authMiddleware(['admin']), adminSettingsController.updateWeights);
router.get('/templates', adminSettingsController.getTemplates);
router.put('/templates/:id', authMiddleware(['admin']), adminSettingsController.updateTemplate);

module.exports = router;
