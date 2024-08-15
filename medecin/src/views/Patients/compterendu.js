import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import "moment/locale/fr"; // Assurez-vous d'importer la locale française pour moment.js
import image from "assets/img/medix.ico";

function Compterendu() {
  let {Id_Rdv} = useParams();
  const [user, setUser] = useState([]);

  const loadCompteRendu = () => {
    axios.get(`http://localhost:5000/api/compterendu/cr/${Id_Rdv}`)
      .then((response) => {
        setUser(response.data);
      });
  };

  useEffect(() => {
    loadCompteRendu();
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
console.log(Id_Rdv)
  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end" style={{ marginRight: "15%", marginTop: "3%" }}>
              <Button className="text-primary mr-2" onClick={handlePrint}>
                Imprimer le compte rendu
              </Button>
            </div>
            <div className="container" ref={componentRef}>
              <Card.Header>
                <Card.Title as="h3" style={{ textAlign: "center" }}>
                  <div className="logo d-flex align-items-center justify-content-start">
                    <div className="logo-img">
                      <img src={image} alt="Medix Logo" width="100" height="100" /> Medix
                    </div>
                  </div>
                  Centre D'Imagerie Medicale
                </Card.Title>
                <Card.Title as="h3" style={{ textAlign: "center" }}>
                  مركز التصوير الطبي
                </Card.Title>
              </Card.Header>
              {user.map((name, index) => (
                <Card.Body key={index}>
                  <div className="logo d-flex align-items-center justify-content-end pt-5">
                    <h5>date : {moment(name.Date_Rdv).format("DD-MM-YYYY")}</h5>
                  </div>
                  <p style={{ textTransform: "capitalize" }}>Patient : {name.Nom_Patient} {name.Prenom_Patient}</p>
                  <h5 style={{ textAlign: "center" }}>{name.Nom_Acte}</h5>
                  <div className="logo d-flex align-items-center justify-content-center pt-5">
                    <textarea rows="15" cols="120" readOnly value={name.FichierCR}></textarea>
                  </div>
                </Card.Body>
              ))}
              <div style={{ textAlign: "center",paddingTop:"130px" }}>
                <p style={{ fontFamily: "cursive" }}>Radiologie numérisée - Echographie: 2D, 3D, 4D - Scanner spiralé - I.R.M - Radiologie dentaire numérisée - Mammographie</p>
                <hr />
                <p style={{ fontFamily: "cursive" }}>Tel: 79350602 / 79602350 - Fax: 71350602 - Email: ghofraneeltaief@gmail.com</p>
                <p style={{ textTransform: "capitalize", fontFamily: "cursive" }}>Merci pour votre confiance<br />Bien Cordialement</p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Compterendu;
