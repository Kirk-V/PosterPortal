import React from "react";
import { Row, Col, Form, Table } from "react-bootstrap";

const PaymentSection = ({
    quantity,
    width,
    height,
    units,
    total,
    total_received,
    discount,
    discount_eligible,
    payment_method
}) => {
    let Discount = (
        <Row className="ms-4 border-bottom">
            <Col xs={9} className="d-flex">
                <Form.Label className="ms-auto">
                    <strong>Discount</strong>
                </Form.Label>
            </Col>
            <Col xs={3}>
                <p className="fs-5">{parseFloat(discount).toFixed(2)}</p>
            </Col>
        </Row>
    );
    return (
        <>
            <Row className="mt-3">
                <Col>
                    <h3>Payment</h3>
                </Col>
            </Row>
            <div className="ms-4 mt-3">
                <Row className=" border-bottom">
                    <Col xs={3}>
                        <Form.Label>
                            <strong>Quantity</strong>
                        </Form.Label>
                    </Col>
                    <Col xs={6}>
                        <Form.Label>
                            <strong>Details</strong>
                        </Form.Label>
                    </Col>
                    <Col xs={3}>
                        <Form.Label>
                            <strong>Totals</strong>
                        </Form.Label>
                    </Col>
                </Row>
                <Row className="border-bottom">
                    <Col xs={3}>
                        <p className="fs-5">{quantity}</p>
                    </Col>
                    <Col xs={6}>
                        <p className="fs-5">
                            {parseFloat(width).toFixed(2)} x{" "}
                            {parseFloat(height).toFixed(2)} {units}
                        </p>
                    </Col>

                    <Col xs={3}>
                        <p className="fs-5">{total}</p>
                    </Col>
                </Row>
                {discount_eligible ? Discount : null}
                <Row>
                    <Col xs={9} className="d-flex">
                        <Form.Label className="ms-auto">
                            <strong>{payment_method == 'speed_code'? "Total" : "Cash Received"}</strong>
                        </Form.Label>
                    </Col>
                    <Col xs={3}>
                        <p className="fs-5">
                            {parseFloat(total_received).toFixed(2)}
                        </p>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default PaymentSection;
