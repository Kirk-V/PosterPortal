import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Row, Col, Placeholder } from 'react-bootstrap';
import UnderGradSettingsCard from './UnderGradSettings';

function AllSettings() {
    const [settingsData, setSettingsData] = useState(null);
    const [settingsDataIsLoaded, setsettingsDataIsLoaded] = useState(false);
    
    useEffect(() => {
        let options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
                },
        }
        fetch(`api/settings/all`)
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
                console.log("ssetting settings");
                setSettingsData(response.data);
                setsettingsDataIsLoaded(true);
            }
        })
        .catch((error) => {
            console.log(error);
        });    
    }, []);

    const handleSettingUpdate = (newSettingData) =>{
        setSettingsData(newSettingData);
    }

    const updateASetting = (setting, value) => {
        let options = {
            method: "PUT"
        }
        fetch(`api/settings/update?setting=${setting}&value=${value}`, options)
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
                console.log("sUpdated Setting");
                settingsData[setting] = value;
                console.log(`settings now set to ${JSON.stringify(settingsData)}`);
            }
        })
        .catch((error) => {
            console.log(error);
        });  
    }

    const UndergradCard = (
        <UnderGradSettingsCard settingsData={settingsData} handleSettingUpdate={handleSettingUpdate}/>
    )
    return (
        <>
        <Row className="mt-3">
            <Col xs={6}>

                {settingsDataIsLoaded ?  <UnderGradSettingsCard settingsData={settingsData} handleSettingUpdate={handleSettingUpdate}/> : <h1>not loaded</h1>}
            </Col>
        </Row>
            
        </>
    );
}

export default AllSettings;