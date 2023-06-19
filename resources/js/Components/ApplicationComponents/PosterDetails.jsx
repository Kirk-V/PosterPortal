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
import { CurrencyDollar } from 'react-bootstrap-icons';

export default function PosterDetails({serverValidationAttempted, validationFields, formData, handleControlUpdate, formSettings}) {
    const [costPerPoster, setCostPerPoster] = useState(formData?.cost ?? 0);
    const [Total, setTotal] = useState(0);



    return (
        <>
            <Row>
                <h1>Poster Details</h1>
            </Row>
            <Row>
                <small>Poster size is limited to 44 inches in at least one direction (Width or height)</small>
            </Row>
            <Row>
                <Form.Group as={Col} sm="2" controlId="validationCustomUsername">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Width"
                        className="mb-3"
                    >
                        <Form.Control
                            required
                            type="number"
                            name="width"
                            onChange={(e) => handleControlUpdate(e)}
                            isInvalid={ serverValidationAttempted? !validationFields?.width: false}
                            isValid={ serverValidationAttempted? validationFields?.width: false}
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} sm="2" controlId="validationCustomUsername">
                    <FloatingLabel
                        required
                        controlId="floatingInput"
                        label="Height"
                        className="mb-3"
                    >
                        <Form.Control
                            required
                            type="number"
                            name="height"
                            onChange={(e) => handleControlUpdate(e)}
                            isInvalid={ serverValidationAttempted? !validationFields?.height: false}
                            isValid={ serverValidationAttempted? validationFields?.height: false}
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} sm="2">
                    <FloatingLabel
                        controlId="FloatingUnitsSelect"
                        label="units"
                        className="mb-3">
                        <Form.Select
                            required
                            name="units"
                            defaultValue=""
                            onChange={(e) => handleControlUpdate(e)}
                            isInvalid={ serverValidationAttempted? !validationFields?.units: false}
                            isValid={ serverValidationAttempted? validationFields?.units: false}>
                            <option value="" hidden></option>
                            <option value="cm">cm</option>
                            <option value="inches">inches</option>
                        </Form.Select>
                    </FloatingLabel>
                </Form.Group>
            </Row>

            <Row >
                <Col sm="2" >
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">X</InputGroup.Text>
                        <FloatingLabel
                            controlId="FloatingUnitsSelect"
                            label="Quantity">
                        <Form.Control
                            required
                            aria-label="Quantity"
                            name="quantity"
                            type="number"
                            aria-describedby="basic-addon1"
                            onChange={(e) => {handleControlUpdate(e)}}
                            isInvalid={ serverValidationAttempted? !validationFields?.quantity: false}
                            isValid={ serverValidationAttempted? validationFields?.quantity: false}
                        />
                        </FloatingLabel>
                    </InputGroup>
                </Col>
                <Col sm="2">
                    <div className="bg-secondary bg-opacity-10 rounded p-1">
                        <h6>Cost Per Poster</h6>
                        <CurrencyDollar size="25"/>{formData?.cost?.toFixed(2) ?? 0}
                    </div>
                </Col>
                <Col sm="2">
                    <div className="bg-secondary bg-opacity-10 rounded p-1">
                        <h6>Estimated Total</h6>
                        <CurrencyDollar size="25"/>{formData?.total?.toFixed(2) ?? 0}
                    </div>
                </Col>
            </Row>
            <Row>
                <small>Pre=payment for poster printing is NOT required. Total cost will be calculated when the poster has been placed in the queue for printing.</small>
            </Row>
        </>

    )
}
