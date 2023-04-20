import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import RequestModalForm from './RequestModalForm';
import { useState, useEffect } from 'react';


//This component holds request data, and should call for extra data related to a request when needed
// ie. if the request is undergrad and needs to be combined with course info.
export default function RequestModal({requestData, onHide, show, courseData}) {
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
            // /requests/pending&id={id}
            // fetch(`/requests&id=${requestData.requests.request_id}`)
            fetch(`/requests/pending&id=${requestData.requests.request_id}`)
            .then( (res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return res.json()
            })
            .then((response) => {
                console.log("req data:");
                console.log(`okay, Req data: ${JSON.stringify(response)}`);
                setRequest(response);
            },
            (error) => {
                console.log(error)
            }
            )

        }
        else
        {
            setRequest(null);
        }   
    }, [requestData]);

    function onAccept(){

    }

    // Handles the form being updated.
    function handleFromValueUpdate(event, key){

    }

    function onReject(){
        setRejecting(true);
    }

    function handleReject(){
        console.log("delete it");
    }

    const rejectingConfirm = (
        <>
            {/* <p>sure you want to reject?</p> */}
            <Button variant="danger" onClick={handleReject}>Reject and Delete</Button>
            <Button variant="primary" className={'ms-auto'} onClick={() => setRejecting(false)}>no, Go Back</Button>
        </>
        
    )

    const footerButtons = (
        <>
            <Button variant="primary" onClick={onReject}>Reject</Button>
            <Button variant="primary" onClick={onAccept}>Accept</Button>
            <Button variant="primary" className={'ms-auto'} onClick={onHide}>Close</Button>
        </>
    )

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {request != null ? request.request_id : null} {request != null ? request.first_name : null} {request != null ? request.last_name : null} 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>          
                {request != null ? <RequestModalForm request={request} courseData={courseData}/> : <h1>noData</h1>}
            </Modal.Body>
            <Modal.Footer>

                        {rejecting ? rejectingConfirm : footerButtons}

            </Modal.Footer>
        </Modal>

    );
}
