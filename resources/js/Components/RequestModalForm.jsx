import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Fade from 'react-bootstrap/Fade';

export default function RequestModalForm({request})
{
    const [formData, setformData] = useState(request);
    const [isSpeedCode, setIsSpeedCode] = useState(false)
    //I think that data should be pulled here, and joined with the course ID + whatever other info is needed
    // This will allow for users to change the course info attached to the request..
    // Alternative...we make a new call for each modal form (this component), or instead just the undergrad section
    // can become its own component.


    function updateRequest()
    {
        //send the request data in its current form to backend for database update
    }

    function acceptRequest()
    {
        //update any changed data and create job
    }

    var GrantHolderInfo = (
        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="requestFormFirstName">
                    <Form.Label>Grant Holder</Form.Label>
                    <Form.Control type="text" defaultValue={request.first_name}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="requestFormGrantFirstName">
                    <Form.Label>Grant Holder Email</Form.Label>
                    <Form.Control type="text" defaultValue={request.first_name}/>
                </Form.Group>
            </Col>
        </Row>
    )

    var undergradInfo = (
        <>
        
        <Col xs={3}>
            <Form.Group className="mb-3" controlId="requestFormFirstName">
                <Form.Label>Course Number</Form.Label>
                <Form.Control type="text" defaultValue={request.number}/>
            </Form.Group>
        </Col>
        <Col xs={3}>
            <Form.Group className="mb-3" controlId="requestFormFirstName">
                <Form.Label>Course Department</Form.Label>
                <Form.Control type="text" defaultValue={request.department}/>
            </Form.Group>
        </Col>
        </>

    )

    var posterInfo = (
        <Row>
            <Col>
            <Form.Label htmlFor="basic-url">Your vanity URL</Form.Label>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon3">Width</InputGroup.Text>
                <Form.Control type="text" defaultValue={request.width}/>
                <InputGroup.Text id="basic-addon3">Height</InputGroup.Text>
                <Form.Control type="text" defaultValue={request.height}/>
            </InputGroup>
            </Col>
        </Row>
    )

    const handlePaymentChange = (event) =>
    {
        const value = event.target.value;
        let data = {...formData}; //Deep copy so that setformData will trigger rerender
        data.payment_method = value;
        setformData(data);
        if(value == 'speedcode')
        {
            setIsSpeedCode(true);
        }
        console.log(JSON.stringify(formData));
    }

    const handlePositionChange = (event) =>
    {
        const value = event.target.value;
        let data = {...formData}; //Deep copy so that setformData will trigger rerender
        data.position = value;
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
                        <Form.Control type="text" defaultValue={request.first_name}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="requestFormLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" defaultValue={request.last_name}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="requestFormEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text"  defaultValue={request.email}/>
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
                {formData.position == 'undergraduate' ? undergradInfo: null} 
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
                <Col>{formData.payment_method == 'speedcode' ? GrantHolderInfo : null}   </Col>         
                    
            </Row>
            
             
        </Form>
    )

}