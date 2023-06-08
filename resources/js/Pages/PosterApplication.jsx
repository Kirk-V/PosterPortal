// import RequestTableRow from '@/Components/RequestTableRow';
import { router } from '@inertiajs/react'
import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import RequisitionerDetails from '@/Components/ApplicationComponents/RequisitionerDetails';
import PaymentMethod from '@/Components/ApplicationComponents/PaymentMethod';
import PosterDetails from '@/Components/ApplicationComponents/PosterDetails';
import PosterFile from '@/Components/ApplicationComponents/PosterFile';
import Button from 'react-bootstrap/Button';
function PosterApplication({ auth, data }) {
    const [validated, setValidated] = useState(false);
    const requests = data;

    const handleSubmit = (event) => {
        console.log("Form Submitted");
        
        event.preventDefault();
        
        const form = event.currentTarget;
        const data = new FormData(form);
        console.log(data);
        if (form.checkValidity() === false) {
            console.log(`invalid form data: ${data['first_name']}`);
        }
        else{
            
            console.log("Valid data entered, sending for backend validation"+JSON.stringify(data));
        }
        setValidated(true);
        event.stopPropagation();
    }

    const HeaderSection = (
        <>
        <Row>
            <p>For general poster printing information please visit our <a href="https://ssts.uwo.ca/services/postergraphics/index.html" target="_blank">Poster Printing and Graphics page</a></p>
            <p>If you have any questions or concerns please review our <a href="https://ssts.uwo.ca/services/postergraphics/index.html" target="_blank">FAQs page</a></p>
            <p><strong>This printing service is for Social Science Only</strong>. If you wish to cancel an application after submitting please notify SSTS by email <a href="mailto:ssts-posters@uwo.ca" >ssts-posters@uwo.ca</a></p>
        </Row>
        </>
    )
    return (
        <>
        {HeaderSection}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <RequisitionerDetails/>    
            <PaymentMethod/>  
            <PosterDetails/>  
            <PosterFile/>
            <Button type="submit">Submit</Button>
        </Form>
        </>
    );
}
export default PosterApplication