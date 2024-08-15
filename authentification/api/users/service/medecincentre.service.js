const dbConn = require("../../../config/database");

module.exports = {

  getUserByUserEmail: (data, callBack) => {
    dbConn.query(
      `select * from medecincentre where Email_Medecin_Centre = ? && MotPass_Medecin_Centre= ?`,
      [data.Email_Medecin_Centre,
        data.MotPass_Medecin_Centre,
        data.Id_Medecin_Centre
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
      `update medecincentre set Nom_Medecin_Centre=?, Prenom_Medecin_Centre=?, Email_Medecin_Centre=?, MotPass_Medecin_Centre=?, where Id_Medecin_Centre = ?`,
      [
        data.Nom_Medecin_Centre,
        data.Prenom_Medecin_Centre,
        data.Email_Medecin_Centre,
        data.MotPass_Medecin_Centre,
        data.Id_Medecin_Centre
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
