// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Container from "react-bootstrap/Container";
// import RequestModalForm from './RequestModalForm';
import { useState, useEffect } from "react";
import { Form, Button, Modal, Row, Col, Container } from "react-bootstrap";
import JobsSendPickUpButton from "./JobsSendPickUpButton";
import PDF from "./PDFDocument";
import JobForm from "./EditJobForm";

//This component holds request data, and should call for extra data related to a request when needed
// ie. if the request is undergrad and needs to be combined with course info.
export default function JobsModal({ jobsData, onHide, show }) {
    console.log(`OPened module with data: ${JSON.stringify(jobsData)}`);
    return (
        <>
            {jobsData == null ? (
                <UnLoadedModal onHide={onHide} show={show} />
            ) : (
                <LoadedModal jobsData={jobsData} onHide={onHide} show={show} />
            )}
        </>
    );
}

function UnLoadedModal({ onHide, show }) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1>body</h1>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    className={"ms-auto"}
                    onClick={onHide}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function LoadedModal({ jobsData, onHide, show }) {
    const [jobState, setJobState] = useState(jobsData.state);
    const [showingReceipt, setShowingReceipt] = useState(false);
    const [showingPrepareReceipt, setShowingPrepareReceipt] = useState(false);

    let updateState = (newState) => {
        //api call to update state
        console.log(`calling update on job: ${jobsData.job_id} with valude:  ${newState}`);
        let options = {
            method: 'PUT',
            body: JSON.stringify({'job_id': jobsData.job_id, 'job_state': newState}),
            headers: {
                // the content type header value is usually auto-set
                // depending on the request body
                "Content-Type": 'application/json',
                'Accept': 'application/json'
              },
        }

        fetch(`api/jobs/updateState`, options)
        .then( (res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return res.json()
        })
        .then((response) => {
            console.log("req data:");
            console.log(`okay, Update state reply: ${JSON.stringify(response)}`);
            // setRequest(response);
            if(response.success)
            {
                console.log("success, updating UI state");
                setJobState(newState);
                // jobsData.state = newState;
            }

        },
        (error) => {
            console.log(error)
        }
        )

        //IF the state is updated it must persist to the DB
        console.log("state being updated to " + newState);
    };

    const InQueueState = (
        <>
            <Col xs={2}>
                <Button variant="info" onClick={() => updateState('printed')}>Print Poster</Button>
            </Col>
        </>
    );

    const PrintedState = (
        <>
            <Col xs={2}>
                <Button variant="info">Send Pick-Up Notice</Button>
            </Col>
        </>
    );

    function handleShowRecieptChange()
    {
        setShowingReceipt(!showingReceipt);
    }

    function handleShowPrepareReceiptChange() {
        setShowingPrepareReceipt(!showingPrepareReceipt);
    }

    function closeReceipt(){
        setShowingReceipt(false);
    }

    let ReceiptRow = (
        <PDF show={showingReceipt} jobData={jobsData} handleCloseReceipt={closeReceipt}/>
    )


    let PrepareReceipt = (
        <JobForm jobData={jobsData}/>
    )


    //Modal has data
    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h2>Poster {jobsData.poster_id}</h2>
                        <h4>{jobsData.first_name} {jobsData.last_name}</h4>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <>
                    <Form>
                        <Row>
                            <Col xs={3}>
                                <h5>Status</h5>

                            </Col>
                            <Col xs={6}>
                                <p>{jobsData.state}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3}>

                                <h5>Email</h5>

                            </Col>
                            <Col xs={6}>

                                <p>{jobsData.email}</p>

                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3}>

                                <h5>Payment Type</h5>
                            </Col>
                            <Col xs={6}>

                                <p>{jobsData.payment_method}</p>
                            </Col>
                        </Row>
                    </Form>
                    {showingPrepareReceipt? PrepareReceipt: showingReceipt ? ReceiptRow : null}        
                   </>
                </Modal.Body>
                <Modal.Footer>
                    {jobState == "in_queue" ? InQueueState: null}
                    <Button variant="info" onClick={handleShowPrepareReceiptChange}>Prepare Receipt</Button>
                    <Button variant="info" onClick={handleShowRecieptChange}>Make Receipt</Button>
                    <JobsSendPickUpButton jobID={jobsData.job_id} posterState={jobState} updateStateHandler={updateState}/>
                    <Button variant="primary">Accept</Button>
                    <Button
                        variant="primary"
                        className={"ms-auto"}
                        onClick={onHide}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>           
        </>
    );
}
