import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export default function QuickEmail({reqEmail}) {
  console.log("Email "+reqEmail);
  return (
    <Row>
        <Col className="justify-content-end d-flex">
          <h3><a href={"mailto:"+reqEmail}>send</a></h3>
        </Col>
    </Row>
  )
}
