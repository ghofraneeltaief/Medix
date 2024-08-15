var dbConn  = require('../../config/db.config');
var compterendu = function(compterendu){
    this.FichierCR   =   compterendu.FichierCR;
    this.Id_Rdv=compterendu.Id_Rdv;

}
 // get all compterendus
compterendu.getcompterendu = (Id_Rdv,result) =>{
    dbConn.query('SELECT * FROM rendezvous, actes ,imageriemedicale ,compterendu WHERE compterendu.Id_Rdv=rendezvous.Id_Rdv && rendezvous.Id_Acte=actes.Id_Acte && imageriemedicale.Id_Rdv=rendezvous.Id_Rdv && imageriemedicale.Id_Acte=actes.Id_Acte  && compterendu.Id_Rdv=?',Id_Rdv, (err, res)=>{
        if(err){
            console.log('Error while fetching compterendu', err);
            result(null,err);
        }else{
            console.log('compterendu fetched successfully');
            result(null,res);
        }
    })
}
compterendu.getAllcompterendu = (result) =>{
    dbConn.query('SELECT * FROM compterendu ', (err, res)=>{
        if(err){
            console.log('Error while fetching compterendu', err);
            result(null,err);
        }else{
            console.log('compterendu fetched successfully');
            result(null,res);
        }
    })
}

// create new compterendu
compterendu.createcompterendu = (compterenduReqData, result) =>{
    dbConn.query('INSERT INTO compterendu SET ?', compterenduReqData, (err, res)=>{
        if(err){
            console.log('Error while inserting data');
            result(null, err);
        }else{
            console.log('compterendu created successfully');
            result(null, res)
        }
    })
}
 
// update compterendu
compterendu.updatecompterendu = ( Id_Rdv,compterenduReqData, result)=>{
    dbConn.query("UPDATE compterendu SET FichierCR=? WHERE Id_Rdv=?", [compterenduReqData.FichierCR,Id_Rdv], (err, res)=>{
        if(err){
            console.log('Error while updating the compterendu');
            result(null, err.message);
        }else{
            console.log(compterenduReqData.FichierCR);
            console.log("compterendu updated successfully");
            result(null, res);
        }
    });
}
 
// delete compterendu
compterendu.deletecompterendu = (Id_Rdv, result)=>{
    dbConn.query('DELETE FROM compterendu WHERE Id_Rdv=?', [Id_Rdv], (err, res)=>{
        if(err){
            console.log('Error while deleting the compterendu');
            result(null, err);
        }else{
            result(null, res);
        }
    })
}
 
module.exports = compterendu;