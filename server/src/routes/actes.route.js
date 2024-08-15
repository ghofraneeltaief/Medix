const express = require('express');
const router = express.Router();
 
const actesController = require('../controllers/actes.controller');
 
// get all actes
router.get('/', actesController.getactesList);

 
module.exports = router;