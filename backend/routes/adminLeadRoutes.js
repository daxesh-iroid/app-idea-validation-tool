const express = require('express');
const router = express.Router();
const adminLeadController = require('../controllers/adminLeadController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware());

router.get('/', adminLeadController.getLeads);
router.get('/:id', adminLeadController.getLead);
router.put('/:id', adminLeadController.updateLead);

module.exports = router;
