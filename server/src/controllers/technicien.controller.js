const technicienModel = require("../models/technicien.model");

const jwt = require("jsonwebtoken");

// get all technicien list
exports.getMed = (req, res) => {
  const token = req.header("Authorization");
  console.log("t", token);
  const s = jwt.decode(token);
  console.log(s);
  const id = s.result;
  //console.log('here all technicien list');
  technicienModel.getMed(id, (err, technicien) => {
    console.log("We are here");
    if (err) res.send(err);
    console.log("technicien", technicien);
    res.send(technicien);
  });
};

// update technicien
exports.updatetechnicien = (req, res) => {
  const technicienReqData = new technicienModel(req.body);
  console.log("technicienReqData update", technicienReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    technicienModel.updatetechnicien(
      req.params.Id_TechRadio,
      technicienReqData,
      (err, technicien) => {
        if (err) res.send(err);
        res.json({ status: true, message: "technicien updated Successfully" });
      }
    );
  }
};

