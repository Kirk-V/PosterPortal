import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Fade from 'react-bootstrap/Fade';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import CourseSelect from './CourseSelect';

export default function RequestModalForm({ request, settings, courseData }) {
    const [formData, setformData] = useState(request);
    const [isSpeedCode, setIsSpeedCode] = useState(false)
    //I think that data should be pulled here, and joined with the course ID + whatever other info is needed
    // This will allow for users to change the course info attached to the request..
    // Alternative...we make a new call for each modal form (this component), or instead just the undergrad section
    // can become its own component.

    function handleOpenFile(){
        console.log("file opening");
    }


    function updateRequest() {
        //send the request data in its current form to backend for database update
    }

    function acceptRequest() {
        //update any changed data and create job
    }

    var GrantHolderInfo = (
        <>
            <Col>
                <Form.Group className="mb-3" controlId="requestFormFirstName">
                    <Form.Label>Grant Holder</Form.Label>
                    <Form.Control type="text" defaultValue={request.first_name} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="requestFormGrantFirstName">
                    <Form.Label>Grant Holder Email</Form.Label>
                    <Form.Control type="text" defaultValue={request.first_name} />
                </Form.Group>
            </Col>
            <Row>
                <Col xs={5}>
                    <Alert className={"mt-3"} variant={formData.speed_code_approved == 0 ? 'danger' : 'success'}>
                        Speedcode has {formData.speed_code_approved == 0 ? 'not' : null} been approved
                    </Alert>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="requestFormGrantFirstName">
                        <Form.Label>SpeedCode</Form.Label>
                        <Form.Control type="text" defaultValue={request.speed_code} />
                    </Form.Group>
                </Col>
            </Row>
        </>
    )

    var undergradInfo = (
        <>
            <Col xs={3}>
                <CourseSelect courseData={courseData} value={formData.course_id}/>
            </Col>
        </>

    )

    var posterInfo = (
        <Row>
            <Col>
                <Form.Label htmlFor="basic-url">Your vanity URL</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">Width</InputGroup.Text>
                    <Form.Control type="text" defaultValue={request.width} />
                    <InputGroup.Text id="basic-addon3">Height</InputGroup.Text>
                    <Form.Control type="text" defaultValue={request.height} />
                </InputGroup>
            </Col>
        </Row>
    )

    const handlePaymentChange = (event) => {
        const value = event.target.value;
        let data = { ...formData }; //Deep copy so that setformData will trigger rerender
        data.payment_method = value;
        setformData(data);
        if (value == 'speedcode') {
            setIsSpeedCode(true);
        }
        console.log(JSON.stringify(formData));
    }

    const handlePositionChange = (event) => {
        const value = event.target.value;
        let data = { ...formData }; //Deep copy so that setformData will trigger rerender
        data.position = value;
        setformData(data);
        console.log(JSON.stringify(formData));
    }

    const handleUnitsChange = (event) => {
        const value = event.target.value;
        let data = { ...formData }; //Deep copy so that setformData will trigger rerender
        data.units = value;
        setformData(data);
        console.log(JSON.stringify(formData));
    }

    //display request data in a form
    return (
        <Form>
            <Row className="mb-3">
                <Col>
                    <Form.Group className="mb-3" controlId="requestFormFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" defaultValue={request.first_name} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="requestFormLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" defaultValue={request.last_name} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="requestFormEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" defaultValue={request.email} />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={3} >
                    <Form.Group className="mb-3" controlId="requestFormFirstName">
                        <Form.Label>Position</Form.Label>
                        <Form.Select defaultValue={request.position} onChange={(e) => handlePositionChange(e)}>
                            <option value="undergraduate">undergraduate</option>
                            <option value="graduate">graduate</option>
                            <option value="faculty">faculty</option>
                            <option value="staff">staff</option>
                        </Form.Select>
                    </Form.Group>

                </Col>
                {formData.position == 'undergraduate' ? undergradInfo : null}
            </Row>

            <Row className="mb-3">
                <Col xs={3}>
                    
                    <Form.Group className="mb-3" controlId="requestFormLastName">
                        <Form.Label>Payment</Form.Label>
                        <Form.Select defaultValue={request.payment_method} onChange={(e) => handlePaymentChange(e)}>
                            <option value="speedcode">Speedcode</option>
                            <option value="cash">Cash</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                {formData.payment_method == 'speedcode' ? GrantHolderInfo : null}

            </Row>
            <Row>
                <Col xs={5}>
                    <Form.Label>File</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            defaultValue={request.payment_method}
                            aria-describedby="basic-addon2"
                        />
                        <Button variant="outline-secondary" id="button-addon2" onClick={handleOpenFile}>
                            open
                        </Button>
                        
                    </InputGroup>
                </Col>
                <Col xs={5}>
                    <Form.Label>Dimensions</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            defaultValue={request.width}
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Text id="basic-addon2">X</InputGroup.Text>
                        <Form.Control
                            defaultValue={request.height}
                            aria-describedby="basic-addon2"
                        />
                    </InputGroup>
                </Col>
                <Col xs={2}>
                    <Form.Group className="mb-3" controlId="requestFormFirstName">
                        <Form.Label>Unit</Form.Label>
                        <Form.Select defaultValue={request.units} onChange={(e) => handleUnitsChange(e)}>
                            <option value="cm">cm</option>
                            <option value="inches">inches</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="requestFormEmail">
                        <Form.Label>Cost Per Poster</Form.Label>
                        <Form.Control type="text" defaultValue={request.email} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="requestFormEmail">
                        <Form.Label>Cost Per Poster</Form.Label>
                        <Form.Control type="number" defaultValue={request.email} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="requestFormEmail">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" defaultValue={request.quantity} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="requestFormEmail">
                        <Form.Label>Discount</Form.Label>
                        <Form.Control type="number" defaultValue={request.quantity} disabled={request.discount_elgible ? true : false}/>
                    </Form.Group>
                </Col>
            </Row>


        </Form>
    )

}