import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  NavDropdown,
  Offcanvas,
  Row,
  Card
} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./navbar.css";
import Categories from "./Categories";

function Navbar1() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container
      className="navbar-side"
      fluid
      style={{
        height: "100vh",
        position: "fixed",
        width: "auto",
        top: "0",
        left: "0",
        paddingTop: "30px",
      }}
    >
      <Row style={{ height: "10vh" }}></Row>
      <Row>
        <Col lg={12}>
          <div className="mobile">
            <Navbar expand="lg">
              <Container>
                <Col>
                  <Navbar.Toggle
                    className="toggle"
                    aria-controls="basic-navbar-nav"
                    onClick={handleShow}
                  />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Offcanvas show={show} onHide={handleClose}>
                      <Offcanvas.Header closeButton></Offcanvas.Header>
                      <Offcanvas.Body>
                        <Nav>
                          <div>
                            <Nav.Link
                              className="sidenavbar"
                              style={{ width: "100%" }}
                              href="/Homepage"
                            >
                              POLL LIST
                            </Nav.Link>
                            <hr />
                            
                            <Nav.Link className="sidenavbar" href="/Addpoll">
                              ADD POLL
                            </Nav.Link>
                            <hr />
                            <Nav.Link className="sidenavbar" k href="#link">
                              VOTED POLLS
                            </Nav.Link>
                            <hr />
                            <Nav.Link className="sidenavbar" href="/ProfilePage">
                              USER DETAILS
                            </Nav.Link>
                            <hr />
                          </div>
                        </Nav>
                      </Offcanvas.Body>
                    </Offcanvas>
                  </Navbar.Collapse>
                </Col>
              </Container>
            </Navbar>
          </div>

          {/* FOR LAPTOP SCREEN */}

          <div className="Laptop">
            <Navbar expand="lg">
              <Container>
                <Col>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                      <div>
                        <Card  className="AddPollCarddddd">
                        <div style={{display:'flex'}}>
                      <i style={{fontSize:'25px'}} class="bi bi-list-task"></i>
                        <Nav.Link
                          className="sidenavbar"
                          style={{ width: "100%" }}
                          href="/Homepage" >
                          POLL LIST
                        </Nav.Link>
                        </div>
                        </Card>
                        <Card className="AddPollCarddddd">
                        <div style={{display:'flex'}}>
                        <i style={{fontSize:'25px'}}  class="bi bi-plus-circle-fill"></i>
                        <Nav.Link className="sidenavbar"  href="/Addpoll">
                          ADD POLL
                        </Nav.Link>
                        </div>
                        </Card>
                        <Card className="AddPollCarddddd">
                        <div style={{display:'flex'}}>
                        <i style={{fontSize:'25px'}} class="bi bi-person-lines-fill"></i>
                        <Nav.Link className="sidenavbar" href="/ProfilePage">
                          USER DETAILS
                        </Nav.Link>
                        </div>
                        </Card>
                      </div>
                     
                    </Nav>
                  </Navbar.Collapse>
                </Col>
              </Container>
            </Navbar>
          </div>
        </Col>
      </Row>
      <Row style={{ display: "block" }}>
        <Categories />
      </Row>
    </Container>
  );
}
export default Navbar1;
