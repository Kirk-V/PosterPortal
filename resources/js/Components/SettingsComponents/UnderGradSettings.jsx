import React from 'react'
import { Form, Button, Row, Col, InputGroup, Accordion, Collapse, Card } from 'react-bootstrap';
import { useState} from 'react';
import CourseList from './CourseList';

function UnderGradSettingsCard({ settingsData, updateSetting }) {
    const [showDeposit, setShowDeposit] = useState(false);
    const [showWithdrawal, setShowWithdrawal] = useState(false);
    const [courseData, setCourseData] = useState(null);
    const [addCourseFormData, setAddCourseFormData] = useState(null);
    const [addCourseValidated, setAddCourseValidated] = useState(false);
    const [validated, setValidated] = useState(false);
    const [allSettings, setAllSettings] = useState(settingsData);
    //Get Course Data On Load;



    const updateAddCourseData = (e) => {
        setAddCourseFormData({
            ...addCourseFormData,
            [e.target.name]: e.target.value
        });

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
        setValidated(true);
        console.log("course form submitted");
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            console.log("not valid");
        }
        else
        {
            //valid form send course infor to back end:
            console.log(`form Data is: ${JSON.stringify(addCourseFormData)}`);
        }

        //

    }

    const handleUpdateCost = (event) => {
        updateSetting('cost', allSettings.cost);
    }



    const handleCostChange = (event) => {
        let newCost = event.target.value;
        console.log(newCost);
        allSettings["cost"] = newCost;
        console.log(`all settings cst set to : ${allSettings["cost"]}`)
    }

    const handleUpdateDiscount = (event) => {
        updateSetting('discount', allSettings.discount);
    }

    const handleDiscountChange = (event) => {        
        let newDiscount = event.target.value;
        console.log(newDiscount);
        allSettings["discount"] = newDiscount;
        console.log(`all settings discount set to : ${allSettings["discount"]}`)
       
    }

    const toggleUndergradRequests = (event) => {
        allSettings.undergrad = !allSettings.undergrad;
        let newSettings = {...allSettings};
        setAllSettings(newSettings);
        updateSetting('undergrad', allSettings.undergrad == true? 1:0);
        console.log(`accept ugrad set to : ${allSettings.undergrad}`)
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
        <Form noValidate validated={validated} onSubmit={handleAddCourse}>
            <Row>
                <Col>
                    <Form.Label className="fw-bold">Add Course</Form.Label>
                    <InputGroup>
                        <Form.Select
                            required
                            name="year"
                            defaultValue={addCourseFormData?.year ?? ""}
                            onChange={(e) => updateAddCourseData(e)}>
                            {getDates(5).map((years) => (
                                <option key={years} value={years}>{years}</option>)
                            )}
                        </Form.Select>
                        <Form.Control
                            onChange={(e) => updateAddCourseData(e)}
                            placeholder='Number'
                            type="text"
                            name="number"
                            required />
                        <Form.Select
                            onChange={(e) => updateAddCourseData(e)}
                            name="department"
                            defaultValue={""}
                            required={true}><option disabled="disabled" value="">Select One</option>
                            {Depts.map((dept) => (
                                <option value={dept} key={dept}>{dept}</option>)
                            )}
                        </Form.Select>
                        <Form.Control
                            onChange={(e) => updateAddCourseData(e)}
                            type="text"
                            name="instructor"
                            required />
                        <Button type="submit"> +</Button>
                    </InputGroup>
                </Col>
            </Row>
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
                <Row className="mt-2">
                    <Col>All Classes
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col>
                        <CourseList/>
                    </Col>
                </Row>
            </Accordion.Body>
        </Accordion>
    )

    let UndergradDiscountSection = (
        <Form noValidate validated={validated}>
            <Row>
                <Col>
                    <Form.Label className="fw-bold">Undergrad Discount (Per Poster Amount)</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control
                            type="number"
                            defaultValue={parseFloat(settingsData.discount).toFixed(2)}
                            onChange={handleDiscountChange} />
                        <Button onClick={handleUpdateDiscount}>Update</Button>
                    </InputGroup>
                </Col>
            </Row>
        </Form>
    )

    let UndergradToggleSection = (
        <Row className="mt-3">
            <Col>
            <Form.Check 
                type="switch"
                id="custom-switch"
                label="Accept Undergrad Requestss"
                checked={allSettings.undergrad == 0 ? false: true}
                onChange={toggleUndergradRequests}
            />
            </Col>
        </Row>
    )


    return (
        <>
            <Card >
                <Card.Header>
                    <Card.Title>Undergrad Settings</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs={6} className="fw-bold">
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
                    <Row>
                        {UndergradDiscountSection}
                    </Row>
                    <Row>
                        {UndergradToggleSection}
                    </Row>


                </Card.Body>
            </Card>

        </>
    );
}

export default UnderGradSettingsCard;
