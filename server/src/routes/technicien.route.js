const express = require('express');
const router = express.Router();
 
const technicienController = require('../controllers/technicien.controller');
 
router.get('/med', technicienController.getMed);
// update technicien
router.put('/:Id_TechRadio', technicienController.updatetechnicien);
 
module.exports = router;