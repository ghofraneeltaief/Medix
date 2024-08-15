var dbConn  = require('../../config/db.config');
var assistants = function(assistants){
    this.Nom_Assistant = assistants.Nom_Assistant,
    this.Prenom_Assistant = assistants.Prenom_Assistant,
    this.MotPass_Assistant = assistants.MotPass_Assistant,
    this.Tel_Assistant = assistants.Tel_Assistant,
    this.Email_Assistant=assistants.Email_Assistant
}

// get all assistantss
assistants.getAllassistants = (id,result) =>{
    dbConn.query('SELECT * FROM assistants WHERE assistants.Id_Assistant=?',id, (err, res)=>{
        if(err){
            console.log('Error while fetching assistants', err);
            result(null,err);
        }else{
            console.log('assistants fetched successfully');
            result(null,res);
        }
    })
}

// update assistant
assistants.updateassistant = (Id_Assistant, assistantReqData, result)=>{
    dbConn.query("UPDATE assistants SET Nom_Assistant=?,Prenom_Assistant=?, MotPass_Assistant=?, Email_Assistant=?,  Tel_Assistant=? WHERE Id_Assistant = ?", [assistantReqData.Nom_Assistant,assistantReqData.Prenom_Assistant,assistantReqData.MotPass_Assistant,assistantReqData.Email_Assistant,assistantReqData.Tel_Assistant,Id_Assistant], (err, res)=>{
        if(err){
            console.log('Error while updating the assistant');
            result(null, err);
        }else{
            console.log("assistant updated successfully");
            result(null, res);
        }
    });
}
module.exports = assistants;