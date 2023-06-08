import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { InfoCircle } from 'react-bootstrap-icons';

export default function PosterDetails() {
  return (
    <Row>
        <Form.Group as={Col} sm="6" controlId="validationCustomUsername">
            <FloatingLabel
                controlId="floatingInput"
                label="Approver Name"
                className="mb-3"
            >
                <Form.Control
                    required
                    type="text"
                    name="grant_holder_name"
                />
            </FloatingLabel>
        </Form.Group>
    </Row>
  )
}
