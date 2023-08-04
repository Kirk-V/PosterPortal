import React from 'react';
import { Modal, Row, Col, Form } from "react-bootstrap";

const RequisitionerSection = ({first_name, last_name, email, department, payment_method}) => {
    return (
        <div>
            <>
            <Row>
                <Col>
                    <h3>Requisitioner</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label className="border-bottom">
                        <strong>Name</strong>
                    </Form.Label>
                    <p className="fs-5">
                        {first_name}{" "}
                        {last_name}
                    </p>
                </Col>
                <Col>
                    <Form.Label className="border-bottom">
                        <strong>Email</strong>
                    </Form.Label>
                    <p className="fs-5">{email}</p>
                </Col>

                <Col>
                    <Form.Label className="border-bottom">
                        <strong>Department</strong>
                    </Form.Label>
                    <p className="fs-5">{department}</p>
                </Col>
                <Col>
                    <Form.Label className="border-bottom">
                        <strong>Payment Method</strong>
                    </Form.Label>
                    <p className="fs-5">
                        {payment_method == "speed_code"
                            ? "Speed Code"
                            : "Cash"}
                    </p>
                </Col>
            </Row>
        </>
        </div>
    );
}

export default RequisitionerSection;
