import React from 'react';
import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, InputGroup, Accordion, Collapse, Card } from 'react-bootstrap';


export default function AuthorizedUsers({ }) {
    const [externalUsers, setExternalUsers] = useState(null);
    const [newUserText, setNewUserText] = useState("");

    useEffect(() => {
        let options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        }
        fetch(`api/ExternalUsers`, options)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return res.json();
            })
            .then((response) => {
                console.log(`okay, users: ${JSON.stringify(response)}`);
                if (response.status == "Success") {
                    setExternalUsers(response.data)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const addNewUser = () => {
        if (newUserText == "") {
            return;
        }
        let options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: {'id':newUserText}
        }
        fetch(`api/addExternalUser?id=${newUserText}`, options)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return res.json();
            })
            .then((response) => {
                console.log(`okay, users: ${JSON.stringify(response)}`);
                if (response.status == "Success") {
                    
                    setExternalUsers(response.data);
                    setNewUserText("");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleUpdateNewUser = (event) => {
        console.log("Updating text to "+event.target.value)
        setNewUserText(event.target.value);
    }

    const handleRemove = (userId) => 
    {
        let options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: {'id':userId}
        }
        fetch(`api/removeExternalUser?id=${userId}`, options)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return res.json();
            })
            .then((response) => {
                console.log(`okay, users: ${JSON.stringify(response)}`);
                if (response.status == "Success") {
                    setExternalUsers(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    

    return (
        <Accordion className="mt-2 p-0" >
            <Accordion.Header className="bg-secondary bg-opacity-25 rounded-top">Authorized Users (Non-SSC)</Accordion.Header>
            <Accordion.Body className='bg-secondary bg-opacity-25 rounded-bottom'>
                <Row>
                    <Col xs={12}>
                        <Form>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={newUserText}
                                    onChange={handleUpdateNewUser}
                                />
                                <InputGroup.Text id="basic-addon1">@uwo.ca</InputGroup.Text>
                                <Button
                                    className="ms-2"
                                    variant="primary"
                                    onClick={addNewUser}>
                                    Add
                                </Button>
                            </InputGroup>
                        </Form>

                    </Col>
                </Row>
                {externalUsers?.map((user, key) => {
                    return (
                            <Row className='d-flex bg-light mt-2' key={user.user_id}>
                                <Col xs="8">{user.username}</Col>
                                <Col className='d-flex justify-content-end p-1'>
                                    <Button size="sm" variant='danger' onClick={() => handleRemove(user?.user_id)}>Remove</Button>
                                </Col>
                            </Row>
                    )
                })}

            </Accordion.Body>
        </Accordion>
    )
}
