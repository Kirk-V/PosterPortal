import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function NavBar() {
    return (
        <Navbar bg="light" variant="light" fixed="top" expand="md">
            <Container>
                {/* <Row>
                    <Col xs={6}> */}
                        <Navbar.Brand>
                            <Image
                                src="https://www.uwo.ca/web_standards/img/logos-faculties-stacked/svg/Western_Logo_F_S_SocialScience_RGB.svg"
                                // width="300"
                                className="d-none d-sm-inline-block align-top w-100"
                            />{" "}
                        </Navbar.Brand>
                    {/* </Col>
                </Row>
                <Row>
                    <Col> */}
                        <Navbar.Toggle
                            aria-controls={`offcanvasNavbar-expand-md`}
                        />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-md`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title
                                    id={`offcanvasNavbarLabel-expand-md`}
                                >
                                    Offcanvas
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav
                                    variant="pills"
                                    className="justify-content-end flex-grow-1 pe-3"
                                    defaultActiveKey="/home"
                                >
                                    <Nav.Item>
                                        <Nav.Link href="/requests">
                                            requests
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="/jobs">
                                            Jobs
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="/settings">
                                            Settings
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    {/* </Col>
                </Row> */}
            </Container>
        </Navbar>
    );
}
