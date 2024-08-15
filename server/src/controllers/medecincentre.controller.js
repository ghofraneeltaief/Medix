const medecincentreModel = require('../models/medecincentre.model');
 
const jwt = require("jsonwebtoken");

    
// get all medecincentre list
exports.getMed = (req, res)=> {
    const token =req.header("Authorization")
    console.log("t",token);
const s = jwt.decode (token)
console.log(s)
const id = s.result
    //console.log('here all medecincentre list');
    medecincentreModel.getMed(id ,(err, medecincentre) =>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('medecincentre', medecincentre);
        res.send(medecincentre)
    })
}

 
// update medecincentre
exports.updatemedecincentre = (req, res)=>{
    const medecincentreReqData = new medecincentreModel(req.body);
    console.log('medecincentreReqData update', medecincentreReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        medecincentreModel.updatemedecincentre(req.params.Id_Medecin_Centre, medecincentreReqData, (err, medecincentre)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'medecincentre updated Successfully'})
        })
    }
}
