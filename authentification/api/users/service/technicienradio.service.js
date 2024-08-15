const dbConn = require("../../../config/database");
const { sign } = require("jsonwebtoken");

module.exports = {
 register : async (req,res)=>{
const {Email_TechRadio,MotPass_TechRadio,Nom_TechRadio,Prenom_TechRadio,Tel_TechRadio}=req.body
dbConn.query('SELECT Email_TechRadio FROM technicien WHERE Email_TechRadio=?',[Email_TechRadio],async(err,result)=>{
  if(err)throw err;
  if(result[0])return res.json({status:"error",error:"Email deja exist"})
  else{
    dbConn.query('INSERT INTO technicien SET ?',{Email_TechRadio:Email_TechRadio,MotPass_TechRadio:MotPass_TechRadio,Nom_TechRadio:Nom_TechRadio,Prenom_TechRadio:Prenom_TechRadio,Tel_TechRadio:Tel_TechRadio},(error,results)=>{
      if(error)throw error;
      return res.json({status:"success",success:"compte register"})
    })
  }
})
 },
 getUserByUserEmail: (data, callBack) => {
  console.log(data)
  dbConn.query(
    `select * from technicien where Email_TechRadio = ? && MotPass_TechRadio=? `,
    [
      data.Email_TechRadio,
      data.MotPass_TechRadio,
      data.Id_TechRadio


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
