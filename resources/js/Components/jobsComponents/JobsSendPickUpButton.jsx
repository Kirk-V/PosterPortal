import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

export default function JobsSendPickUpButton({jobID, posterState, updateStateHandler}) {

    function sendEmail(){
        //make API call to send an email to jobID
        console.log("sending Email");
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
