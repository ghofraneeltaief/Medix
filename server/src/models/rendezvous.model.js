var dbConn = require("../../config/db.config");
var rendezvous = function (rendezvous) {
  this.Id_Acte = rendezvous.Id_Acte;
  this.Id_Medecin = rendezvous.Id_Medecin;
  this.Cin_Patient = rendezvous.Cin_Patient;
  this.Date_Rdv = rendezvous.Date_Rdv;
  this.Heure_Rdv = rendezvous.Heure_Rdv;
  this.Nom_Patient=rendezvous.Nom_Patient;
  this.Prenom_Patient=rendezvous.Prenom_Patient;
  this.Tel_Patient=rendezvous.Tel_Patient;
};


rendezvous.getrendezvous = (result) => {
  dbConn.query(
    "SELECT * FROM rendezvous,actes,medecins WHERE rendezvous.Id_Acte = actes.Id_Acte && medecins.Id_Medecin=rendezvous.Id_Medecin ORDER BY Date_Rdv Desc",
    (err, res) => {
      if (err) {
        console.log("Error while fetching rendezvous", err);
        result(null, err);
      } else {
        console.log("rendezvous fetched successfully");
        result(null, res);
      }
    }
  );
};
// create new rendezvous
rendezvous.createrendezvous = async (req, res) => {
  const { Heure_Rdv, Date_Rdv, Id_Acte, Id_Medecin, Cin , Tel_Patient , Prenom_Patient, Nom_Patient} = req.body;
  dbConn.query(
    "SELECT Heure_Rdv,Date_Rdv FROM rendezvous WHERE Heure_Rdv=? && Date_Rdv=?",
    [Heure_Rdv, Date_Rdv],
    async (err, result) => {
      if (err) throw err;
      if (result[0])
        return res.json({ status: "error", error: "Heure indisponible" });
      else {
        dbConn.query(
          "INSERT INTO rendezvous SET ?",
          {
            Heure_Rdv: Heure_Rdv,
            Date_Rdv: Date_Rdv,
            Id_Acte: Id_Acte,
            Id_Medecin: Id_Medecin,
            Cin_Patient: Cin,
            Nom_Patient: Nom_Patient,
            Prenom_Patient: Prenom_Patient,
            Tel_Patient: Tel_Patient,
          },
          (error, results) => {
            if (error) throw error;
            return res.json({
              status: "success",
              success: "rendezvous register",
            });
          }
        );
      }
    }
  );
};
// get rendezvous by ID for update
rendezvous.getrendezvousByID = (Id_Rdv, result) => {
  dbConn.query(
    "SELECT * FROM rendezvous WHERE Id_Rdv=?",
    Id_Rdv,
    (err, res) => {
      if (err) {
        console.log("Error while fetching rendezvous by id", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};
// update rendezvous
rendezvous.updaterendezvous = (Id_Rdv, rendezvousReqData, result) => {
  dbConn.query(
    "UPDATE rendezvous SET Id_Acte=?, Date_Rdv=?,Cin_Patient=?,Id_Medecin=?,Heure_Rdv=?,Tel_Patient=?,Nom_Patient=?,Prenom_Patient=? WHERE Id_Rdv=? ",
    [
      rendezvousReqData.Id_Acte,
      rendezvousReqData.Date_Rdv,
      rendezvousReqData.Cin_Patient,
      rendezvousReqData.Id_Medecin,
      rendezvousReqData.Heure_Rdv,
      rendezvousReqData.Tel_Patient,
      rendezvousReqData.Nom_Patient,
      rendezvousReqData.Prenom_Patient,
      
      Id_Rdv,
    ],
    (err, res) => {
      if (err) {
        console.log("Error while updating the rendezvous");
        result(null, err);
      } else {
        console.log("rendezvous updated successfully");
        result(null, res);
      }
    }
  );
};

// delete rendezvous
rendezvous.deleterendezvous = (Id_Rdv, result) => {
  dbConn.query(
    "DELETE FROM rendezvous WHERE Id_Rdv=?",
    [Id_Rdv],
    (err, res) => {
      if (err) {
        console.log("Error while deleting the rendezvous");
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
  // dbConn.query("UPDATE rendezvouss SET is_deleted=? WHERE id = ?", [1, id], (err, res)=>{
  //     if(err){
  //         console.log('Error while deleting the rendezvous');
  //         result(null, err);
  //     }else{
  //         console.log("rendezvous deleted successfully");
  //         result(null, res);
  //     }
  // });
};

module.exports = rendezvous;
