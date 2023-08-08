// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Container from "react-bootstrap/Container";
// import RequestModalForm from './RequestModalForm';
import { useState, useEffect } from "react";
import { Form, Button, Modal, Row, Col, Container, FormLabel, InputGroup } from "react-bootstrap";
import JobsSendPickUpButton from "./JobsSendPickUpButton";
import PDF from "./PDFDocument";

//Form to change the job data around.
export default function JobForm({ jobsData, onHide, show, dataUpdateHandler, handleShowReceipt, departments}) {
    const [totalCost, setTotalCost] = useState(0)
    const [validated, setValidated] = useState(false);
    const [transactionDate, setTransactionDate] = useState(jobsData.transaction_date);
    const [totalReceieved, setTotalReceived] = useState(jobsData.total_received);

    console.log(JSON.stringify(jobsData));
    if (transactionDate == null) {

        let data = { ...jobsData }; //Deep copy so that setformD will trigger rerender
        data[`transaction_date`] = new Date().toISOString().split('T')[0];
        setTransactionDate(data['transaction_date']);
        dataUpdateHandler(data);
    }

    if(totalReceieved == 0)
    {
        console.log("Updating total REceived")
        let data = {...jobsData};
        data['total_received'] = jobsData.cost * jobsData.quantity - jobsData.discount;
        setTotalReceived(data['total_received']);
        dataUpdateHandler(data);
    }
    // const setDefaultTransactionDate = () => {
    //     console.log("setting transaction date");
    //     let data = { ...jobsData }; //Deep copy so that setformD will trigger rerender
    //     data[`transaction_date`] = new Date().toISOString().split('T')[0];

    // }

    const handleControlChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        let data = { ...jobsData }; //Deep copy so that setformD will trigger rerender
        data[`${name}`] = value;
        // if (["width", "height", "units"].includes(name)) {
        //     data.cost = calculateCost(data);
        // }
        // setformD(data);
        dataUpdateHandler(data);
    }

    const handleSaveAndMakeReceipt = (event) => {
        // Send Data to backEnd
    }

    const handleFormSubmit = (event) => {
        console.log("receiptform submitted");
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            console.log("not valid");
        }
        else {
            //We have a valid form. We can now send data show the receipt. 
            let options = {
                method: 'POST',
                body: JSON.stringify(jobsData),
                headers: {
                    // the content type header value is usually auto-set
                    // depending on the request body
                    "Content-Type": 'application/json',
                    'Accept': 'application/json'
                },
            }
            console.log("sending data to make transaction: "+JSON.stringify(jobsData));
            fetch(`api/jobs/makeTransactionAndUpdate`, options)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }
                    return res.json()
                })
                .then((response) => {
                    console.log("req data:");
                    console.log(`okay, Added Transaction Reply: ${JSON.stringify(response)}`);
                    // setRequest(response);
                    if (response.status == "Success") {
                        console.log("success, updating UI state");
                        handleShowReceipt();
                    }

                })
                .catch((error) => {
                    console.log(error)
                })

            //Show Reciept by calling handleShowReceipt
        }
    }

    const calculateTotalCost = () => {
        return jobsData.quantity * jobsData.cost;
    }

    const updateTotalReceived = () => {
        let discount = jobsData.discount_eligible == 1 ? jobsData.discount : 0;
        jobsData.total_received = jobsData.cost * jobsData.quantity - discount;
        console.log("new total received = " + jobsData.total_received);
        let data = { ...jobsData };
        dataUpdateHandler(data);
    }

    const updateTotalCost = () => {
        jobsData.total = (jobsData.cost * jobsData.quantity).toFixed(2);
        console.log("new total = " + jobsData.total);
        let data = { ...jobsData };
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
                <Col xs={4}>
                    <Form.Label className="mb-0">
                        Approver Type
                    </Form.Label>
                    <Form.Select
                        name="approver_type"
                        defaultValue={jobsData.approver_type}
                        onChange={(e) => handleControlChange(e)}>
                        <option value="dosa">Designate</option>
                        <option value="grant_holder">Grant Holder</option>
                        <option value="administrator">Administrator</option>
                    </Form.Select>
                </Col>
                <Col xs={4}>
                    <Form.Label className="mb-0">
                        Approver Name
                    </Form.Label>
                    <Form.Control
                        type="Text"
                        name="approver_name"
                        defaultValue={jobsData.approver_name}
                        onChange={(e) => handleControlChange(e)}
                    />
                </Col>
                <Col xs={4}>
                    <Form.Label className="mb-0">
                        Email
                    </Form.Label>
                    <Form.Control
                        type="Text"
                        name="approver_email"
                        defaultValue={jobsData.approver_email}
                        onChange={(e) => handleControlChange(e)}
                    />
                </Col>
            </Row>
            <Row className="mt-2">
                
                <Col xs={4}>
                    <Form.Label className="mb-0">
                        Grant Holder
                    </Form.Label>
                    <Form.Control
                        type="Text"
                        name="grant_holder_name"
                        defaultValue={jobsData.grant_holder_name}
                        onChange={(e) => handleControlChange(e)}
                    />
                </Col>
                <Col xs={4}>
                    <Form.Label className="mb-0">
                        Approver
                    </Form.Label>
                    <Form.Control
                        type="Text"
                        name="approver_name"
                        defaultValue={jobsData.approver_name}
                        onChange={(e) => handleControlChange(e)}
                    />
                </Col>
                <Col xs={4}>
                        <Form.Label className="mb-0">Approver Department</Form.Label>
                        <Form.Select
                            name="approver_department"
                            value={jobsData.approver_department}
                            onChange={(e) => handleControlChange(e)}>
                                <option value={'Null'}></option>
                                {departments.map((departmentName) => (
                                    <option key={departmentName} value={departmentName}>{departmentName}</option>
                                ))}
                        </Form.Select>
                    </Col>
            </Row>

        </>
    )

    let DiscountSection = (
        <Row className="justify-content-end">
            <Col xs={3}>
                <Form.Label className="mb-0">
                    Discount
                </Form.Label>
                <InputGroup>
                    <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                    <Form.Control
                        type="number"
                        name="discount"
                        defaultValue={parseFloat(jobsData.discount).toFixed(2)}
                        onChange={(e) => handleControlChange(e)} />
                </InputGroup>
            </Col>
        </Row>
    )

    let SpeedCodeSection = (
        <>
            <Col xs={4}>
            <Form.Label className="mb-0">
                        Speed Code
                    </Form.Label>
                    <Form.Control
                        type="Text"
                        name="speed_code"
                        defaultValue={totalReceieved}
                        onChange={(e) => handleControlChange(e)}
                    />
            </Col>
            <Col xs={4}>
            <Form.Label className="mb-0">
                        Account
                    </Form.Label>
                    <Form.Control
                        type="Text"
                        name="account"
                        defaultValue={jobsData.account}
                        onChange={(e) => handleControlChange(e)}
                    />
            </Col>
        </>
    )

    return (
        <>
            <Form className="border rounded p-3" noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Row>
                    <Col xs={3}>
                        <FormLabel className="mb-0">Transaction Date</FormLabel>
                        <Form.Control
                            onChange={(e) => handleControlChange(e)}
                            type="date"
                            name="transaction_date"
                            value={transactionDate}
                            placeholder="DateRange"
                            aria-label="Disabled input example"
                            required
                        />
                    </Col>
                    <Col xs={3}>
                        <Form.Label className="mb-0">Technician</Form.Label>
                        <Form.Select
                            name="technician"
                            defaultValue={jobsData.technician}
                            onChange={(e) => handleControlChange(e)}>
                            <option value="Rick">Rick</option>
                            <option value="Steve">Steve</option>
                        </Form.Select>
                    </Col>
                    <Col xs={3}>
                        <Form.Label className="mb-0">Department</Form.Label>
                        <Form.Select
                            name="department"
                            defaultValue={jobsData.department}
                            onChange={(e) => handleControlChange(e)}>
                                {departments.map((departmentName) => (
                                    <option key={departmentName} value={departmentName}>{departmentName}</option>
                                ))}
                        </Form.Select>
                    </Col>
                    <Col xs={3}>
                        <Form.Label className="mb-0">
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
                        <Form.Label className="mb-0">
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
                        <Form.Label className="mb-0">
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
                        <Form.Label className="mb-0">
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
                    <Col xs={4}>
                        <Form.Label className="mb-0">
                            Payment Type
                        </Form.Label>
                        <Form.Select
                            name="payment_method"
                            defaultValue={jobsData.payment_method}
                            onChange={(e) => handleControlChange(e)}>
                            <option value="cash">Cash</option>
                            <option value="speed_code">Speed Code</option>
                        </Form.Select>
                    </Col>
                    {jobsData.payment_method == "speed_code" ? SpeedCodeSection : null}
                </Row>
                {jobsData.payment_method == "speed_code" ? GrantHolderInfo : null}
                <Row>
                    <Col xs={12} className="mt-2">
                        <h4>Details</h4>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-between">
                    <Col xs={2}>
                        <Form.Label className="mb-0">
                            Quantity
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="quantity"
                            defaultValue={jobsData.quantity}
                            onChange={(e) => handleControlChange(e)} />

                    </Col>
                    <Col xs={2}>
                        <Form.Label className="mb-0">
                            Width
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="width"
                            pattern="^\d*(\.\d{0,2})?$"
                            defaultValue={parseFloat(jobsData.width).toFixed(2)}
                            onChange={(e) => handleControlChange(e)} />

                    </Col>
                    <Col xs={2}>
                        <Form.Label className="mb-0">
                            Height
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="height"
                            defaultValue={jobsData.height}
                            onChange={(e) => handleControlChange(e)} />

                    </Col>
                    <Col xs={2}>
                        <Form.Label className="mb-0">
                            units
                        </Form.Label>
                        <Form.Select
                            name="units"
                            defaultValue={jobsData.units}
                            onChange={(e) => handleControlChange(e)}>
                            <option value="centimeters">cm</option>
                            <option value="inches">Inches</option>
                        </Form.Select>

                    </Col>
                    <Col xs={3}>
                        <Form.Label className="mb-0">
                            cost Per Poster
                        </Form.Label>
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                            <Form.Control
                                type="number"
                                name="cost"
                                // value ={calculateTotalCost()}
                                defaultValue={parseFloat(jobsData.cost).toFixed(2)}
                                onChange={(e) => handleControlChange(e)} />
                        </InputGroup>

                    </Col>
                </Row>

                <Row className="justify-content-end">
                    <Col xs={3}>
                        <Form.Label className="mb-0">
                            Sub Total
                        </Form.Label>
                        <InputGroup>
                            <Button variant="outline-secondary" id="button-addon1" onClick={updateTotalCost}>
                                $
                            </Button>
                            {/* <InputGroup.Button id="basic-addon1">$</InputGroup.Button> */}
                            <Form.Control
                                type="number"
                                name="total"
                                value={parseFloat(jobsData.total).toFixed(2)}
                                onChange={(e) => handleControlChange(e)}
                                required />
                        </InputGroup>
                    </Col>
                </Row>

                {jobsData.discount_eligible == "1" ? DiscountSection : null}


                <Row className="justify-content-end">
                    <Col xs={3}>
                        <Form.Label className="mb-0">
                            Total Recieved
                        </Form.Label>
                        <InputGroup>
                            <Button variant="outline-secondary" id="button-addon1" onClick={updateTotalReceived}>
                                $
                            </Button>
                            {/* <InputGroup.Button id="basic-addon1">$</InputGroup.Button> */}
                            <Form.Control
                                type="number"
                                name="total_received"
                                value={parseFloat(jobsData.total_received).toFixed(2)}
                                onChange={(e) => handleControlChange(e)}
                                required />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="justify-content-end mt-3">
                    <Col xs={3} className="d-flex justify-content-end">
                        <Button type="submit">Save and Make Reciept</Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}