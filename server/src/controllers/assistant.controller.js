const assistantsModel = require("../models/assistants.model");

const jwt = require("jsonwebtoken");

// get all assistant list
exports.getassistantList = (req, res) => {
  const token = req.header("Authorization");
  console.log("t", token);
  const s = jwt.decode(token);
  console.log(s);
  const id = s.result;
  //console.log('here all assistant list');
  assistantsModel.getAllassistants(id, (err, assistant) => {
    console.log("We are here");
    if (err) res.send(err);
    console.log("assistant", assistant);
    res.send(assistant);
  });
};

// update assistant
exports.updateassistant = (req, res) => {
  const assistantReqData = new assistantsModel(req.body);
  console.log("assistantReqData update", assistantReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    assistantsModel.updateassistant(
      req.params.Id_Assistant,
      assistantReqData,
      (err, assistant) => {
        if (err) res.send(err);
        res.json({ status: true, message: "assistant updated Successfully" });
      }
    );
  }
};
