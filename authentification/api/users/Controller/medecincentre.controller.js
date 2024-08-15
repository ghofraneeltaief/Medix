const {
  getUserByUserEmail,
  updateUser,
} = require("../service/medecincentre.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
 
  login: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          status: "error",
          error: "Invalid Email or MotPass"
        });
      }
      
      if (results) {
        const jsontoken = sign({ result: results.Id_Medecin_Centre }, "secret", {
          expiresIn: "1h"
        });
        return res.json({
          status: "success",
          message: "login successfully",
          token: jsontoken,
          id:results.Id_Medecin_Centre
        });
      } else {
        return res.json({
          status: "error",
          error: "Invalid Email_Medecin_Centre or MotPass_Medecin_Centre"
        });
      }
    });
  },
  updateUsers: (req, res) => {
    const body = req.body;
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully",
        id:body.Id_Medecin_Centre_Centre
      });
    });
  }
};
