const dbConn = require("../../../config/database");

module.exports = {
  register : async (req,res)=>{
    const {Email_Assistant,MotPass_Assistant,Nom_Assistant,Prenom_Assistant,Tel_Assistant}=req.body
    dbConn.query('SELECT Email_Assistant FROM assistants WHERE Email_Assistant=?',[Email_Assistant],async(err,result)=>{
      if(err)throw err;
      if(result[0])return res.json({status:"error",error:"Email deja exist"})
      else{
        dbConn.query('INSERT INTO assistants SET ?',{Email_Assistant:Email_Assistant,MotPass_Assistant:MotPass_Assistant,Nom_Assistant:Nom_Assistant,Prenom_Assistant:Prenom_Assistant,Tel_Assistant:Tel_Assistant},(error,results)=>{
          if(error)throw error;
          return res.json({status:"success",success:"compte register"})
        })
      }
    })
     },
  getUserByUserEmail: (data, callBack) => {
    console.log(data)
    dbConn.query(
      `select * from assistants where Email_Assistant = ? && MotPass_Assistant=? `,
      [
        data.Email_Assistant,
        data.MotPass_Assistant,
        data.Id_Assistant


      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  updateUser: (data, callBack) => {
    dbConn.query(
      `update assistants set Nom_Assistant=?, Prenom_Assistant=?, Email_Assistant=?, MotPass_Assistant=? where Id_Assistant = ?`,
      [
        data.Nom_Assistant,
        data.Prenom_Assistant,
        data.Email_Assistant,
        data.MotPass_Assistant,
        data.Id_Assistant
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};
