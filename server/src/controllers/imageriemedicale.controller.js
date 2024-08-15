const imageriemedicaleModel = require("../models/imageriemedicale.model");
const jwt = require("jsonwebtoken");
// get all imageriemedicale list
exports.getimageriemedicaleList = (req, res) => {
  //console.log('here all imageriemedicale list');
  imageriemedicaleModel.getAllimageriemedicale((err, imageriemedicale) => {
    console.log("We are here");
    if (err) res.send(err);
    console.log("imageriemedicale", imageriemedicale);
    res.send(imageriemedicale);
  });
};

// get all imageriemedicale list
exports.getimageriemedicaleMed = (req, res) => {
  //console.log('here all imageriemedicale list');
  const token = req.header("Authorization");
  console.log("t", token);
  const s = jwt.decode(token);
  console.log(s);
  const id = s.result;
  imageriemedicaleModel.getimageriemedicaleMed(id, (err, imageriemedicale) => {
    console.log("We are here");
    if (err) return res.send(err);
    console.log("imageriemedicale", imageriemedicale);
    res.send(imageriemedicale);
  });
};

// create new imageriemedicale
exports.createNewimageriemedicale = (req, res) => {
  const imageriemedicaleReqData = new imageriemedicaleModel(req.body);
  console.log("imageriemedicaleReqData", imageriemedicaleReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    imageriemedicaleModel.createimageriemedicale(
      imageriemedicaleReqData,
      (err, imageriemedicale) => {
        if (err) res.send(err);
        res.json({
          status: true,
          message: "imageriemedicale Created Successfully",
          data: imageriemedicale.insertId,
        });
      }
    );
  }
};

// update imageriemedicale
exports.updateimageriemedicale = (req, res) => {
  const imageriemedicaleReqData = new imageriemedicaleModel(req.body);
  console.log("imageriemedicaleReqData update", imageriemedicaleReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    imageriemedicaleModel.updateimageriemedicale(
      req.params.Id_Rdv,
      imageriemedicaleReqData,
      (err, imageriemedicale) => {
        if (err) res.send(err);
        res.json({
          status: true,
          message: "imageriemedicale updated Successfully",
        });
      }
    );
  }
};

// delete imageriemedicale
exports.deleteimageriemedicale = (req, res) => {
  imageriemedicaleModel.deleteimageriemedicale(
    req.params.Id_Rdv,
    (err, imageriemedicale) => {
      if (err) res.send(err);
      res.json({
        success: true,
        message: "imageriemedicale deleted successully!",
      });
    }
  );
};

// get all imageriemedicale list
exports.getimgbyId = (req, res) => {
  //console.log('here all imageriemedicale list');
  imageriemedicaleModel.getimgbyId(
    req.params.Id_Image,
    (err, imageriemedicale) => {
      console.log("We are here");
      if (err) res.send(err);
      console.log("imageriemedicale", imageriemedicale);
      res.send(imageriemedicale);
    }
  );
};

// get all imageriemedicale list
exports.getimgbyIdRdv = (req, res) => {
    //console.log('here all imageriemedicale list');
    imageriemedicaleModel.getimgbyIdRdv(
      req.params.Id_Rdv,
      (err, imageriemedicale) => {
        console.log("We are here");
        if (err) res.send(err);
        console.log("imageriemedicale", imageriemedicale);
        res.send(imageriemedicale);
      }
    );
  };