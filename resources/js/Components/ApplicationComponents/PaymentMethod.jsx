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

export default function PaymentMethod({serverValidationAttempted, validationFields, formData, handleControlUpdate, departmentList}) {
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

    const DosaGrantHolderSection = (
        
        <Row>
            <Form.Group as={Col} sm="6" controlId="Dosa_grantHolder">
                <FloatingLabel
                    controlId="floatingInput"
                    label="Grant Holder's Name"
                    className="mb-3"
                >
                    <Form.Control
                        required
                        type="text"
                        name="grant_holder_name"
                        pattern="([A-Za-z \-]+){2,}"
                        onChange={(e) => handleControlUpdate(e)}
                        isInvalid={ serverValidationAttempted? validationFields?.hasOwn('grant_holder_name')??false  ? true: false: false}
                isValid={ serverValidationAttempted? validationFields?.hasOwn('grant_holder_name') ?? false ? true: false: false }
                    />
                </FloatingLabel>
            </Form.Group>
        </Row>
    )

    const ApproverSection = (
        <>
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
                        name="approver_name"
                        pattern="([A-Za-z \-]+){2,}"
                        onChange={handleControlUpdate}
                        isInvalid={ serverValidationAttempted? validationFields?.hasOwn('approver_name') ??false ? true: false: false}
                        isValid={ serverValidationAttempted? validationFields?.hasOwn('approver_name') ??false ? true: false :false}
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
                        name="approver_email"
                        pattern="^[a-z0-9_.%+\-]+@uwo\.ca"
                        onChange={handleControlUpdate}
                        isInvalid={ serverValidationAttempted? validationFields?.hasOwn('approver_email') ??false ? true: false: false}
                        isValid={ serverValidationAttempted? validationFields?.hasOwn('approver_email') ??false ? true: false :false }
                    />
                </FloatingLabel>
            </Form.Group>
        </Row>
        {formData?.approver_type != "grant_holder" ? DosaGrantHolderSection: null}
        </>

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
                            aria-label="Approver type Select"
                            required
                            defaultValue=""
                            name="approver_type"
                            onChange={(e) => {HandleApproverTypeChange(e), handleControlUpdate(e)}}
                            isInvalid={ serverValidationAttempted? validationFields?.hasOwn('approver_type') ??false? true: false: false}
                            isValid={ serverValidationAttempted? validationFields?.hasOwn('approver_type') ??false ? true: false:false  }
                            >
                            <option value="" disabled hidden></option>
                            <option value="grant_holder">Research Grant Holder</option>
                            <option value="dosa">DoSA Designate</option>
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
                        onChange={(e) => {HandlePaymentChange(e), handleControlUpdate(e)}}
                        isInvalid={ serverValidationAttempted? validationFields?.hasOwn('payment_method') ??false ? true: false: false}
                            isValid={ serverValidationAttempted? validationFields?.hasOwn('payment_method') ??false ? true: false: false  }
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
                        isInvalid={ serverValidationAttempted? validationFields?.hasOwn('payment_method') ? true: false: false}
                            isValid={ serverValidationAttempted? validationFields?.hasOwn('payment_method') ??false ? true: false: false  }
                        onChange={(e) => {HandlePaymentChange(e), handleControlUpdate(e)}}
                    />
                </Col>
            </Row>
            {PaymentMethod == "speed_code"? SpeedCodeSection : CashSection}
        </>
    )
}
