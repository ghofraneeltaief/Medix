import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Modal,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function User() {
  const [showModa, setShowModa] = useState(false);
  const [record, setRecord] = useState([]);
  const token = localStorage.getItem("token");

  const handleClose = () => setShowModa(false);
  const handleShow = () => setShowModa(true);

  const loadTableList = async (token) => {
    axios
      .get(`http://localhost:5000/api/medecincentre/`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        setRecord(response.data[0]);
      });
  };

  useEffect(() => {
    loadTableList(token);
  }, [token]);

  const handleCh = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const updateSession = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(`http://localhost:5000/api/medecincentre/${record.Id_Medecin_Centre}`, 
          record
        );
      Swal.fire({
        icon: 'success',
        title: 'Modifié avec succès',
        text: 'Les informations ont été mises à jour.',
        confirmButtonColor: "#008000",
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          handleClose();
        }
      });
    } catch (err) {
      console.error("Error updating data:", err);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de la mise à jour des informations.',
      });
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Profil</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Nom</label>
                        <Form.Control
                          name="Nom_Medecin_Centre"
                          defaultValue={record.Nom_Medecin_Centre}
                          placeholder="Nom"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Prénom</label>
                        <Form.Control
                          name="Prenom_Medecin_Centre"
                          defaultValue={record.Prenom_Medecin_Centre}
                          placeholder="Prénom"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          name="Email_Medecin_Centre"
                          defaultValue={record.Email_Medecin_Centre}
                          placeholder="Email"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Téléphone</label>
                        <Form.Control
                          name="Tel_Medecin_Centre"
                          defaultValue={record.Tel_Medecin_Centre}
                          placeholder="Téléphone"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Mot de passe</label>
                        <Form.Control
                          name="MotPass_Medecin_Centre"
                          defaultValue={record.MotPass_Medecin_Centre}
                          placeholder="Mot de passe"
                          type="password"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-end">
                    <Button
                      className="btn-outlined pull-right mt-3"
                      variant="primary"
                      onClick={handleShow}
                    >
                      Modifier
                    </Button>
                  </div>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
              <Modal show={showModa} onHide={handleClose}>
                <Modal.Header >
                  <Modal.Title>Modifier Profil</Modal.Title>
                  <FontAwesomeIcon 
    icon={faTimes} 
    onClick={handleClose} 
    style={{ cursor: 'pointer', position: 'absolute', right: '15px', top: '15px' }} 
  />
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={updateSession}>
                    <Row>
                      <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>Nom</label>
                          <Form.Control
                            name="Nom_Medecin_Centre"
                            value={record.Nom_Medecin_Centre}
                            placeholder="Nom"
                            type="text"
                            onChange={handleCh}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="pl-1" md="6">
                        <Form.Group>
                          <label>Prénom</label>
                          <Form.Control
                            name="Prenom_Medecin_Centre"
                            value={record.Prenom_Medecin_Centre}
                            placeholder="Prénom"
                            type="text"
                            onChange={handleCh}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Form.Group>
                          <label>Email</label>
                          <Form.Control
                            name="Email_Medecin_Centre"
                            value={record.Email_Medecin_Centre}
                            placeholder="Email"
                            type="text"
                            onChange={handleCh}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <Form.Group>
                          <label>Téléphone</label>
                          <Form.Control
                            name="Tel_Medecin_Centre"
                            value={record.Tel_Medecin_Centre}
                            placeholder="Téléphone"
                            type="text"
                            onChange={handleCh}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md="6">
                        <Form.Group>
                          <label>Mot de passe</label>
                          <Form.Control
                            name="MotPass_Medecin_Centre"
                            value={record.MotPass_Medecin_Centre}
                            placeholder="Mot de passe"
                            type="password"
                            onChange={handleCh}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <div className="d-flex justify-content-end mt-3">
                      <Button
                        className="btn-outlined"
                        variant="danger"
                        onClick={handleClose}
                        style={{ marginRight: "10px" }}
                      >
                        Annuler
                      </Button>
                      <Button
                        className="btn-outlined"
                        variant="primary"
                        type="submit"
                      >
                        Modifier
                      </Button>
                    </div>
                    <div className="clearfix"></div>
                  </Form>
                </Modal.Body>
              </Modal>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
