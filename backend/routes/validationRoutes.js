const express = require('express');
const router = express.Router();
const validationController = require('../controllers/validationController');

router.post('/', validationController.submitValidation);
router.get('/:id', validationController.getValidation);

module.exports = router;
