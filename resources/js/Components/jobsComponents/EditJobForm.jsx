// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Container from "react-bootstrap/Container";
// import RequestModalForm from './RequestModalForm';
import { useState, useEffect } from "react";
import { Form, Button, Modal, Row, Col, Container } from "react-bootstrap";
import JobsSendPickUpButton from "./JobsSendPickUpButton";
import PDF from "./PDFDocument";

//Form to change the job data around.
export default function JobForm({ jobsData, onHide, show }) {
    console.log(`OPened module with data: ${JSON.stringify(jobsData)}`);
    
    
    return (
        <>
        <Form>
            <Row>
                <Col>
                <Form.Control
                    type="date"
                    placeholder="Disabled readonly input"
                    aria-label="Disabled input example"
                    readOnly
                />
                </Col>
            </Row>
        </Form>
        </>
    );
}