var dbConn = require("../../config/db.config");
var imageriemedicale = function (imageriemedicale) {
  this.Id_Acte = imageriemedicale.Id_Acte;
  this.Id_Rdv = imageriemedicale.Id_Rdv;
  this.FicheImg = imageriemedicale.FicheImg;
};

// get all imageriemedicales
imageriemedicale.getAllimageriemedicale = (result) => {
  dbConn.query(
    "SELECT *  FROM  rendezvous, imageriemedicale, actes WHERE  imageriemedicale.Id_Rdv=rendezvous.Id_Rdv && imageriemedicale.Id_Acte=actes.Id_Acte && rendezvous.Id_Acte=actes.Id_Acte",
    (err, res) => {
      if (err) {
        console.log("Error while fetching imageriemedicale", err);
        result(null, err);
      } else {
        console.log("imageriemedicale fetched successfully");
        result(null, res);
      }
    }
  );
};
// get all imageriemedicales
imageriemedicale.getimageriemedicaleMed = (Id_Medecin, result) => {
  dbConn.query(
    "SELECT * FROM rendezvous, imageriemedicale, actes, medecins WHERE rendezvous.Id_Acte=actes.Id_Acte  && imageriemedicale.Id_Acte=actes.Id_Acte && imageriemedicale.Id_Rdv=rendezvous.Id_Rdv && medecins.Id_Medecin=rendezvous.Id_Medecin && rendezvous.Id_Medecin=?",
    Id_Medecin,
    (err, res) => {
      if (err) {
        console.log("Error while fetching imageriemedicale", err);
        result(null, err);
      } else {
        console.log("imageriemedicale fetched successfully");
        result(null, res);
      }
    }
  );
};
// create new imageriemedicale
imageriemedicale.createimageriemedicale = (imageriemedicaleReqData, result) => {
  dbConn.query(
    "INSERT INTO imageriemedicale SET ?",
    imageriemedicaleReqData,
    (err, res) => {
      if (err) {
        console.log("Error while inserting data");
        result(null, err);
      } else {
        console.log("imageriemedicale created successfully");
        result(null, res);
      }
    }
  );
};
// update imageriemedicale
imageriemedicale.updateimageriemedicale = (
  Id_Rdv,
  imageriemedicaleReqData,
  result
) => {
  dbConn.query(
    "UPDATE imageriemedicale SET Id_MedRadio=? WHERE Id_Rdv = ?",
    [imageriemedicaleReqData.Id_MedRadio, Id_Rdv],
    (err, res) => {
      if (err) {
        console.log("Error while updating the imageriemedicale");
        result(null, err);
      } else {
        console.log("imageriemedicale updated successfully");
        result(null, res);
      }
    }
  );
};

// delete imageriemedicale
imageriemedicale.deleteimageriemedicale = (Id_Rdv, result) => {
  dbConn.query(
    "DELETE FROM imageriemedicale WHERE Id_Rdv=?",
    [Id_Rdv],
    (err, res) => {
      if (err) {
        console.log("Error while deleting the imageriemedicale");
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

imageriemedicale.getimgbyId = (Id_Image, result) => {
  dbConn.query(
    "SELECT * FROM imageriemedicale WHERE Id_Image=?",
    Id_Image,
    (err, res) => {
      if (err) {
        console.log("Error while fetching fichepatient", err);
        result(null, err);
      } else {
        console.log("fichepatient fetched successfully");
        result(null, res);
      }
    }
  );
};

imageriemedicale.getimgbyIdRdv = (Id_Rdv, result) => {
  dbConn.query(
    "SELECT * FROM imageriemedicale WHERE Id_Rdv=?",
    [Id_Rdv],
    (err, res) => {
      if (err) {
        console.log("Error while fetching fichepatient", err);
        result(null, err);
      } else {
        console.log("fichepatient fetched successfully");
        result(null, res);
      }
    }
  );
};

module.exports = imageriemedicale;
