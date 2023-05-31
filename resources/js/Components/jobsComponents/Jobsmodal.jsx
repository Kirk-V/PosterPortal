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
import JobForm from "./ReceiptForm";

//This component holds request data, and should call for extra data related to a request when needed
// ie. if the request is undergrad and needs to be combined with course info.
export default function JobsModal({ modalData, onHide, show }) {
    console.log(`OPened module with data: ${JSON.stringify(modalData)}`);
    return (
        <>
            {modalData == null ? (
                <UnLoadedModal onHide={onHide} show={show} />
            ) : (
                <LoadedModal modalData={modalData} onHide={onHide} show={show} />
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

function LoadedModal({ modalData, onHide, show }) {
    const [jobState, setJobState] = useState(modalData.job_state);
    const [showingReceipt, setShowingReceipt] = useState(false);
    const [showingMakeTransaction, setshowingMakeTransaction] = useState(false);
    const [jobsData, setJobsData] = useState(modalData)

    let updateState = (newState) => {
        //api call to update state
        console.log(`calling update on job: ${jobsData.job_id} with value:  ${newState}`);
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
                jobsData.job_state = newState;
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

    function handleDataUpdate(newData)
    {
        setJobsData(newData);
        console.log("updated data");
    }

    function handleShowRecieptChange()
    {
        setshowingMakeTransaction(false);
        setShowingReceipt(!showingReceipt);
    }

    function handleShowingMakeTransactionChange() {
        setshowingMakeTransaction(!showingMakeTransaction);
    }

    function closeReceipt(){
        setShowingReceipt(false);
    }

    function handleSendPickupNotice(){

    }

    const InQueueState = (
        <Button variant="info" onClick={() => updateState('printed')}>Print Poster</Button>

    );

    const InPrintedState = (
        <>
            <Button variant="info" onClick={handleShowingMakeTransactionChange}>Create Transaction</Button>
            <Button variant="info" onClick={() =>updateState('pending_pickup')}>Send Pick-up Notice</Button>
        </>
    )

    const InPendingPickUpState = (
        <>
        <Button variant="info" >Picked Up</Button>
        <Button variant="info" onClick={handleShowingMakeTransactionChange}>Create Transaction</Button>
        <Button variant="info" onClick={handleSendPickupNotice}>Resend Pick-up Notice</Button>
        </>
    )

    const InOnHoldState = (
        <Button variant="info" >Ready</Button>
    )

    const InCancelledState = (
        <Button variant="info" >Revive</Button>
    )



    const PrintedState = (
        <>
            <Col xs={2}>
                <Button variant="info">Send Pick-Up Notice</Button>
            </Col>
        </>
    );



    let ReceiptRow = (
        <PDF show={showingReceipt} jobData={jobsData} handleCloseReceipt={closeReceipt}/>
    )


    let PrepareReceipt = (
        <JobForm jobsData={jobsData} dataUpdateHandler={handleDataUpdate} handleShowReceipt={handleShowRecieptChange}/>
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
                                <p>{jobsData.job_state}</p>
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
                    {showingMakeTransaction? PrepareReceipt: showingReceipt ? ReceiptRow : null}        
                   </>
                </Modal.Body>
                <Modal.Footer>
                    {jobState == "in_queue" ? InQueueState: null}
                    {jobState == "printed" ? InPrintedState: null}
                    {jobState == "pending_pickup"? InPendingPickUpState: null}
                    {jobState == "cancelled"? InCancelledState: null}
                    {jobState == "on_hold"? InOnHoldState: null}
                    {/* <Button variant="info" onClick={handleShowRecieptChange}>Make Receipt</Button> */}
                    
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
