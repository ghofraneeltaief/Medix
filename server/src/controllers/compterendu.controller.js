const compterenduModel = require('../models/compterendu.model');

 
// get compterendu by Name for earch by Name 
exports.getcompterendu = (req, res)=>{
    //console.log('get emp by id');
    compterenduModel.getcompterendu(req.params.idImg, (err, compterendu)=>{
        if(err)
        res.send(err);
        console.log('single compterendu data',compterendu);
        res.send(compterendu);
    })
}

exports.getAllcompterendu = (req, res)=>{
    //console.log('get emp by id');
    compterenduModel.getAllcompterendu( (err, compterendu)=>{
        if(err)
        res.send(err);
        console.log('single compterendu data',compterendu);
        res.send(compterendu);
    })
}
 
// create new compterendu
exports.createNewcompterendu = (req, res) =>{
    const compterenduReqData = new compterenduModel(req.body);
    console.log('compterenduReqData', compterenduReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        compterenduModel.createcompterendu(compterenduReqData, (err, compterendu)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'compterendu Created Successfully', data: compterendu.insertId})
        })
    }
}
 
 
// update compterendu
exports.updatecompterendu = (req, res)=>{
    const compterenduReqData = new compterenduModel(req.body);
    console.log('compterenduReqData update', compterenduReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        compterenduModel.updatecompterendu(req.params.Id_Rdv, compterenduReqData, (err, compterendu)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'compterendu updated Successfully'})
        })
    }
}
 
// delete compterendu
exports.deletecompterendu = (req, res)=>{
    compterenduModel.deletecompterendu(req.params.Id_Rdv, (err, compterendu)=>{
        if(err)
        res.send(err);
        res.json({success:true, message: 'compterendu deleted successully!'});
    })
}

