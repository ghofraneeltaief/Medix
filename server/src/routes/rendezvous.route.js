const express = require('express');
const router = express.Router();
 
const rendezvousController = require('../controllers/rendezvous.controller');
const rendezvousModel = require('../models/rendezvous.model');

router.get('/', rendezvousController.getrendezvousL);

// get ID for Update 
router.get('/:Id_Rdv',rendezvousController.getrendezvousByID);

// create new rendezvous
router.post('/', rendezvousModel.createrendezvous);

// update rendezvous
router.put('/:Id_Rdv', rendezvousController.updaterendezvous);
// delete rendezvous
router.delete('/:Id_Rdv',rendezvousController.deleterendezvous);
 
module.exports = router;