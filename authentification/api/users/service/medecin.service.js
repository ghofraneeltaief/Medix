const dbConn = require("../../../config/database");
const { sign } = require("jsonwebtoken");

module.exports = {
 register : async (req,res)=>{
const {Email_Medecin,MotPass_Medecin,Nom_Medecin,Prenom_Medecin,Tel_Medecin}=req.body
dbConn.query('SELECT Email_Medecin FROM medecins WHERE Email_Medecin=?',[Email_Medecin],async(err,result)=>{
  if(err)throw err;
  if(result[0])return res.json({status:"error",error:"Email deja exist"})
  else{
    dbConn.query('INSERT INTO medecins SET ?',{Email_Medecin:Email_Medecin,MotPass_Medecin:MotPass_Medecin,Nom_Medecin:Nom_Medecin,Prenom_Medecin:Prenom_Medecin,Tel_Medecin:Tel_Medecin},(error,results)=>{
      if(error)throw error;
      return res.json({status:"success",success:"compte register"})
    })
  }
})
 },
 getUserByUserEmail: (data, callBack) => {
  console.log(data)
  dbConn.query(
    `select * from medecins where Email_Medecin = ? && MotPass_Medecin=? `,
    [
      data.Email_Medecin,
      data.MotPass_Medecin,
      data.Id_Medecin


    ],
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    }
  );
},
};
