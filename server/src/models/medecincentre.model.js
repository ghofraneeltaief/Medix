var dbConn  = require('../../config/db.config');
var medecincentre = function(medecincentre){
    this.Nom_Medecin_Centre = medecincentre.Nom_Medecin_Centre,
    this.Prenom_Medecin_Centre = medecincentre.Prenom_Medecin_Centre,
    this.MotPass_Medecin_Centre = medecincentre.MotPass_Medecin_Centre,
    this.Tel_Medecin_Centre = medecincentre.Tel_Medecin_Centre,
    this.Email_Medecin_Centre=medecincentre.Email_Medecin_Centre
}

// get all medecincentres
medecincentre.getMed = (id,result) =>{
    dbConn.query('SELECT * FROM medecincentre WHERE medecincentre.Id_Medecin_Centre=?',id, (err, res)=>{
        if(err){
            console.log('Error while fetching medecincentre', err);
            result(null,err);
        }else{
            console.log('medecincentre fetched successfully');
            result(null,res);
        }
    })
}

 
 
// update medecincentre
medecincentre.updatemedecincentre = (Id_Medecin_Centre, medecincentreReqData, result)=>{
    dbConn.query("UPDATE medecincentre SET Nom_Medecin_Centre=?,Prenom_Medecin_Centre=?, MotPass_Medecin_Centre=?, Email_Medecin_Centre=?,  Tel_Medecin_Centre=? WHERE Id_Medecin_Centre = ?", [medecincentreReqData.Nom_Medecin_Centre,medecincentreReqData.Prenom_Medecin_Centre,medecincentreReqData.MotPass_Medecin_Centre,medecincentreReqData.Email_Medecin_Centre,medecincentreReqData.Tel_Medecin_Centre,Id_Medecin_Centre], (err, res)=>{
        if(err){
            console.log('Error while updating the medecincentre');
            result(null, err);
        }else{
            console.log("medecincentre updated successfully");
            result(null, res);
        }
    });
}
 
 
module.exports = medecincentre;