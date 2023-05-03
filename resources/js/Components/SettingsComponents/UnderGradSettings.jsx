import React from 'react'
import { Card, Button, Form, Row, Col, Collapse, InputGroup, Accordion } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';


function UnderGradSettingsCard({ settingsData, handleSettingUpdate }) {
    const [showDeposit, setShowDeposit] = useState(false);
    const [showWithdrawal, setShowWithdrawal] = useState(false);
    const [courseData, setCourseData] = useState(null);
    const [addCourseFormData, setAddCourseFormData] = useState(null);
    const [addCourseValidated, setAddCourseValidated] = useState(false);
    const [validated, setValidated] = useState(false);
    //Get Course Data On Load;
    useEffect(() => {
        let options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        }
        fetch(`api/courses/all`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return res.json();
            })
            .then((response) => {
                console.log("req data:");
                console.log(`okay, Scourse Data is: ${JSON.stringify(response)}`);
                if (response.status == "success") {
                    setCourseData(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const updateAddCourseData = (e) => {
        setAddCourseFormData({
            ...addCourseFormData,
            [e.target.name]: e.target.value
        })

    }

    const handleToggleShowDeposit = () => {
        setShowDeposit(!showDeposit);
    }

    const handleToggleShowWithdrawal = () => {
        setShowWithdrawal(!showWithdrawal);
    }

    const getDates = (howMany) => {

        let today = new Date().getFullYear();
        console.log(today);
        let dates = [];
        for (let i = 0; i < howMany; i++) {
            dates.push(`${today}/${today + 1}`);
            today += 1;
        }
        return dates
    }

    const handleAddCourse = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if(form.checkValidity() === false) {
            console.log("not valid");
            setValidated(true);
            setAddCourseValidated(true);
        }
        
        console.log(`form Data is: ${JSON.stringify(addCourseFormData)}`);
        
        // if (form.checkValidity() === false) {
        //     console.log("not valid");
        //     setValidated(true);
        // }
    }

    let WithdrawalSection = (
        <><Collapse in={showWithdrawal} className="mt-3">
            <InputGroup className="mt-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                    type="number" />
                <Button>Withdrawal</Button>
            </InputGroup>
        </Collapse>
        </>
    )

    let DepositSection = (
        <>
            <Collapse in={showDeposit} className="mt-3">
                <InputGroup className="mt-3">
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                        type="number" />
                    <Button>Deposit</Button>
                </InputGroup>
            </Collapse>
        </>
    )



    const Depts = ["SSTS", "Ths"];

    let addCourseForm = (
        <Form noValidate validated={validated} onSubmit={(e) => updateAddCourseData(e)} >
            <Form.Label>
                Add Course
            </Form.Label>
            <InputGroup>
                <Form.Select name="year" defaultValue={addCourseFormData?.year ?? ""}
                            aria-label="Disabled input example"
                            required>
                    onChange={(e) => updateAddCourseData(e)} 
                    {getDates(5).map((years) => (
                        <option>{years}</option>)
                    )}
                </Form.Select>
                <Form.Control onChange={(e) => updateAddCourseData(e)} placeholder='Number' type="text" name="number" required/>
                <Form.Select onChange={(e) => updateAddCourseData(e)}  name="department" required> 
                    {Depts.map((dept) => (
                        <option>{dept}</option>)
                    )}
                </Form.Select>
                <Form.Control onChange={(e) => updateAddCourseData(e)}  placeholder='Instructor' type="text" name="instructor" required/>
                <Button type="submit" onClick={(e) => handleAddCourse(e)}> +</Button>
            </InputGroup>
        </Form>

    )

    let CourseAccordion = (
        <Accordion className="mt-2 p-0" >
            <Accordion.Header className="bg-secondary bg-opacity-25">Undergrad Courses</Accordion.Header>
            <Accordion.Body >
                <Row>
                    <Col xs={12}>

                    </Col>
                </Row>
                <Row>
                    <Col>
                    {addCourseForm}
                    </Col>
                </Row>
            </Accordion.Body>
        </Accordion>
    )



    return (
        <>
            <Card >
                <Card.Header>
                    <Card.Title>Undergrad Settings</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs={6}>
                            Remaining SDF: { }
                        </Col>
                        <Col xs={3}>
                            <Button onClick={handleToggleShowDeposit}>Deposit</Button>
                        </Col>
                        <Col xs={3}>
                            <Button onClick={handleToggleShowWithdrawal}>Withdraw</Button>
                        </Col>
                    </Row>
                    <Row>
                        {WithdrawalSection}
                    </Row>
                    <Row>
                        {DepositSection}
                    </Row>
                    <Row>
                        {CourseAccordion}
                    </Row>

                </Card.Body>
            </Card>

        </>
    );
}

export default UnderGradSettingsCard;