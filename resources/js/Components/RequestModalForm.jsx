import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default function RequestModalForm({request})
{
    const [requestData, setRequestData] = useState(null);

    function updateRequest()
    {
        //send the request data in its current form to backend for database update
    }

    function acceptRequest()
    {
        //update any changed data and create job
    }

    var undergradInfo = (
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
            {request.payment_method == 'speedcode' ? undergradInfo : null}
            
        </Form>
    )

}