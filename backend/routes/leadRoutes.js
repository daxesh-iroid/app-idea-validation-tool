const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

router.post('/', leadController.createLead);
router.get('/:id', leadController.getLead);

module.exports = router;
