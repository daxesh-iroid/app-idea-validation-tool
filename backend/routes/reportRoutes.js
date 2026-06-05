const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/:id/pdf', reportController.generatePdf);

module.exports = router;
