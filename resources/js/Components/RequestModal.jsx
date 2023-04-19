import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import RequestModalForm from './RequestModalForm';
import { useState, useEffect } from 'react';


//This component holds request data, and should call for extra data related to a request when needed
// ie. if the request is undergrad and needs to be combined with course info.
export default function RequestModal({requestData, onHide, show}) {
    const [rejecting, setRejecting] = useState(false);
    const [request, setRequest] = useState(null);
    console.log("modal made");
    // We have the passed Data already in the requestData Prop, so lets display it in a form
    // for editing

    //When rendered, we need to call for the updated version of the data, joined with the course 
    // if undergrad.
    useEffect(() => {
        if(requestData != null)
        {
            fetch(`/requests&id=${requestData.requests.request_id}`)
            .then( (res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return res.json()
            })
            .then((response) => {
                
                console.log(`okay, Req data: ${JSON.stringify(response)}`);
                setRequest(response);
            },
            (error) => {
                setError(error);
            }
            )

            }     
    }, [requestData]);

    function onAccept(){

    }

    // Handles the form being updated. Sets the poster state so that
    // it remains consistent with the form, and ready to be sent to back end
    // if update is requested.
    function onUpdate(){

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
                    {requestData != null ? requestData.requests.request_id : null} {requestData != null ? requestData.requests.first_name : null} {requestData != null ? requestData.requests.last_name : null} 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                {request != null ? <RequestModalForm request={request}/> : <h1>noData</h1>}
            
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
