const medecinsModel = require('../models/medecins.model');
const jwt = require("jsonwebtoken");

// get all medecins list
exports.getmedecinsList = (req, res)=> {
    //console.log('here all medecins list');
    const token =req.header("Authorization")
    console.log("t",token);
const s = jwt.decode (token)
console.log(s)
const id = s.result
    medecinsModel.getAllmedecins(id,(err, medecins) =>{
        console.log('We are here');
        if(err) return res.send(err);
        console.log('medecins', medecins);
        res.send(medecins)
    })
}

exports.getmed = (req, res)=> {
    //console.log('here all medecins list');
    medecinsModel.getmed((err, medecins) =>{
        console.log('We are here');
        if(err) return res.send(err);
        console.log('medecins', medecins);
        res.send(medecins)
    })
}
// update medecins
exports.updatemedecins = (req, res)=>{
    const medecinsReqData = new medecinsModel(req.body);
    console.log('medecinsReqData update', medecinsReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        medecinsModel.updatemedecins(req.params.Id_Medecin, medecinsReqData, (err, medecins)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'medecins updated Successfully'})
        })
    }
}
