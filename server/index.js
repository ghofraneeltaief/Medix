const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
// create express app

// setup the server port
const port = process.env.PORT || 5000;

// parse request data content type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse request data content type application/json
app.use(bodyParser.json());

// define root route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Import and create routes
const rendezvousRoutes = require("./src/routes/rendezvous.route");
const imageriemedicaleRoutes = require("./src/routes/imageriemedicale.route");
const medecinsRoutes = require("./src/routes/medecins.route");
const technicienRoutes = require("./src/routes/technicien.route");
const actesRoutes = require("./src/routes/actes.route");
const compterenduRoutes = require("./src/routes/compterendu.route");
const assistantRoutes = require("./src/routes/assistant.route");
const medecincentreRoutes = require("./src/routes/medecincentre.route");

app.use("/api/rendezvous", rendezvousRoutes);
app.use("/api/imageriemedicale", imageriemedicaleRoutes);
app.use("/api/medecins", medecinsRoutes);
app.use("/api/technicien", technicienRoutes);
app.use("/api/actes", actesRoutes);
app.use("/api/compterendu", compterenduRoutes);
app.use("/api/assistant", assistantRoutes);
app.use("/api/medecincentre", medecincentreRoutes);

// Serve static files (images)
app.use('/images', express.static(path.join(__dirname, 'src/images')));

// Listen to the port
app.listen(port, () => {
  console.log(`Express is running at port ${port}`);
});
