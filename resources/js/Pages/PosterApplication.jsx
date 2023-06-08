// import RequestTableRow from '@/Components/RequestTableRow';
import { router } from '@inertiajs/react'
import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import RequisitionerDetails from '@/Components/ApplicationComponents/RequisitionerDetails';
import PaymentMethod from '@/Components/ApplicationComponents/PaymentMethod';
function PosterApplication({ auth, data }) {
    const [validated, setValidated] = useState(false);
    const requests = data;

    const handleSubmit = () => {
        console.log("Form Submitted");
        event.preventDefault();
            event.stopPropagation();
        if (form.checkValidity() === false) {
            
          }
        setValidated(true);
    }
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <RequisitionerDetails/>    
            <PaymentMethod/>    
        </Form>
    );
}
export default PosterApplication