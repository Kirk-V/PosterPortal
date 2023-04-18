import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import RequestModalForm from './RequestModalForm';
import { useState } from 'react';

export default function RequestModal({requestData, onHide, show}) {
    const [rejecting, setRejecting] = useState(false);
    console.log("modal made");
    // We have the passed Data already in the requestData Prop, so lets display it in a form
    // for editing

    function onAccept(){

    }

    function onReject(){
        setRejecting(true);
    }

    function handleReject(){
        console.log("delete it");
    }

    const rejectingConfirm = (
        <Col>
            <p>sure you want to reject?</p>
            <Button onClick={handleReject}>yes</Button>
            <Button onClick={() => setRejecting(false)}>back</Button>
        </Col>
        
    )

    const footerButtons = (
        <Col>
            <Button onClick={onReject}>Reject</Button>
            <Button onClick={onAccept}>Accept</Button>
            <Button onClick={onHide}>Close</Button>
        </Col>
    )

    return (
        <Modal
            show={show}

            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {requestData != null ? requestData.request_id : null} {requestData != null ? requestData.first_name : null} {requestData != null ? requestData.last_name : null} 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                {requestData != null ? <RequestModalForm request={requestData}/> : <h1>noData</h1>}
            
            </Modal.Body>
            <Modal.Footer>

                <Container>

                
                <Row>
                    {rejecting ? rejectingConfirm : footerButtons}
                </Row>   

                </Container>
                
            </Modal.Footer>
        </Modal>

    );
}
