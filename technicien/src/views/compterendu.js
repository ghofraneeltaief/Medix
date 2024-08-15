import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import image from "assets/img/medix.ico";
import moment from "moment";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

function Compterendu() {
  let { Id_Image } = useParams();
  const [user, setUser] = useState([]);
  console.log(user);
  // On Page load display all records
  const loadCompteRendu = () => {
    axios
      .get(`http://localhost:5000/api/compterendu/c/${Id_Image}`)
      .then((response) => {
        setUser(response.data);
      });
  };
  useEffect(() => {
    loadCompteRendu();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Card>
              <div className="container" >
                <Card.Header>
                  <Card.Title as="h3" style={{ textAlign: "center" }}>
                    <div className="logo d-flex align-items-center justify-content-start">
                      <div className="logo-img">
                        <img src={image} width="18%" height="14%" /> Medix{" "}
                      </div>
                    </div>
                    Centre D'Imagerie Medicale
                  </Card.Title>
                  <Card.Title as="h3" style={{ textAlign: "center" }}>
                    مركز التصوير الطبي
                  </Card.Title>
                </Card.Header>
                <br></br>
                <br></br>
                {user.map((name) => (
                  <Card.Body>
                    <div className="logo d-flex align-items-center justify-content-end">
                      <h5>
                        date : {moment(name.Date_Rdv).format("DD-MM-YYYY")}
                      </h5>
                    </div>
                    <p style={{ textTransform: "capitalize" }}>
                      dr.{name.Prenom_Medecin_Centre + " " + name.Nom_Medecin_Centre}
                    </p>
                    <p style={{ textTransform: "capitalize" }}>
                      patient : {name.Nom + " " + name.Prenom}
                    </p>
                    <h5 style={{ textAlign: "center" }}>{name.Nom_Acte}</h5>
                    <br></br>
                    <br></br>
                    <div className="logo d-flex align-items-center justify-content-center">
                      <textarea rows="10" cols="100">
                        {name.FichierCR}
                      </textarea>
                    </div>
                  </Card.Body>
                ))}
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h5 style={{ textAlign: "center" }}>
                  Merci pour votre confiance
                </h5>
                <h5 style={{ textAlign: "center" }}>Bien Cordialement</h5>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <p
                  style={{
                    textTransform: "capitalize",
                    fontFamily: "cursive",
                    textAlign: "center",
                  }}
                >
                  radiologie numérisée - echographie:2D,3D,4D - Scanner spiralé
                  - I.R.M - Radiologie dentaire numérisée - mammographie
                </p>
                <hr></hr>
                <p
                  style={{
                    textTransform: "capitalize",
                    fontFamily: "cursive",
                    textAlign: "center",
                  }}
                >
                  tel : 79350602/79602350 - fax: 71350602 - email :
                  ghofraneeltaief@gmail.com
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Compterendu;
