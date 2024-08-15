const {
  create,
  getUserByUserEmail,
  updateUser,
} = require("../service/medecin.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          status: "error",
          error: "Invalid Email_Medecin or MotPass_Medecin"
        });
      }
      
      if (results) {
        const jsontoken = sign({ result: results.Id_Medecin }, "secret", {
          expiresIn: "1h"
        });
        return res.json({
          status: "success",
          message: "login successfully",
          token: jsontoken,
          id:results.Id_Medecin
        });
      } else {
        return res.json({
          status: "error",
          error: "Invalid Email_Medecin or MotPass_Medecin"
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
        id:body.Id_Medecin
      });
    });
  }
};
