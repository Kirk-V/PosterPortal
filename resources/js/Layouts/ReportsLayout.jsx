import React from 'react'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Link } from '@inertiajs/react'


export default function ReportsLayout() {
  return (
    <Navbar bg="light" variant="light" expand="md">
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
            </Container>
        </Navbar>
  )
}
