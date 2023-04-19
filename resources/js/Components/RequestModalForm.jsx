import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default function RequestModalForm({request})
{
    const [formData, setformData] = useState(null);

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
                <Form.Group className="mb-3" controlId="requestFormFirstName">
                    <Form.Label>Grant Holder Email</Form.Label>
                    <Form.Control type="text" defaultValue={request.first_name}/>
                </Form.Group>
            </Col>
        </Row>
    )

    var undergradInfo = (
        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="requestFormFirstName">
                    <Form.Label>Course Number</Form.Label>
                    <Form.Control type="text" defaultValue={request.courses.number}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="requestFormFirstName">
                    <Form.Label>Course Department</Form.Label>
                    <Form.Control type="text" defaultValue={request.courses.department}/>
                </Form.Group>
            </Col>
        </Row>
    )


    //display request data in a form
    return (

        <Form>
            <Row>
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
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="requestFormFirstName">
                        <Form.Label>Position</Form.Label>
                        <Form.Control type="text" defaultValue={request.first_name}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="requestFormLastName">
                        <Form.Label>Payment</Form.Label>
                        <Form.Control type="text" defaultValue={request.last_name}/>
                    </Form.Group>
                </Col>                
            </Row>
            {request.payment_method == 'speedcode' ? GrantHolderInfo : null}
            {request.position == 'undergraduate' ? undergradInfo: null}
            
        </Form>
    )

}