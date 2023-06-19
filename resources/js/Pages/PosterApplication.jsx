// import RequestTableRow from '@/Components/RequestTableRow';
import { router } from '@inertiajs/react'
import { React, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import RequisitionerDetails from '@/Components/ApplicationComponents/RequisitionerDetails';
import PaymentMethod from '@/Components/ApplicationComponents/PaymentMethod';
import PosterDetails from '@/Components/ApplicationComponents/PosterDetails';
import PosterFile from '@/Components/ApplicationComponents/PosterFile';
import Button from 'react-bootstrap/Button';

//Validation:
// After submit, store data in state, set validated state = true.
// this gets passsed to each component and
//  validate: tells the componenet whether a validation attempt has been made
//  fieldValidation: tells the components which fields have passed/failed serverside validation
function PosterApplication({ auth, data, departments }) {
    const [validated, setValidated] = useState(false);
    const [fieldValidation, setFieldValidation] = useState(null);
    const [fieldData, setFieldData] = useState(null);
    const [clientValidated, setClientValidated] = useState(false)
    const [serverValidated, setServerValidated] = useState(false);
    const [formSettings, setFormSettings] = useState(null);
    const requests = data;

    //Get the settings data with a call to API
    useEffect(() => {
        let options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        }
        fetch(`api/settings/findFormSettings`, options)
        .then( (res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return res.json();
        })
        .then((response) => {
            console.log("req data:");
            console.log(`okay, Setting Data is: ${JSON.stringify(response)}`);
            if(response.status == "Success")
            {
                console.log("settings: "+ JSON.stringify(response.data));
                setFormSettings(response.data);
            }
        })
        .catch((error) => {
            console.log(error);
        });    
    }, []);


    const handleFieldUpdate = (event) => {
        //copy fieldData
        console.log("update field event");
        let newData = {...fieldData};
        var name = event.target.name;
        var value = event.target.value;
        console.log(`updating ${name} to ${value}`);
        newData[name] = value;
        setFieldData(newData);
    }

    const handleSubmit = (event) => {

        console.log("Form Submitted");
        //Get the form data into the json fieldValidation state var
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        console.log(data);
        if (form.checkValidity() === false) {
            //Clientside validation failed. We show the feedback on the forms by setting client validated to true
            // console.log(`invalid form data: ${data['first_name']}`);
            setClientValidated(true);
        }
        else{
            //Validated by client browser, send to api for further evaluation.
            //Here we do not apply client validation, so we set client validated to false
            setClientValidated(false);
            console.log("Valid data entered, sending for backend validation"+JSON.stringify(data));
            //Call validation api
            submitRequest();
            //set the validation object which should update the front end fields
            // setFieldValidation({'first_name': false, 'last_name': true});
            setServerValidated(true)
        }

        event.stopPropagation();
    }

    //Send data to API for validation and to make new poster request.

    const submitRequest = () => {
        //Extra step here for the undergrad vs other position. Since it's a checkbox
        // it may not have changed and may not have a value. Back end expects a position value
        // so default it to facstaffgrad
        console.log(JSON.stringify(fieldData));
        if(!('apply_for_discount' in fieldData))
        {
            fieldData['apply_for_discount'] = 0;
        }
        let options = {
            method: 'POST',
            body: JSON.stringify(fieldData),
            headers: {
                // the content type header value is usually auto-set
                // depending on the request body
                "Content-Type": 'application/json',
                'Accept': 'application/json'
              },
            }
        fetch('api/application/NewApplication', options)
            .then(response => response.json())
            .then(response => {
                console.log(JSON.stringify(response));
                setFieldValidation(response.data);
            });
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
        <Form noValidate validated={clientValidated} onSubmit={handleSubmit}>
            <RequisitionerDetails formData={fieldData} serverValidationAttempted={serverValidated} validationFields={fieldValidation} handleControlUpdate={handleFieldUpdate} departmentList={departments} formSettings={formSettings}/>
            <PaymentMethod  formData={fieldData} serverValidationAttempted={serverValidated} validationFields={fieldValidation} handleControlUpdate={handleFieldUpdate} departmentList={departments} formSettings={formSettings}/>
            <PosterDetails/>
            <PosterFile/>
            <Button type="submit">Submit</Button>
        </Form>
        </>
    );
}
export default PosterApplication
