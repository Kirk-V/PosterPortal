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
    console.log(`techasdfasdfasdfasd`);
    console.log(`tech: ${jobsData.technician}`);

    const handleControlChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        let data = { ...jobsData }; //Deep copy so that setformD will trigger rerender
        data[`${name}`] = value;
        if (["width", "height", "units"].includes(name)) {
            data.cost = calculateCost(data);
        }
        // setformD(data);
        dataUpdateHandler(data);
    }


    let GrantHolderInfo = (
        <>
            <Row>
                <Col xs={12} className="mt-2">
                    <h4>Grant Holder Information</h4>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control
                        type="Text"
                        name="grant_holder_name"
                        defaultValue={jobsData.grant_holder_name}
                        onChange={(e) => handleControlChange(e)}
                    />
                </Col>
                <Col xs={6}>
                    <Form.Label>
                        Email
                    </Form.Label>
                    <Form.Control
                        type="Text"
                        name="grant_holder_email"
                        defaultValue={jobsData.grant_holder_email}
                        onChange={(e) => handleControlChange(e)}
                    />
                </Col>
            </Row>
            <Row className="mt-2">
                <Col xs={6}>
                    <Form.Label>
                        Speed Code and Account
                    </Form.Label>
                    <Form.Control
                        type="Text"
                        name="speed_code"
                        defaultValue={jobsData.speed_code}
                        onChange={(e) => handleControlChange(e)}
                    />
                </Col>
                <Col xs={6}>
                    <Form.Label>
                        Designate's Name
                    </Form.Label>
                    <Form.Control
                        type="Text"
                        name="designate"
                        defaultValue={jobsData.designate}
                        onChange={(e) => handleControlChange(e)}
                    />
                </Col>
            </Row>
        </>
    )


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
                        <Form.Label>
                            Technician
                        </Form.Label>
                        <Form.Select
                            name="technician"
                            defaultValue={jobsData.technician}
                            onChange={(e) => handleControlChange(e)}>
                            <option value="Rick">Rick</option>
                            <option value="Steve">Steve</option>
                        </Form.Select>
                    </Col>
                    <Col xs={3}>
                        <Form.Label>
                            Department
                        </Form.Label>
                        <Form.Select
                            name="department"
                            defaultValue={jobsData.department}
                            onChange={(e) => handleControlChange(e)}>
                            <option value="Anth">Anthropology</option>
                            <option value="BANDM">Brain and Mind</option>
                            <option value="DAN">DAN Management</option>
                            <option value="DEAN">Deans Office</option>
                            <option value="ECON">Economics</option>
                            <option value="GEO">Geography</option>
                            <option value="HIST">History</option>
                            <option value="INDIG">Indigenous Studies</option>
                            <option value="NEST">NEST</option>
                            <option value="POLI">Politcal Science</option>
                            <option value="PSYCH">Psychology</option>
                            <option value="SOC">Sociology</option>
                            <option value="SSTS">SSTS</option>
                            <option value="OTHER">Other</option>
                        </Form.Select>
                    </Col>
                    <Col xs={3}>
                        <Form.Label>
                            Poster No
                        </Form.Label>
                        <p>{jobsData.poster_id} </p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className="mt-2">
                        <h4>Requisitioner</h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <Form.Label>
                            First Name
                        </Form.Label>
                        <Form.Control
                            type="Text"
                            name="first_name"
                            defaultValue={jobsData.first_name}
                            onChange={(e) => handleControlChange(e)}
                        />
                    </Col>
                    <Col xs={3}>
                        <Form.Label>
                            Last Name
                        </Form.Label>
                        <Form.Control
                            type="Text"
                            name="last_name"
                            defaultValue={jobsData.last_name}
                            onChange={(e) => handleControlChange(e)}
                        />
                    </Col>
                    <Col xs={6}>
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Control
                            type="Text"
                            name="email"
                            defaultValue={jobsData.email}
                            onChange={(e) => handleControlChange(e)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className="mt-2">
                        <h4>Payment</h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <Form.Label>
                            Payment Type
                        </Form.Label>
                        <Form.Select
                            name="payment_method"
                            defaultValue={jobsData.payment_method}
                            onChange={(e) => handleControlChange(e)}>
                            <option value="cash">Cash</option>
                            <option value="speedcode">Speed Code</option>
                        </Form.Select>
                    </Col>
                </Row>
                {jobsData.payment_method == "speedcode" ? GrantHolderInfo : null}
                <Row>
                    <Col xs={12} className="mt-2">
                        <h4>Details</h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2}>
                        <Form.Label>
                            Quantity
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="quantity"
                            defaultValue={jobsData.quantity}
                            onChange={(e) => handleControlChange(e)}/>

                    </Col>
                    <Col xs={3}>
                        <Form.Label>
                            Width
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="width"
                            defaultValue={jobsData.width}
                            onChange={(e) => handleControlChange(e)}/>

                    </Col>
                    <Col xs={3}>
                        <Form.Label>
                            Height
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="height"
                            defaultValue={jobsData.height}
                            onChange={(e) => handleControlChange(e)}/>

                    </Col>
                    <Col xs={3}>
                        <Form.Label>
                            units
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="units"
                            defaultValue={jobsData.units}
                            onChange={(e) => handleControlChange(e)}/>

                    </Col>
                    <Col xs={2}>
                        <Form.Label>
                            cost
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="cost"
                            defaultValue={jobsData.cost}
                            onChange={(e) => handleControlChange(e)}/>
                        </Col>
                </Row>
            </Form>
        </>
    );
}