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

export default function SignIn() {
  const history = useHistory();
  const [admin, setAdmin] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/medecin/login", admin)
      .then((res) => {
        if (res.data.status === "error") {
          setSuccess("");
          setError(res.data.error);
          Swal.fire({
            icon: "error",
            //title: 'Erreur de connexion',
            text: "Merci de vérifier vos paramètres de connexion!",
            width: "30%",
            confirmButtonText: "Ok, j'ai compris!",
            confirmButtonColor: "#0095E8",
          });
        } else if (res.data.status === "success") {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("id", res.data.id);
          setError("");
          setSuccess("Login successful");
          Swal.fire({
            icon: "success",
            text: "Top, connexion établie!",
            customClass: {
              popup: "my-custom-modal",
            },
            width: "30%", // Définir la largeur du modal
            showConfirmButton: false, // Masquer le bouton "Ok"
            timer: 1000, // Fermer automatiquement après 10 secondes
          }).then(() => {
            history.push(`/medecin/Patients`);
          });
        }
      })
      .catch((err) => {
        setError("An error occurred. Please try again.");
        setSuccess("");
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Une erreur est survenue. Veuillez réessayer.",
        });
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
        <Link to="/SignUp" variant="body2">
          <Typography style={{ paddingTop: "30px" }}>
            Vous n'avez pas de compte? s'inscrire
          </Typography>
        </Link>
      </Grid>
      <Grid item xs={6} className="grid-right centered-item">
        {/* begin::Title */}
        <h1 className="titre-2">plateforme de centre de radiologie</h1>
        {/* end::Title */}
      </Grid>
    </Grid>
  );
}
