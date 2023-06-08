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

export default function PaymentMethod() {
    const [PaymentMethod, setPaymentMethod] = useState(null);
    const [ApproverType, setApproverType] = useState(null);

    const HandleApproverTypeChange = (event) => {
        setApproverType(event.value)
    }

    const HandlePaymentChange = (event) => {
        let radio = event.target;
        if (radio.checked) {
            console.log(`Switching to ${radio.value}`)
            setPaymentMethod(radio.value);
        }
    }

    const renderDosaTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            DoSA - Delegation of Signing Authority allows an alternate authorized individual to approve expenses on a specific Research Grant/Speed code.
        </Tooltip>
    );

    const renderAdministratorTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            An Administrator has authorization to approve expenses for Department Administrative accounts.
        </Tooltip>
    );

    const CashSection = (
        <Row >
            <Col>
            Cash payments can be made at the time of pick-up.
            </Col>
        </Row>
    )

    const ApproverSection = (
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
            <Form.Group as={Col} sm="6" controlId="validationCustomUsername">
                <FloatingLabel
                    controlId="floatingInput"
                    label="Approver Email"
                    className="mb-3"
                >
                    <Form.Control
                        required
                        type="email"
                        name="email"
                        pattern="[a-z0-9._%+-]+[@]\buwo.ca"
                    />
                </FloatingLabel>
            </Form.Group>
        </Row>
    )

    const SpeedCodeSection = (
        <>
            <Row>
                <p>
                    An automated email will be sent to the Grant Holder, DoSA Designate<OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderDosaTooltip}
                    >
                        <InfoCircle className="ms-0" size={14} />
                    </OverlayTrigger>, or Administrator<OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderAdministratorTooltip}
                    >
                        <InfoCircle size={14} />
                    </OverlayTrigger> with instructions
                    to approve the payment and provide a speed code. The transaction must be approved in order for your poster to be printed.

                </p>
            </Row>
            <Row>
                <Form.Group
                    as={Col}
                    sm="6"
                    controlId="validationCustom01">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Approver Type"
                        className="mb-3"
                    >
                        <Form.Select
                            aria-label="Department Select"
                            required
                            defaultValue="">
                            <option value="" disabled hidden></option>
                            <option value="grant_holder">Research Grant Holder</option>
                            <option value="designate">DoSA Designate</option>
                            <option value="administrator">Administrator</option>
                        </Form.Select>
                    </FloatingLabel>
                    <Form.Control.Feedback>
                        Looks good!
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            {ApproverSection}
        </>
    )



    return (
        <>
            <Row>
                <h1>Payment Method</h1>
                <small>*Payment cannot be changed after submission</small>
            </Row>
            <Row className="mt-2 mb-2">
                <Col sm="3">
                    <Form.Check
                        inline
                        required
                        label="Cash"
                        name="payment_method"
                        type="radio"
                        id="payment_method"
                        value="cash"
                        onChange={HandlePaymentChange}
                    />
                </Col>
                <Col sm="3">
                    <Form.Check
                        inline
                        required
                        label="Speed Code"
                        name="payment_method"
                        type="radio"
                        id="payment_method"
                        value="speed_code"
                        onChange={HandlePaymentChange}
                    />
                </Col>
            </Row>
            {PaymentMethod == "speed_code"? SpeedCodeSection : CashSection}
        </>
    )
}
