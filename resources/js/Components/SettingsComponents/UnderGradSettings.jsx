import React from 'react'
import { Card, Button, Form, Row, Col, Collapse, InputGroup, Accordion } from 'react-bootstrap';
import { useState } from 'react';


function UnderGradSettingsCard({ settingsData, handleSettingUpdate }) {
    const [showDeposit, setShowDeposit] = useState(false);
    const [showWithdrawal, setShowWithdrawal] = useState(false);




    const handleToggleShowDeposit = () => {
        setShowDeposit(!showDeposit);
    }

    const handleToggleShowWithdrawal = () => {
        setShowWithdrawal(!showWithdrawal);
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

    const getDates = (howMany) => {

        let today = new Date().getFullYear();
        let dates=[];
        for(year in howMany)
        {
            dates.push(`${today}/${today+1}`);
            today += 1;
        }
        
        return dates
    }

    let CourseAccordion = (
        <Accordion>
            <Accordion.Header>Undergrad Courses</Accordion.Header>
            <Accordion.Body>
                <Row>
                    <Col xs={12}>
                        <InputGroup>
                            <Form.Label>
                                Add Course
                            </Form.Label>
                            <Form.Select>
                                {getDates(5).map((years) => (
                                    <option>{years}</option>)
                                )}
                            </Form.Select>
                        </InputGroup>
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