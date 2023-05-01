import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import RequestModalForm from './RequestModalForm';
import { useState, useEffect } from 'react';


//This component holds request data, and should call for extra data related to a request when needed
// ie. if the request is undergrad and needs to be combined with course info.
export default function RequestModal({requestData, onHide, show, courseData, settings, showErrorHandle}) {
    const [rejecting, setRejecting] = useState(false);
    const [request, setRequest] = useState(null);
    const [formData, setFormData] = useState(null); // originally comes from request.
    console.log("modal made");
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
                return res.json()
            })
            .then((response) => {
                console.log("req data:");
                console.log(`okay, Req data: ${JSON.stringify(response)}`);
                // setRequest(response);
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


    //When a poster is accepted, this function will make the call to persist the new data to the DB
    function onAccept(){
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
                    throw new Error(`HTTP error! Status: ${response.status}`);
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
        console.log("update form in modal");
        console.log(JSON.stringify(newData));
        setFormData(newData);
    }

    function onReject(){
        showErrorHandle("test", "test");
        setRejecting(true);
        
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
        fetch(`api/requests/reject&id=${formData.request_id}`, options)
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
                    console.log("changed request to rejected");
                    // onHide();
                }
                else
                {
                    console.log("could not change to rejected");
                }
                // setRequest(response);
                // setFormData(response);
            })
            .catch( (error) => {
                console.log(error)
                showErrorHandle("Could not delete Poster. Please notify Kirk");
            });
    }

    const rejectingConfirm = (
        <>
            {/* <p>sure you want to reject?</p> */}
            <Button variant="danger" onClick={handleReject}>Reject and Delete</Button>
            <Button variant="primary" className={'ms-auto'} onClick={() => setRejecting(false)}>no, Go Back</Button>
        </>

    )

    const footerButtons = (
        <>
            <Button variant="primary" onClick={onReject}>Reject</Button>
            <Button variant="primary" onClick={onAccept}>Accept</Button>
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
                    {request != null ? request.request_id : null} {request != null ? request.first_name : null} {request != null ? request.last_name : null}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {formData != null ? <RequestModalForm formD={formData} courseData={courseData} onUpdate={handleFromUpdate} settings={settings}/> : <h1>noData</h1>}
            </Modal.Body>
            <Modal.Footer>
                        {rejecting ? rejectingConfirm : footerButtons}
            </Modal.Footer>
        </Modal>

    );
}
