import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

export default function JobsSendPickUpButton({jobID, posterState, updateStateHandler}) {

    function sendEmail(){
        //make API call to send an email to jobID
        console.log("sending Email");
        let options = {
            method: 'PUT',
            body: JSON.stringify({'job_id': jobsData.job_id}),
            headers: {
                // the content type header value is usually auto-set
                // depending on the request body
                "Content-Type": 'application/json',
                'Accept': 'application/json'
              },
        }
        fetch(`api/jobs/sendPickUpNotice`, options)
        .then( (res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return res.json()
        })
        .then((response) => {
            console.log("email:");
            console.log(`okay, Update state reply: ${JSON.stringify(response)}`);
            // setRequest(response);
            if(response.success)
            {
                console.log("success");
            }
            else
            {
                
            }
        },
        (error) => {
            console.log(error)
        })
    }

    function sendPickUpNoticeAndChangeState(jobID){
        //make API call
        sendEmail();
        updateStateHandler("pending_pickup");
    }

    let ButtonToDisplay;
    if(posterState == "pending_pickup") //Already sent notice
    {
        ButtonToDisplay= (<Button variant="danger" onClick={() => sendEmail(jobID)}>re-send Pickup Notice</Button>);
    }
    else if(posterState == "printed")//This should also move poster to next state
    {
        ButtonToDisplay = (<Button variant="primary" onClick={() => sendPickUpNoticeAndChangeState(jobID)}>Send Pickup Notice</Button>);
    }
    else
    {
        ButtonToDisplay = null;
    }

    return (
        ButtonToDisplay

    )
}
