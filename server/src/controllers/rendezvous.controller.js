const rendezvousModel = require("../models/rendezvous.model");
const jwt = require("jsonwebtoken");

// get all rendezvous list
exports.getrendezvousL = (req, res) => {
  rendezvousModel.getrendezvous((err, rendezvous) => {
    console.log("We are here");
    if (err) return res.send(err);
    console.log("rendezvous", rendezvous);
    res.send(rendezvous);
  });
};

// create new rendezvous
exports.createNewrendezvous = (req, res) => {
  const rendezvousReqData = new rendezvousModel(req.body);
  console.log("rendezvousReqData", rendezvousReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    rendezvousModel.createrendezvous(rendezvousReqData, (err, rendezvous) => {
      if (err) res.send(err);
      res.json({
        status: true,
        message: "rendezvous Created Successfully",
        data: rendezvous.insertId,
      });
    });
  }
};

// get rendezvous by ID  for Update
exports.getrendezvousByID = (req, res) => {
  //console.log('get emp by id');
  rendezvousModel.getrendezvousByID(req.params.Id_Rdv, (err, rendezvous) => {
    if (err) res.send(err);
    console.log("single patient data", rendezvous);
    res.send(rendezvous);
  });
};
// update rendezvous
exports.updaterendezvous = (req, res) => {
  const rendezvousReqData = new rendezvousModel(req.body);
  console.log("rendezvousReqData update", rendezvousReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    rendezvousModel.updaterendezvous(
      req.params.Id_Rdv,
      rendezvousReqData,
      (err, rendezvous) => {
        if (err) res.send(err);
        res.json({ status: true, message: "rendezvous updated Successfully" });
      }
    );
  }
};
// delete rendezvous
exports.deleterendezvous = (req, res) => {
  rendezvousModel.deleterendezvous(req.params.Id_Rdv, (err, rendezvous) => {
    if (err) res.send(err);
    res.json({ success: true, message: "rendezvous deleted successully!" });
  });
};
