import React from "react";
import { Modal, Row, Col, Form } from "react-bootstrap";

const SpeedCodeSection = ({
    approver,
    grant_holder_name,
    approver_type,
    designate_name,
    approver_email,
    speed_code,
    account
}) => {
    let GrantHolder = (
        <Col>
            <Form.Label className="border-bottom">
                <strong>Grant Holder</strong>
            </Form.Label>
            <p className="fs-5">{grant_holder_name}</p>
        </Col>
    );
    return (
        <>
            <Row>
                <Col>
                    <h3>Speed Code Information</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label className="border-bottom">
                        <strong>Approver Name</strong>
                    </Form.Label>
                    <p className="fs-5">{approver}</p>
                </Col>
                <Col>
                    <Form.Label className="border-bottom">
                        <strong>Type</strong>
                    </Form.Label>
                    <p className="fs-5">{approver_type}</p>
                </Col>

                <Col>
                    <Form.Label className="border-bottom">
                        <strong>Email</strong>
                    </Form.Label>
                    <p className="fs-5">{approver_email}</p>
                </Col>
                {approver_type == 'dosa' ? GrantHolder:null}
            </Row>
            <Row>
                <Col>
                    <Form.Label className="border-bottom">
                        <strong>Speed Code</strong>
                    </Form.Label>
                    <p className="fs-5">{speed_code}</p>
                </Col>
                <Col>
                    <Form.Label className="border-bottom">
                        <strong>Account</strong>
                    </Form.Label>
                    <p className="fs-5">{account}</p>
                </Col>
            </Row>
        </>
    );
};

export default SpeedCodeSection;
