const express = require('express');
const router = express.Router();
 
const compterenduController = require('../controllers/compterendu.controller');
 
// get all compterendu
router.get('/cr/:idImg', compterenduController.getcompterendu);
router.get('/', compterenduController.getAllcompterendu);

// create new compterendu
router.post('/', compterenduController.createNewcompterendu);
 
// update compterendu
router.put('/:Id_Rdv', compterenduController.updatecompterendu);
 
// delete compterendu
router.delete('/:Id_Rdv',compterenduController.deletecompterendu);
 
module.exports = router;