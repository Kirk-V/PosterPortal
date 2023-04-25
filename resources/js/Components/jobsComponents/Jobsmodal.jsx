import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
// import RequestModalForm from './RequestModalForm';
import { useState, useEffect } from 'react';


//This component holds request data, and should call for extra data related to a request when needed
// ie. if the request is undergrad and needs to be combined with course info.
export default function RequestModal({requestData, onHide, show, courseData}) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h1>head</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1>body</h1>
            </Modal.Body>
            <Modal.Footer>

                <Button variant="primary" >Reject</Button>
                <Button variant="primary" >Accept</Button>
                <Button variant="primary" className={'ms-auto'}>Close</Button>

            </Modal.Footer>
        </Modal>

    );
}