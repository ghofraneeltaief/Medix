import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
// react-bootstrap components
import {
  Button,
  Card,
  Modal,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function ListeRendezVous() {
  const [record, setRecord] = useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [showModa, setShowModa] = React.useState(false);
  const handleClose = () => {
    setShowModal(false);
    setShowModa(false);
  };

  // Delete rendezvous Record
  const deleteRecord = (Id_Rdv) => {
    const confirmBox = window.confirm(
      "Voulez-vous vraiment supprimer le rendez-vous "
    );
    if (confirmBox === true) {
      axios
        .delete(`http://localhost:5000/api/rendezvous/${Id_Rdv}`)
        .then((result) => {
          loadTableList();
        })
        .catch(() => {
          alert("Error in the Code");
        });
    }
  };

  const token = localStorage.getItem("token");
  const loadTableList = async () => {
    var response = fetch("http://localhost:5000/api/rendezvous")
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setRecord(myJson);
      });
  };

  // Select acte
  const [acte, setacte] = useState([]);

  useEffect(() => {
    const getacte = async () => {
      const req = await fetch("http://localhost:5000/api/actes");
      const getres = await req.json();
      setacte(await getres);
    };
    getacte();
  }, []);

  // Select medecin
  const [Medecin, setmedecin] = useState([]);
  useEffect(() => {
    const getMedecin = async () => {
      const req = await fetch("http://localhost:5000/api/medecins/m");
      const getres = await req.json();
      setmedecin(await getres);
    };
    getMedecin();
  }, []);

  const [admin, setadmin] = useState("");
  const handleChange = (e) => {
    setadmin({ ...admin, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/api/rendezvous", admin).then((res) => {
      if (res.data.status === "error") {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: res.data.error,
        });
      } else if (res.data.status === "success") {
        Swal.fire({
          icon: "success",
          text: "Rendez-vous ajouté avec succès",
          confirmButtonColor: "#008000",
        });
      } else {
        console.log(res.data);
      }
    });
    loadTableList();
  };

  useEffect(() => {
    loadTableList();
  }, []);

  const [CR, setCR] = useState([]);

  const loadRdv = async (id) => {
    const idRdv = id;
    await axios
      .get(`http://localhost:5000/api/rendezvous/${idRdv}`)
      .then((response) => {
        console.log("**** : ", response.data[0]);
        setCR(response.data[0]);
      });
  };

  const handleCha = (e) => {
    setCR({ ...CR, [e.target.name]: e.target.value });
  };
  const updateSession = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:5000/api/rendezvous/${CR.Id_Rdv}`, CR)
      .then((response) => {
        console.log("/***** reponse data******/", response.data);
        Swal.fire({
          icon: "success",
          title: "Modifié avec succès",
          text: "Les informations ont été mises à jour.",
          confirmButtonColor: "#008000",
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            handleClose();
          }
        });
      })
      .catch((err) => {
        console.log(err.message);
        console.log(err);
      });
    handleClose();
    loadTableList();
  };

  const onFocus = () => {
    this.setState({
      type: "date",
    });
  };
  const onBlur = () => {
    this.setState({
      type: "text",
    });
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Liste des Rendez-Vous</Card.Title>
              </Card.Header>
              <div className="input-group">
                <Button
                  style={{ marginLeft: "20px", marginTop: "20px" }}
                  variant="btn btn-primary"
                  onClick={() => setShowModal(true)}
                >
                  <i
                    className="fas fa-calendar-plus	"
                    style={{ fontSize: "24px", marginRight: "3px" }}
                  ></i>
                </Button>
              </div>
              <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header>
                  <Modal.Title>Ajouter Rendez-Vous</Modal.Title>
                  <FontAwesomeIcon
                    icon={faTimes}
                    onClick={handleClose}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      right: "15px",
                      top: "15px",
                    }}
                  />
                </Modal.Header>
                <Modal.Body>
                  <form className="row" onSubmit={handleSubmit}>
                    {" "}
                    <div className="col-md-12">
                      <div
                        className="alert alert-danger"
                        role="alert"
                        id="error"
                        style={{ display: "none" }}
                      ></div>
                      <div
                        className="alert alert-success"
                        role="alert"
                        id="success"
                        style={{ display: "none" }}
                      ></div>
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="validationServer04"
                        className="form-label is-required"
                      >
                        Cin
                      </label>
                      <input
                        type="text"
                        name="Cin"
                        className="form-control is-required"
                        id="validationServer04"
                        aria-describedby="validationServer04Feedback"
                        required
                        onChange={handleChange}
                        placeholder="Entrez CIN"
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="validationServer04"
                        className="form-label is-required"
                      >
                        Nom
                      </label>
                      <input
                        type="text"
                        name="Nom_Patient"
                        className="form-control is-required"
                        id="validationServer04"
                        aria-describedby="validationServer04Feedback"
                        required
                        onChange={handleChange}
                        placeholder="Entrez Nom"
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="validationServer04"
                        className="form-label is-required"
                      >
                        Prénom
                      </label>
                      <input
                        type="text"
                        name="Prenom_Patient"
                        className="form-control is-required"
                        id="validationServer04"
                        aria-describedby="validationServer04Feedback"
                        required
                        onChange={handleChange}
                        placeholder="Entrez Prénom"
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="validationServer04"
                        className="form-label is-required"
                      >
                        Téléphone
                      </label>
                      <input
                        type="text"
                        name="Tel_Patient"
                        className="form-control is-required"
                        id="validationServer04"
                        aria-describedby="validationServer04Feedback"
                        required
                        onChange={handleChange}
                        placeholder="Entrez Télephone"
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        for="validationDefault04"
                        className="form-label is-required"
                      >
                        Medecin
                      </label>
                      <select
                        className="form-control"
                        id="validationDefault04"
                        name="Id_Medecin"
                        onChange={handleChange}
                      >
                        <option selected disabled value="">
                          --Select medecin--
                        </option>

                        {Medecin.map((name) => (
                          <>
                            <option
                              key={name.Id_Medecin}
                              value={name.Id_Medecin}
                            >
                              {" "}
                              {name.Nom_Medecin + " " + name.Prenom_Medecin}
                            </option>
                          </>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label
                        for="validation"
                        className="form-label is-required"
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="validationDefault01"
                        required
                        name="Date_Rdv"
                        min={new Date().toISOString().split("T")[0]}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        for="validationDefault01"
                        className="form-label is-required"
                      >
                        Heure
                      </label>
                      <input
                        type="time"
                        className="form-control"
                        id="validationDefault01"
                        required
                        name="Heure_Rdv"
                        onChange={handleChange}
                        format="HH:MM PM"
                        min="08:00:00"
                        max="19:00:00"
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        for="validationDefault04"
                        className="form-label is-required"
                      >
                        Acte
                      </label>
                      <select
                        className="form-control"
                        id="validationDefault04"
                        required
                        name="Id_Acte"
                        onChange={handleChange}
                      >
                        <option selected disabled value="">
                          --Select Acte--
                        </option>
                        {acte.map((getcon) => (
                          <option key={getcon.Id_Acte} value={getcon.Id_Acte}>
                            {" "}
                            {getcon.Nom_Acte}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-12 d-flex justify-content-end">
                      <Button
                        variant="danger"
                        onClick={handleClose}
                        className="mr-2"
                      >
                        Annuler
                      </Button>
                      <Button variant="success" type="submit">
                        Ajouter
                      </Button>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th>Cin</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Tel</th>
                      <th>Médecin</th>
                      <th>Acte</th>
                      <th>Date</th>
                      <th>Heure</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="table">
                    {record.map((name) => (
                      <tr>
                        <td>{name.Cin_Patient}</td>
                        <td>{name.Nom_Patient}</td>
                        <td>{name.Prenom_Patient}</td>
                        <td>{name.Tel_Patient}</td>
                        <td>{name.Prenom_Medecin + " " + name.Nom_Medecin}</td>
                        <td>{name.Nom_Acte}</td>
                        <td>{moment(name.Date_Rdv).format("DD-MM-YYYY")}</td>
                        <td>{name.Heure_Rdv}</td>
                        <td>
                          <a
                            className="text-warning mr-2"
                            variant="btn btn-primary"
                            onClick={(e) => {
                              loadRdv(name.Id_Rdv);

                              setShowModa(true);
                            }}
                          >
                            <i
                              className="fas fa-edit"
                              variant="btn btn-primary"
                              style={{ fontSize: "24px", marginRight: "5px" }}
                            ></i>
                          </a>
                          <a
                            className="text-danger mr-2"
                            onClick={() => deleteRecord(name.Id_Rdv)}
                          >
                            {" "}
                            <i
                              className="far fa-trash-alt"
                              style={{ fontSize: "24px" }}
                            ></i>{" "}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Modal
                  show={showModa}
                  onHide={() => setShowModa(false)}
                  md="12"
                >
                  <Modal.Header>
                    <Modal.Title>Modifier Rendez-vous</Modal.Title>
                    <FontAwesomeIcon
                      icon={faTimes}
                      onClick={handleClose}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: "15px",
                        top: "15px",
                      }}
                    />
                  </Modal.Header>
                  <Modal.Body>
                    <form className="row g-3" onSubmit={updateSession}>
                      <div className="col-md-4">
                        <label
                          for="validationServer04"
                          className="form-label is-required"
                        >
                          Cin
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          name="Cin_Patient"
                          value={CR.Cin_Patient}
                          onChange={handleCha}
                        />
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor="validationServer04"
                          className="form-label is-required"
                        >
                          Nom
                        </label>
                        <input
                          type="text"
                          name="Nom_Patient"
                          className="form-control is-required"
                          id="validationServer04"
                          aria-describedby="validationServer04Feedback"
                          required
                          value={CR.Nom_Patient}
                          onChange={handleCha}
                        />
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor="validationServer04"
                          className="form-label is-required"
                        >
                          Prénom
                        </label>
                        <input
                          type="text"
                          name="Prenom_Patient"
                          className="form-control is-required"
                          id="validationServer04"
                          aria-describedby="validationServer04Feedback"
                          required
                          value={CR.Prenom_Patient}
                          onChange={handleCha}
                        />
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor="validationServer04"
                          className="form-label is-required"
                        >
                          Téléphone
                        </label>
                        <input
                          type="text"
                          name="Tel_Patient"
                          className="form-control is-required"
                          id="validationServer04"
                          aria-describedby="validationServer04Feedback"
                          required
                          value={CR.Tel_Patient}
                          onChange={handleCha}
                        />
                      </div>
                      <div className="col-md-4">
                        <label
                          for="validationDefault04"
                          className="form-label is-required"
                        >
                          Medecin
                        </label>
                        <select
                          className="form-control"
                          id="validationDefault04"
                          required
                          name="Id_Medecin"
                          value={CR.Id_Medecin}
                          onChange={handleCha}
                        >
                          <option selected disabled value="">
                            --Select medecin--
                          </option>
                          {Medecin.map((name) => (
                            <option
                              key={name.Id_Medecin}
                              value={name.Id_Medecin}
                            >
                              {" "}
                              {name.Nom_Medecin + " " + name.Prenom_Medecin}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-4">
                        <label for="date" className="form-label is-required">
                          Date
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="date"
                          required
                          name="Date_Rdv"
                          onFocus={(e) => (e.currentTarget.type = "date")}
                          onBlur={(e) => (e.currentTarget.type = "text")}
                          value={CR.Date_Rdv}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={handleCha}
                        />
                      </div>
                      <div className="col-md-4">
                        <label for="time" className="form-label is-required">
                          Heure
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="time"
                          required
                          name="Heure_Rdv"
                          onFocus={(e) => (e.currentTarget.type = "time")}
                          onBlur={(e) => (e.currentTarget.type = "text")}
                          value={CR.Heure_Rdv}
                          onChange={handleCha}
                          min="08:00:00"
                          max="19:00:00"
                        />
                      </div>
                      <div className="col-md-8">
                        <label
                          for="validationDefault04"
                          className="form-label is-required"
                        >
                          Acte
                        </label>
                        <select
                          className="form-control"
                          id="validationDefault04"
                          required
                          name="Id_Acte"
                          value={CR.Id_Acte}
                          onChange={handleCha}
                        >
                          <option selected disabled value="">
                            --Select Acte--
                          </option>
                          {acte.map((getcon) => (
                            <option key={getcon.Id_Acte} value={getcon.Id_Acte}>
                              {" "}
                              {getcon.Nom_Acte}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-12">
                        <div className="form-check">
                          <label
                            className="form-check-label"
                            for="invalidCheck2"
                          ></label>
                        </div>
                      </div>
                      <div className="col-md-12 d-flex justify-content-end">
                        <Button
                          variant="danger"
                          onClick={handleClose}
                          className="mr-2"
                        >
                          Annuler
                        </Button>
                        <Button variant="success" type="submit">
                          Modifier
                        </Button>
                      </div>
                    </form>
                  </Modal.Body>
                </Modal>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ListeRendezVous;
