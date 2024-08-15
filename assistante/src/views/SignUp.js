import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Grid, Button } from "@mui/material";
import logo from "../assets/img/medix.ico";
import "./login.css";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";

const theme = createTheme();

export default function SignUp() {
  const History = useHistory();

  const [admin, setadmin] = useState({
    Nom_Assistant: "",
    Prenom_Assistant: "",
    Tel_Assistant: "",
    Email_Assistant: "",
    MotPass_Assistant: "",
  });

  const handleChange = (e) => {
    setadmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/api/assistant/", admin)
      .then((res) => {
        if (res.data.status === "error") {
          Swal.fire({
            icon: "error",
            text: res.data.error,
            confirmButtonText: "Ok, j'ai compris!",
            confirmButtonColor: "#0095E8",
          });
        } else if (res.data.status === "success") {
          Swal.fire({
            icon: "success",
            title: "Succès!",
            text: res.data.success,
            customClass: {
              popup: "my-custom-modal",
            },
            width: "30%", // Définir la largeur du modal
            showConfirmButton: false, // Masquer le bouton "Ok"
            timer: 1000, // Fermer automatiquement après 10 secondes
          }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
              History.push("/SignIn");
            }
          });
        } else {
          console.log(res.data);
          History.push("/SignIn");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Grid container className="centered-container">
      {/* Begin:: card canal */}
      <Grid item xs={6} className="grid-left centered-item">
        {/* begin::Logo */}
        <img alt="Logo" src={logo} className="logo-1" />
        {/* end::Logo */}
        {/* begin::Title */}
        <h1 className="titre-1">Connexion à votre compte</h1>
        {/* end::Title */}
        <p className="text-gray">Saisissez votre e-mail professionnel</p>
        <div className="separator separator-content my-14">
          <span className="text">...et bon travail</span>
        </div>
        {/* begin::Form */}
        <Box>
          <Form className="form" onSubmit={handleSubmit}>
          <div className="row">
          <div className="col-md-6">
            <Form.Group>
              <Form.Control
                className="form-control"
                name="Nom_Assistant"
                required
                onChange={handleChange}
                type="text"
                placeholder="Nom"
              />
            </Form.Group></div>
            <div className="col-md-6">
            <Form.Group>
              <Form.Control
                className="form-control"
                name="Prenom_Assistant"
                required
                onChange={handleChange}
                type="text"
                placeholder="Prenom"
              />
            </Form.Group>
            </div>
            </div>
            
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                className="form-control"
                name="Email_Assistant"
                required
                onChange={handleChange}
                type="email"
                placeholder="Email"
              />
            </Form.Group> <div className="row">
            <div className="col-md-6"><Form.Group>
              <Form.Control
                className="form-control"
                name="Tel_Assistant"
                required
                onChange={handleChange}
                type="tel"
                placeholder="Tel"
              />
            </Form.Group></div><div className="col-md-6">
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                className="form-control"
                name="MotPass_Assistant"
                required
                onChange={handleChange}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            </div>
            </div>
            <Button className="button-submit" variant="contained" type="submit">
              Connexion
            </Button>
          </Form>
          {/* end::Form */}
        </Box>
        <Link to="/SignIn" variant="body2" style={{ marginBottom: "10%" }}>
          <Typography style={{ paddingTop: "25px" }}>
            Vous avez déjà un compte ? Se connecter
          </Typography>
        </Link>
      </Grid>
      <Grid item xs={6} className="grid-right centered-item">
        {/* begin::Title */}
        <h1 className="titre-2">Plateforme de centre de radiologie</h1>
        {/* end::Title */}
      </Grid>
    </Grid>
  );
}
