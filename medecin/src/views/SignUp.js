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
    Nom_Medecin: "",
    Prenom_Medecin: "",
    Tel_Medecin: "",
    Email_Medecin: "",
    MotPass_Medecin: "",
  });

  const handleChange = (e) => {
    setadmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/api/medecin/", admin)
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
            <Form.Group className="mb-3">
              <Form.Control
                className="form-control"
                name="Nom_Medecin"
                required
                onChange={handleChange}
                type="text"
                placeholder="Nom"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                className="form-control"
                name="Prenom_Medecin"
                required
                onChange={handleChange}
                type="text"
                placeholder="Prenom"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                className="form-control"
                name="Tel_Medecin"
                required
                onChange={handleChange}
                type="tel"
                placeholder="Tel"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                className="form-control"
                name="Email_Medecin"
                required
                onChange={handleChange}
                type="email"
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                className="form-control"
                name="MotPass_Medecin"
                required
                onChange={handleChange}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button className="button-submit" variant="contained" type="submit">
              Connexion
            </Button>
          </Form>
          {/* end::Form */}
        </Box>
        <Link to="/SignIn" variant="body2" style={{ marginBottom: "10%" }}>
          <Typography style={{ paddingTop: "30px" }}>
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
