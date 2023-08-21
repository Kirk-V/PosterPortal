import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { EnvelopePaper } from 'react-bootstrap-icons';
import RequestModalForm from './RequestModalForm';
import { useState, useEffect } from 'react';
import QuickEmail from './QuickEmail';


//This component holds request data, and should call for extra data related to a request when needed
// ie. if the request is undergrad and needs to be combined with course info.
export default function RequestModal({requestData, onHide, show, courseData, settings, showErrorHandle, departments}) {
    const [rejecting, setRejecting] = useState(false);
    const [request, setRequest] = useState(null);
    const [formData, setFormData] = useState(null); // originally comes from request.
    const [formIsValid, setFormIsValid] = useState(false);
    

    // We have the passed Data already in the requestData Prop, so lets display it in a form
    // for editing

    //When rendered, we need to call for the updated version of the data, joined with the course
    // This should only occur on modal open. Subsequent changes to the form will be passed back to the form component
    useEffect(() => {
        if(requestData != null)
        {
            // /requests/pending&id={id}
            // fetch(`/requests&id=${requestData.requests.request_id}`)
            fetch(`/requests/pending&id=${requestData.requests.request_id}`)
            .then( (res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return res.json();
            })
            .then((response) => {
                console.log("req data:");
                console.log(`okay, Req data: ${JSON.stringify(response)}`);
                // setRequest(response);
                response.technician = 'Rick';
                //calculate the total
                let costPer = response.cost;
                let quantity = response.quantity;
                let discount = response.discount_eligible == 1? response.quantity * settings.discount : 0;
                response.discount = discount;
                response.total = response.payment_method == 'cash' ? parseFloat(Math.floor(costPer * quantity)).toFixed(2) :parseFloat(costPer * quantity).toFixed(2) ;
                setFormData(response);
            },
            (error) => {
                console.log(error)
            }
            )
        }
        else
        {
            // setRequest(null);
            setFormData(null);
        }
    }, [requestData]);



    function checkApproved()
    {
        if(formData.payment_method == "speedcode")
        {
            return formData.speed_code_approved == 1? true: false;
        }
        return true;
    }

    //When a poster is accepted, this function will make the call to persist the new data to the DB
    function onAccept(){
        if(!checkApproved())
        {
            showErrorHandle("Speedcode must be approved before accepting job", "Missing required information");
            return;
        }
        //Set the poster state to accept
        formData.state = 'accepted';
        if(requestData != null)
        {
            let options = {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    // the content type header value is usually auto-set
                    // depending on the request body
                    "Content-Type": 'application/json',
                    'Accept': 'application/json'
                  },
            }
            fetch(`api/posters/acceptPending`, options)
            .then( (res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json()
            })
            .then((response) => {
                console.log("req data:");
                console.log(`okay, Req data: ${JSON.stringify(response)}`);
                if(response.success)
                {
                    console.log("approved request");
                    onHide();
                }
                // setRequest(response);
                // setFormData(response);
            },
            (error) => {
                console.log(error)
            }
            )
        }
        else
        {
            console.log("Cannot post null body")
        }
    }

    // Here we will handle form updates from the form. The entire process is:
    // 1) request data gets sent to form object
    // 2) form control is updated
    // 2) Within the form component (child of this guy), handlers are set up
    // 3) the handlers in the form component will propgate the changed data up to this component
    // 4) this component updateas its form object state
    // 5) this component re-renders, sending the
    function handleFromUpdate(newData){
        console.log("update form in modal new data:");
        console.log(JSON.stringify(newData));
        setFormData(newData);
        // updateTotal();
    }

    function onReject(){
        setRejecting(true);
        
    }

    function onValidate(){
        setFormIsValid(true);
    }

    function handleReject(){
        console.log("delete it");
        //Make call here to delete request, per Mary's reqest we need to void it out. 
        let options = 
        {
            method: 'PATCH',
            headers: {
                // the content type header value is usually auto-set
                // depending on the request body
                "Content-Type": 'application/json',
                'Accept': 'application/json'
            }
        }
        fetch(`api/requests/void&id=${formData.request_id}`, options)
            .then( (res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.message}`);
                }
                return res.json()
            })
            .then((response) => {
                console.log(`okay, Res data: ${JSON.stringify(response)}`);
                if(response.status == "Success")
                {
                    console.log("changed request to Void");
                    onHide();
                }
                else
                {
                    console.log("could not change to rejected");
                }
                // setRequest(response);
                // setFormData(response);
            })
            .catch( (error) => {
                console.log(`Error msg: ${error}`)
                showErrorHandle("Could not delete Poster. Please notify Kirk");
            });
    }

    

    const rejectingConfirm = (
        <>
            {/* <p>sure you want to reject?</p> */}
            <Button variant="danger" onClick={handleReject}>Void and Remove</Button>
            <Button variant="primary" className={'ms-auto'} onClick={() => setRejecting(false)}>no, Go Back</Button>
        </>

    )

    const footerButtons = (
        <>
            <Button variant="danger" onClick={onReject}>Void</Button>
            <Button variant="primary" form='requestForm' type="submit"disabled={formData?.payment_type == 'speedcode'? formData?.speed_code_approved == "0": false}>Accept</Button>
            {/* <Button variant="primary" onClick={onAccept} disabled={formData?.payment_type == 'speedcode'? formData?.speed_code_approved == "0": false}>Accept</Button> */}
            <Button variant="primary" className={'ms-auto'} onClick={onHide}>Close</Button>
        </>
    )

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                
                <Modal.Title id="contained-modal-title-vcenter">
                    <h2>Poster #{formData?.poster_id} - {formData?.first_name} {formData?.last_name}</h2>
                </Modal.Title>
                
            </Modal.Header>
            <Modal.Body>
                
                {formData != null ? <RequestModalForm formD={formData} courseData={courseData} onUpdate={handleFromUpdate} settings={settings} onHandleAccept={onAccept} departments={departments}/> : <h1>noData</h1>}
            </Modal.Body>
            <Modal.Footer>
                        {rejecting ? rejectingConfirm : footerButtons}
            </Modal.Footer>
        </Modal>

    );
}
