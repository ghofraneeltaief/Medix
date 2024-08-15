const router = require("express").Router();
const { checkToken } = require("../../../auth/token_validation");
const {
  register,
  
} = require("../service/technicienradio.service");

const {
  login
  
} = require("../controller/technicienradio.controller");
router.post("/", register);
router.post("/login", login);

module.exports = router;
