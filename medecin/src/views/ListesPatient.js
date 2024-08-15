import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Form,
  Table,
  Modal,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function TableList() {
  const token = localStorage.getItem("token");
  const [record, setRecord] = useState([]);
  // On Page load display all records
  const loadTableList = async (token) => {
    axios
      .get(`http://localhost:5000/api/imageriemedicale/Med/`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        setRecord(response.data);
      });
  };
  useEffect(() => {
    loadTableList(token);
  }, []);
  const [CRA, setCRA] = useState([]);
  // console.log(CR);
  // On Page load display all records
console.log(record)
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
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Liste des images médicales</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Nom et Prénom</th>
                      <th className="border-0">Tel</th>
                      <th className="border-0">Acte</th>
                      <th className="border-0">Date</th>
                      <th className="border-0">Image Médicale</th>
                      <th className="border-0">Compte Rendu</th>
                    </tr>
                  </thead>
                  <tbody className="table">
                    {record.map((name, index) => (
                      <tr key={index}>
                        <td>{name.Nom_Patient + " " + name.Prenom_Patient}</td>
                        <td>{name.Tel_Patient}</td>
                        <td>{name.Nom_Acte}</td>
                        <td>{moment(name.Date_Rdv).format("DD-MM-YYYY")}</td>
                        <td>
                          {" "}
                          <a
                            className="text-primary mr-8"
                            href={`/image/${name.Id_Image}`}
                            target="_blank"
                          >
                            <i
                              className="fas fa-eye"
                              style={{ fontSize: "30px", marginRight: "5px" }}
                            ></i>
                          </a>
                        </td>
                        <td>
                        {CRA.some((cr) => cr.Id_Rdv === name.Id_Rdv) && (
                          <a
                            className="text-warning mr-8"
                            href={`/compterendu/${name.Id_Rdv}`}
                            target="_blank"
                          >
                            <i
                              className="far fa-file-pdf"
                              style={{ fontSize: "28px" }}
                            ></i>
                          </a>
                        )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableList;
