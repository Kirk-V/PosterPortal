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
                <small>Our poster paper is 44 inches (111.7 cm) wide. One poster dimension (width or height) <strong style={{'textDecoration': 'underline'}}>MUST</strong> be 44 inches (111.7 cm) or less.</small>
                <small>We can rotate the poster image to accommodate printing. Maximum poster size is 44 X 100 inches or 111.7 X 254 centimeters.</small>
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
                            isInvalid={ serverValidationAttempted? validationFields?.hasOwnProperty('width') ??false ? true: false: false}
                            isValid={ serverValidationAttempted? validationFields?.hasOwnProperty('width') ??false ? false: true: false }
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
                            isInvalid={ serverValidationAttempted? validationFields?.hasOwnProperty('height') ??false ? true: false: false}
                            isValid={ serverValidationAttempted? validationFields?.hasOwnProperty('height') ??false ? false: true: false }
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
                            onChange={(e) => handleControlUpdate(e)}
                            isInvalid={ serverValidationAttempted? validationFields?.hasOwnProperty('units') ??false ? true: false: false}
                            isValid={ serverValidationAttempted? validationFields?.hasOwnProperty('units') ??false ? false: true: false }>
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
                            defaultValue={formData?.quantity}
                            aria-describedby="basic-addon1"
                            onChange={(e) => {handleControlUpdate(e)}}
                            isInvalid={ serverValidationAttempted? validationFields?.hasOwnProperty('quantity') ??false ? true: false: false}
                            isValid={ serverValidationAttempted? validationFields?.hasOwnProperty('quantity') ??false ? false: true: false }
                        />
                        </FloatingLabel>
                    </InputGroup>
                </Col>
                <Col sm="2">
                    <div className="bg-secondary bg-opacity-10 rounded p-1">
                        <h6>Cost Per Poster</h6>
                        <CurrencyDollar size="25"/>{formData?.cost ?? 0}
                    </div>
                </Col>
                <Col sm="2">
                    <div className="bg-secondary bg-opacity-10 rounded p-1">
                        <h6>Estimated Total</h6>
                        <CurrencyDollar size="25"/>{formData?.total ?? 0}
                    </div>
                </Col>
            </Row>
            <Row>
                <small>An email containing the total cost will be sent when the poster has been placed in the queue for printing.</small>
            </Row>
        </>

    )
}
