import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Col, Container, Row } from "reactstrap";
import "./setup.css";

import axios from "axios";

const Setup = () => {
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");

  const [joinList, setJoinList] = useState([]);

  // const displayInfo = () => {
  //   console.log(nick + email);
  // };
  const addSignUp = async () => {
    await axios
      .post("http://localhost:5000/user/register", { nick: nick, email: email })
      .then(() => {
        console.log("success");
      });
  };

  const getJoinus = async () => {
    await axios.get("http://localhost:5000/user/login").then((response) => {
      console.log(response);
    });
  };

  return (
    <Fragment>
      <Container className="setup__container">
        <Row>
          <Col lg="12" className="mb-3">
            <div className="free__list__top">
              <h3>User Registeration</h3>
              <h5>Join Us</h5>
            </div>
          </Col>
          <Card
            border="light"
            style={{
              width: "30rem",
              height: "22rem",
              backgroundColor: "black",
              marginBottom: "20px",
            }}
          >
            <Card.Body>
              <Card.Text>It's your CHOICS</Card.Text>
              <Card.Img variant="top" src="" className="select_char" />
              <div className="show__box">
                <button className="show__btn" onClick={getJoinus}>
                  Show
                </button>
              </div>
            </Card.Body>
          </Card>
          <Col>
            <Card
              border="light"
              style={{
                width: "40rem",
                height: "22rem",
                backgroundColor: "black",
                marginBottom: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Card.Body>
                <Card.Text>Welcome !</Card.Text>
                <div className="welcome__form">
                  <label>Create Cool Nickname : </label>
                  <input
                    type="text"
                    onChange={(e) => setNick(e.target.value)}
                  />
                  <br />
                  <label>E-mail : </label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <br />
                <button className="welcome__btn" onClick={addSignUp}>
                  Let's Get Started
                </button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <div className="btn__container">
        <Link to="/join/step3">Back</Link>
      </div>
    </Fragment>
  );
};

export default Setup;
