import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RequestModalForm from './RequestModalForm';
import { useState } from 'react';

export default function RequestModal({requestData, onHide, show}) {
    console.log("modal made");
    // We have the passed Data already in the requestData Prop, so lets display it in a form
    // for editing
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
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>

    );
}
