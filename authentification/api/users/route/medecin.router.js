const router = require("express").Router();
const { checkToken } = require("../../../auth/token_validation");
const {
  register,
  
} = require("../service/medecin.service");

const {
  login
  
} = require("../controller/medecin.controller");
router.post("/", register);
router.post("/login", login);

module.exports = router;
