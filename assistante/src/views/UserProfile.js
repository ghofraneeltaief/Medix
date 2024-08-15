import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  Card,
  Form,
  Modal,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Swal from 'sweetalert2';

function User() {
  const [showModa, setShowModa] = useState(false);
  const [record, setRecord] = useState({});
  const [error, setError] = useState(false); // Pour gérer l'état d'erreur
  const token = localStorage.getItem("token");

  const handleClose = () => setShowModa(false);

  const loadTableList = async (token) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/assistant/`, {
        headers: { Authorization: token },
      });
      if (response.data && response.data.length > 0) {
        setRecord(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
      await axios.put(
        `http://localhost:5000/api/assistant/${record.Id_Assistant}`,
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
      setError(false); // Pas d'erreur
    } catch (err) {
      console.error("Error updating data:", err);
      setError(true); // Erreur
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
                          name="Nom_Assistant"
                          defaultValue={record.Nom_Assistant || ""}
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
                          name="Prenom_Assistant"
                          defaultValue={record.Prenom_Assistant || ""}
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
                          name="Email_Assistant"
                          defaultValue={record.Email_Assistant || ""}
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
                          name="Tel_Assistant"
                          defaultValue={record.Tel_Assistant || ""}
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
                          name="MotPass_Assistant"
                          defaultValue={record.MotPass_Assistant || ""}
                          placeholder="Mot de passe"
                          type="password"
                          onChange={handleCh}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-end">
                    <Button
                      className="btn-outlined pull-right mt-3"
                      variant="primary"
                      onClick={() => setShowModa(true)}
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
                            name="Nom_Assistant"
                            value={record.Nom_Assistant || ""}
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
                            name="Prenom_Assistant"
                            value={record.Prenom_Assistant || ""}
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
                            name="Email_Assistant"
                            value={record.Email_Assistant || ""}
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
                            name="Tel_Assistant"
                            value={record.Tel_Assistant || ""}
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
                            name="MotPass_Assistant"
                            value={record.MotPass_Assistant || ""}
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
                      </Button>{" "}
                      <Button
                        className="btn-outlined"
                        variant="primary" // Change le style selon l'état d'erreur
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
