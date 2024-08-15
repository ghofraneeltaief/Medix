const express = require('express');
const router = express.Router();
 
const assistantController = require('../controllers/assistant.controller');
 
// get all assistant
router.get('/', assistantController.getassistantList);
 // update assistant
router.put('/:Id_Assistant', assistantController.updateassistant);
 
module.exports = router;