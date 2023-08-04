import React from "react";
import { Modal, Row, Col, Form } from "react-bootstrap";

const DiscountSection = ({ course, department }) => {
    return (
        <>
            <Row>
                <Col>
                    <h5>Discount Information</h5>
                </Col>
            </Row>
            <Row>
                <Col xs={3}>
                    <Form.Label className="border-bottom">
                        <strong>Course</strong>
                    </Form.Label>
                    <p className="fs-5">{course}</p>
                </Col>
                <Col xs={3}>
                    <Form.Label className="border-bottom">
                        <strong>Department</strong>
                    </Form.Label>
                    <p className="fs-5">{department}</p>
                </Col>
            </Row>
        </>
    );
};

export default DiscountSection;
