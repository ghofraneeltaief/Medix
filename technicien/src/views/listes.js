import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
// react-bootstrap components
import { Card, Modal, Form, Table, Container, Row, Col } from "react-bootstrap";

function Listes() {
  const [isopen, setIsopen] = React.useState(false);
  const handleClose = () => {
    setIsopen(false);
  };
  const [idacte, setActe] = useState("");
  const [Image, setImage] = useState([]);
  const [idrdv, setRdv] = useState("");
  const [file, setfile] = useState();
  const token = localStorage.getItem("token");
  const [record, setRecord] = useState([]);
  // On Page load display all records
  const loadTableList = async (token) => {
    axios
      .get(`http://localhost:5000/api/rendezvous`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        setRecord(response.data);
      });
  };
  useEffect(() => {
    loadTableList(token);
  }, []);
// On Page load display all records
const loadTable = async () => {
  axios.get(`http://localhost:5000/api/imageriemedicale`, {
    headers: { Authorization: token },
  })
  .then((response) => {
    setImage(response.data);
  });
};
useEffect(() => {
  loadTable();
}, []);
const formdata = new FormData();
const ajouter = async (e) => {
  formdata.FicheImg = file.name;
  formdata.Id_Acte = idacte;
  formdata.Id_Rdv = idrdv;
  e.preventDefault();
  await axios.post("http://localhost:5000/api/imageriemedicale", {
    ...formdata,
    idacte,
    idrdv,
  }).then((res) => {
    Swal.fire({
      icon: "success",
      title: "Ajouté avec succès",
      text: "Image médicale ajoutée avec succès.",
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
      text: "Une erreur est survenue lors de l'ajout.",
    });
  });
};
const deleteRecord = (Id_Rdv) => {
  axios
    .delete(`http://localhost:5000/api/imageriemedicale/${Id_Rdv}`)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Supprimé avec succès",
          text: "Imagerie médicale supprimé avec succès.",
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
                <Card.Title as="h4"> Liste des images médicales</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th>Nom Patient</th>
                      <th>Acte</th>
                      <th>Date </th>
                      <th>image médicale</th>
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
                            className="text-success "
                            onClick={(e) => {
                              setActe(name.Id_Acte);
                              setRdv(name.Id_Rdv);
                              setIsopen(true);
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
                          {Image.some((image) => image.Id_Rdv === name.Id_Rdv) && (
                            <>
                          <a
                            className="text-primary mr-8"
                            target="_blank"
                            href={`/image/${name.Id_Rdv}`}
                          >
                            <i
                              className="fas fa-eye"
                              style={{ fontSize: "30px",
                                marginRight: "25px", }}
                            ></i>
                          </a>
                          <a
                          className="text-danger"
                          style={{ display: name.display_icon }}
                          onClick={() => {
                            const confirmBox = window.confirm(
                              "Voulez-vous vraiment supprimer l'imagerie medicale' "
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
                  show={isopen}
                  //    id="modelCompte"
                  onHide={() => setIsopen(false)}
                  md="12"
                >
                  <Modal.Header>
                    <Modal.Title>Ajouter image medicale</Modal.Title>
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
                          <form onSubmit={ajouter}>
                            <input
                              type="file"
                              name="FicheImg"
                              onChange={(e) => setfile(e.target.files[0])}
                            />
                            <input type="submit" value="Ajouter" />
                            <div class="col-12">
                              <div class="form-check">
                                <label
                                  class="form-check-label"
                                  for="invalidCheck2"
                                ></label>
                              </div>
                            </div>
                          </form>
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="clearfix"></div>
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

export default Listes;
