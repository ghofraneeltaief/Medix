const express = require('express');
const router = express.Router();
 
const imageriemedicaleController = require('../controllers/imageriemedicale.controller');
 
// get imageriemedicale
router.get('/', imageriemedicaleController.getimageriemedicaleList);
router.get('/Med', imageriemedicaleController.getimageriemedicaleMed);
router.get('/:Id_Image', imageriemedicaleController.getimgbyId);
router.get('/image/:Id_Rdv', imageriemedicaleController.getimgbyIdRdv);
// create new imageriemedicale
router.post('/', imageriemedicaleController.createNewimageriemedicale);
 
// delete imageriemedicale
router.delete('/:Id_Rdv',imageriemedicaleController.deleteimageriemedicale);
 
module.exports = router;