// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Container from "react-bootstrap/Container";
// import RequestModalForm from './RequestModalForm';
import { useState, useEffect } from "react";
import { Form, Button, Modal, Row, Col, Container, FormLabel } from "react-bootstrap";
import JobsSendPickUpButton from "./JobsSendPickUpButton";
import PDF from "./PDFDocument";

//Form to change the job data around.
export default function JobForm({ jobsData, onHide, show, dataUpdateHandler }) {
    console.log(`OPened module with data: ${JSON.stringify(jobsData)}`);
    
    
    return (
        <>
        <Form className="border rounded p-3">
            <Row>
                <Col xs={3}>
                    <FormLabel>Transaction Date</FormLabel>
                    <Form.Control
                        type="date"
                        name=""
                        placeholder="DateRange"
                        aria-label="Disabled input example"
                    />
                </Col>
                <Col xs={3}>
                    <FormLabel>Technician</FormLabel>
                    <Form.Select
                        defaultValue={jobsData.technician}
                        placeholder="DateRange"
                        aria-label="Disabled input example"
                    >
                        
                    </Form.Select>
                </Col>
            </Row>
        </Form>
        </>
    );
}