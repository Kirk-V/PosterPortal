import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
// import RequestModalForm from './RequestModalForm';
import { useState, useEffect } from 'react';


//This component holds request data, and should call for extra data related to a request when needed
// ie. if the request is undergrad and needs to be combined with course info.
export default function JobsModal({jobsData, onHide, show}) {
    console.log(`OPened module with data: ${JSON.stringify(jobsData)}`);
    return (
        <>
            {jobsData == null ? <UnLoadedModal onHide={onHide} show={show}/> : <LoadedModal jobsData={jobsData} onHide={onHide} show={show}/>}
        </>
    );
}


function UnLoadedModal({onHide, show})
{
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1>body</h1>
            </Modal.Body>
            <Modal.Footer>

                <Button variant="primary" className={'ms-auto'} onClick={onHide}>Close</Button>

            </Modal.Footer>
        </Modal>
    )
}


function LoadedModal({jobsData, onHide, show})
{
    return (
        <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h2>Poster {jobsData.poster_id}</h2>
                        <h4>{jobsData.first_name} {jobsData.last_name}</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>body</h1>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="primary" >Reject</Button>
                    <Button variant="primary" >Accept</Button>
                    <Button variant="primary" className={'ms-auto'} onClick={onHide}>Close</Button>

                </Modal.Footer>
            </Modal>
    )

}
