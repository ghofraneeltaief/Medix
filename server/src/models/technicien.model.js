var dbConn = require("../../config/db.config");
var technicien = function (technicien) {
  (this.Nom_TechRadio = technicien.Nom_TechRadio),
    (this.Prenom_TechRadio = technicien.Prenom_TechRadio),
    (this.MotPass_TechRadio = technicien.MotPass_TechRadio),
    (this.Tel_TechRadio = technicien.Tel_TechRadio),
    (this.Email_TechRadio = technicien.Email_TechRadio);
};

// get all techniciens
technicien.getMed = (id, result) => {
  dbConn.query(
    "SELECT Id_TechRadio, Nom_TechRadio,Prenom_TechRadio,MotPass_TechRadio,Tel_TechRadio,Email_TechRadio FROM technicien WHERE Id_TechRadio=?",
    id,
    (err, res) => {
      if (err) {
        console.log("Error while fetching technicien", err);
        result(null, err);
      } else {
        console.log("technicien fetched successfully");
        result(null, res);
      }
    }
  );
};

// update technicien
technicien.updatetechnicien = (Id_TechRadio, technicienReqData, result) => {
  dbConn.query(
    "UPDATE technicien SET Nom_TechRadio=?,Prenom_TechRadio=?, MotPass_TechRadio=?, Email_TechRadio=?,  Tel_TechRadio=? WHERE Id_TechRadio = ?",
    [
      technicienReqData.Nom_TechRadio,
      technicienReqData.Prenom_TechRadio,
      technicienReqData.MotPass_TechRadio,
      technicienReqData.Email_TechRadio,
      technicienReqData.Tel_TechRadio,
      Id_TechRadio,
    ],
    (err, res) => {
      if (err) {
        console.log("Error while updating the technicien");
        result(null, err);
      } else {
        console.log("technicien updated successfully");
        result(null, res);
      }
    }
  );
};

module.exports = technicien;
