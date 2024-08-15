require("dotenv").config();
const express = require("express");
const app = express();
const assistantRouter = require("./api/users/route/assistant.router");
const medecinRouter = require("./api/users/route/medecin.router");
const technicienradioRouter = require("./api/users/route/technicienradio.router");
const medecincentreRouter = require("./api/users/route/medecincentre.router");

const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use("/api/assistant", assistantRouter);
app.use("/api/medecin", medecinRouter);
app.use("/api/technicienradio", technicienradioRouter);
app.use("/api/medecincentre", medecincentreRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
