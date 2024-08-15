const express = require('express');
const router = express.Router();
 
const medecincentreController = require('../controllers/medecincentre.controller');
 
// get all medecincentre
router.get('/', medecincentreController.getMed);
 
// update medecincentre
router.put('/:Id_Medecin_Centre', medecincentreController.updatemedecincentre);
 
 
module.exports = router;