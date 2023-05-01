import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useState, useEffect } from 'react';
function ErrorToast({errorMessage, errorType, show, handleClose }) {
    console.log(`Error Toast  ${errorMessage}, ${show}, ${show}`);

    return (
        <ToastContainer
          className="p-3"
          position={'bottom-end'}
          style={{ zIndex: 1056}}
        >
        <Toast show={show} bg={'danger'} onClose={handleClose} delay={6000} autohide>
        <Toast.Header >
            <strong className="me-auto ">Error</strong>
            <small>{errorType}</small>
        </Toast.Header>
        <Toast.Body>{errorMessage}</Toast.Body>
        </Toast></ToastContainer>
    );
}

export default ErrorToast;