const router = require("express").Router();
const { checkToken } = require("../../../auth/token_validation");
const {
  login,
  updateUsers,
} = require("../Controller/assistant.controller");
const {
  register,
  
} = require("../service/assistant.service");
router.post("/", register);
router.post("/login", login);
router.put("/", updateUsers);


module.exports = router;
