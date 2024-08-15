const router = require("express").Router();
const { checkToken } = require("../../../auth/token_validation");

const {
  login
  
} = require("../controller/medecincentre.controller");
router.post("/login", login);

module.exports = router;
