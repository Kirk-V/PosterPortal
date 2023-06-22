import React from 'react';
import { Form, Button, Row, Col, InputGroup, Accordion, Collapse, Card } from 'react-bootstrap';
import { useState} from 'react';

export default function PosterSettings({allSettinsData, updateSetting}) {
    const [settingsData, setSettingsData] = useState(allSettinsData);
    const [settingsDataIsLoaded, setsettingsDataIsLoaded] = useState(false);


    const handleUpdateCost = (event) => {
        updateSetting('cost', settingsData.cost);
    }



    const handleCostChange = (event) => {
        let newCost = event.target.value;
        console.log(newCost);
        settingsData["cost"] = newCost;
        console.log(`all settings cst set to : ${settingsData["cost"]}`)
    }

    const toggleExternalRequests = (event) => {
        settingsData.external = !settingsData.external;
        let newSettings = {...settingsData};
        setSettingsData(newSettings);
        updateSetting('external', settingsData.external == true? 1:0);
        console.log(`accept external set to : ${settingsData.external}`)
    }


    let CostSection = (
        <Form noValidate>
            <Row>
                <Col>
                    <Form.Label className="fw-bold">Poster Cost (Per foot Squared)</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control
                            type="number"
                            defaultValue={parseFloat(settingsData.cost).toFixed(2)}
                            onChange={handleCostChange} />
                        <Button onClick={handleUpdateCost}>Update</Button>
                    </InputGroup>
                </Col>
            </Row>
        </Form>
    )

    let AcceptExternalSection = (
        <Row className="mt-3">
            <Col>
                <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label="Accept Non SSC Requests"
                    checked={settingsData.external == 0 ? false: true}
                    onChange={toggleExternalRequests}
                />
            </Col>
        </Row>
    )

    return (
        <Card>
            <Card.Header>
                <Card.Title>Poster Settings</Card.Title>
            </Card.Header>
            <Card.Body>
                {CostSection}
                {AcceptExternalSection}
            </Card.Body>

        </Card>
    )
}
