import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export default function QuickEmail({ reqEmail }) {
  console.log("Email " + reqEmail);
  return (
    <Row>
      <Col xs={12} className="bg-primary opacity-50 rounded p-3">
        <Row>
          <Col xs={6} >
          <Form.Group
            className="mb-3"
            controlId="requestFormFirstName"
          >
            <Form.Control
              name="first_name"
              type="text"
              defaultValue={reqEmail}
              required
            />
          </Form.Group></Col>
        </Row>
        <Row>
          <Col xs={12} >
          <Form.Group
            className="mb-3"
            controlId="requestFormFirstName"
          >
            <Form.Control
              name="first_name"
              as="textarea"
              value="test"

              required
            />
          </Form.Group></Col>
        </Row>
      </Col>
    </Row>
  )
}
