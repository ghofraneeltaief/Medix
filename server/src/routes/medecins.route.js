const express = require('express');
const router = express.Router();
 
const medecinsController = require('../controllers/medecins.controller');
 
// get all medecins
router.get('/', medecinsController.getmedecinsList);
router.get('/m', medecinsController.getmed);

// update medecins
router.put('/:Id_Medecin', medecinsController.updatemedecins);

module.exports = router;