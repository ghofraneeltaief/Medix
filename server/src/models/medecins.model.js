var dbConn  = require('../../config/db.config');
var medecins = function(medecins){
    this.Nom_Medecin = medecins.Nom_Medecin,
    this.Prenom_Medecin = medecins.Prenom_Medecin,
    this.MotPass_Medecin = medecins.MotPass_Medecin,
    this.Tel_Medecin = medecins.Tel_Medecin,
    this.Email_Medecin=medecins.Email_Medecin
}

// get all medecinss
medecins.getAllmedecins = (id,result) =>{
    dbConn.query('SELECT * FROM medecins WHERE medecins.Id_Medecin=?',id, (err, res)=>{
        if(err){
            console.log('Error while fetching medecins', err);
            result(null,err);
        }else{
            console.log('medecins fetched successfully');
            result(null,res);
        }
    })
}

medecins.getmed = (result) =>{
    dbConn.query('SELECT * FROM medecins', (err, res)=>{
        if(err){
            console.log('Error while fetching medecins', err);
            result(null,err);
        }else{
            console.log('medecins fetched successfully');
            result(null,res);
        }
    })
}
 
medecins.updatemedecins = (Id_Medecin, medecinsReqData, result)=>{
    dbConn.query("UPDATE medecins SET Nom_Medecin=?,Prenom_Medecin=?, Email_Medecin=?, MotPass_Medecin=?,Tel_Medecin=? WHERE Id_Medecin=? ", [medecinsReqData.Nom_Medecin,medecinsReqData.Prenom_Medecin,medecinsReqData.Email_Medecin,medecinsReqData.MotPass_Medecin,medecinsReqData.Tel_Medecin,Id_Medecin], (err, res)=>{
        if(err){
            console.log('Error while updating the medecins');
            result(null, err);
        }else{
            console.log("medecins updated successfully");
            result(null, res);
        }
    });
}

 
 
 

 

module.exports = medecins;