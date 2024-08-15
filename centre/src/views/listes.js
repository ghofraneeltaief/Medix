import React, { useState, useEffect } from "react";
import axios from "axios";
import scann from "assets/img/scanner-oculaire.png";
import Swal from "sweetalert2";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Modal,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Listes() {
  const [showModa, setShowModa] = React.useState(false);
  const [showMod, setShowMod] = React.useState(false);

  const handleClose = () => {
    setShowModa(false);
    setShowMod(false);
  };
  const [record, setRecord] = useState([]);
  const [idImg, setImg] = useState("");
  const token = localStorage.getItem("token");
  // On Page load display all records
  const loadTableList = async () => {
    axios
      .get(`http://localhost:5000/api/imageriemedicale`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        setRecord(response.data);
      });
  };
  useEffect(() => {
    loadTableList();
  }, []);

  const [user, setUser] = useState({
    FichierCR: "",
    Id_Rdv: idImg,
  });
  const { FichierCR } = user;
  //  Object Destructuring
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Insert rendezvous Records
  const submit = async (e) => {
    user.Id_Rdv = idImg;
    //const idImg = user.idImg;
    e.preventDefault();
    await axios.post("http://localhost:5000/api/compterendu", {
      ...user,
      idImg,
    }).then((res) => {
      Swal.fire({
        icon: "success",
        title: "Ajouté avec succès",
        text: "Compte Rendu ajoutée avec succès.",
        confirmButtonColor: "#008000",
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          handleClose();
    loadTableList();
    loadTable();
    loadCompteRendu();
        }
      });
    })
    .catch((err) => {
      console.log(err.message);
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur est survenue lors de l'ajout' des informations.",
      });
    });
  };

  const [CR, setCR] = useState([]);
  // console.log(CR);
  // On Page load display all records

  const loadCompteRendu = async (id) => {
    console.log("get Compte ");
    const idImg = id;
    console.log(idImg);
    await axios
      .get(`http://localhost:5000/api/compterendu/cr/${idImg}`)
      .then((response) => {
        console.log("**** : ", response.data[0]);
        setCR(response.data[0]);
      });
  };
  const [CRA, setCRA] = useState([]);
  // console.log(CR);
  // On Page load display all records

  const loadCompteR = async () => {
    await axios
      .get(`http://localhost:5000/api/compterendu/`)
      .then((response) => {
        console.log("**** : ", response.data);
        setCRA(response.data);
      });
  };
  useEffect(() => {
    loadCompteR();
  }, []);
  const handleCh = (e) => {
    setCR({ ...CR, [e.target.name]: e.target.value });
    console.log(CR);
  };
  const updateSession = async (e) => {
    e.preventDefault();
    console.log("**** update session ****", CR);

    await axios
      .put(`http://localhost:5000/api/compterendu/${CR.Id_Rdv}`, CR)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Modifié avec succès",
          text: "Compte rendu Modifié avec succès.",
          confirmButtonColor: "#008000",
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            handleClose();
            loadTableList(token);
            loadTable();
          }
        });
      })
      .catch((err) => {
        console.log(err.message);
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Une erreur est survenue lors de la mise à jour des informations.",
        });
      });
    };
  /***** Compte Rend*** */

  const deleteRecord = (Id_Rdv) => {
    axios
      .delete(`http://localhost:5000/api/compterendu/${Id_Rdv}`)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Supprimé avec succès",
            text: "Compte rendu supprimé avec succès.",
            confirmButtonColor: "#008000",
          }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
              handleClose();
              loadTableList();
              loadTable();
              loadCompteRendu();
            }
          });
        })
        .catch((err) => {
          console.log(err.message);
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: "Une erreur est survenue lors de la suppression.",
          });
        });
      };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">
                  <img src={scann} width="4%" height="5%" /> Liste des images
                  médicales
                </Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th>Nom Patient</th>
                      <th>Acte</th>
                      <th>Date</th>
                      <th>image médicale</th>
                      <th>compte rendu</th>
                    </tr>
                  </thead>
                  <tbody className="table">
                    {record.map((name, index) => (
                      <tr key={index}>
                        <td>{name.Nom_Patient + " " + name.Prenom_Patient}</td>
                        <td>{name.Nom_Acte}</td>
                        <td>{moment(name.Date_Rdv).format("DD-MM-YYYY")}</td>
                        <td>
                          <a
                            className="text-primary mr-8"
                            target="_blank"
                            href={`/image/${name.Id_Image}`}
                            style={{ display: name.display_img }}
                          >
                            <i
                              className="fas fa-eye"
                              style={{ fontSize: "30px", marginRight: "5px" }}
                            ></i>
                          </a>
                        </td>
                        <td>
                          <a
                            className="text-success "
                            onClick={(e) => {
                              setImg(name.Id_Rdv);
                              setShowModa(true);
                            }}
                          >
                            <i
                              className="fas fa-plus	"
                              style={{
                                fontSize: "26px",
                                marginRight: "20px",
                              }}
                            ></i>
                          </a>
                          {CRA.some((cr) => cr.Id_Rdv === name.Id_Rdv) && (
                            <>
                              <a
                                className="text-info"
                                href={`/compterendu/${name.Id_Rdv}`}
                                target="_blank"
                                style={{ display: name.display_icon }}
                              >
                                <i
                                  className="far fa-file-pdf"
                                  style={{
                                    fontSize: "26px",
                                    marginRight: "20px",
                                  }}
                                ></i>
                              </a>
                              <a
                                className="text-warning"
                                style={{ display: name.display_icon }}
                                onClick={(e) => {
                                  loadCompteRendu(name.Id_Rdv);
                                  setShowMod(true);
                                }}
                              >
                                <i
                                  className="fas fa-edit	"
                                  style={{
                                    fontSize: "26px",
                                    marginRight: "20px",
                                  }}
                                ></i>
                              </a>
                              <a
                                className="text-danger"
                                style={{ display: name.display_icon }}
                                onClick={() => {
                                  const confirmBox = window.confirm(
                                    "Voulez-vous vraiment supprimer le compte rendu "
                                  );
                                  if (confirmBox === true) {
                                    deleteRecord(name.Id_Rdv);
                                  }
                                }}
                              >
                                <i
                                  className="far fa-trash-alt"
                                  style={{ fontSize: "26px" }}
                                ></i>
                              </a>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Modal
                  show={showMod}
                  //    id="modelCompte"
                  onHide={() => setShowMod(false)}
                  md="12"
                >
                  <Modal.Header>
                    <Modal.Title>Modifier Compte rendu</Modal.Title>
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
                    <Row>
                      <Col className="pr-1" md="12">
                        <Form.Group>
                          <form onSubmit={updateSession}>
                            <textarea
                              name="FichierCR"
                              cols="55"
                              rows="10"
                              value={CR.FichierCR}
                              onChange={handleCh}
                              required
                            />

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
                          </form>
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="clearfix"></div>
                  </Modal.Body>
                </Modal>
                <Modal
                  show={showModa}
                  //    id="modelCompte"
                  onHide={() => setShowModa(false)}
                  md="12"
                >
                  <Modal.Header>
                    <Modal.Title>Ajouter Compte rendu</Modal.Title>
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
                    <Row>
                      <Col className="pr-1" md="12">
                        <Form.Group>
                          <form onSubmit={submit}>
                            <textarea
                              name="FichierCR"
                              cols="55"
                              rows="8"
                              onChange={onInputChange}
                              required
                            />
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
                                Ajouter
                              </Button>
                            </div>
                          </form>
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="clearfix"></div>
                  </Modal.Body>
                </Modal>
                {/* /**testt  */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Listes;
