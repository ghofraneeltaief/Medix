const actesModel = require('../models/actes.model');
 
// get all actes list
exports.getactesList = (req, res)=> {
    //console.log('here all actes list');
    actesModel.getAllactes((err, actes) =>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('actes', actes);
        res.send(actes)
    })
}
 