import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

export default function RequestModal({requestData, onHide, show}) {
    console.log("modal made");
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
            <h4>Centered Modal</h4>
            <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
            </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>

    );
}
