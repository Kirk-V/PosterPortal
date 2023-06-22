import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Row, Col, Placeholder } from 'react-bootstrap';
import UnderGradSettingsCard from './UnderGradSettings';
import PosterSettings from './PosterSettings';

function AllSettings({departments}) {
    const [settingsData, setSettingsData] = useState(null);
    const [settingsDataIsLoaded, setsettingsDataIsLoaded] = useState(false);
    const [SDFBalance, setSDFBalance] = useState(null);
    
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

    useEffect(() => {
        let options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
                },
        }
        fetch(`api/SDFBalance`, options)
        .then( (res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return res.json();
        })
        .then((response) => {
            console.log("req data:");
            console.log(`okay, Balance is: ${JSON.stringify(response)}`);
            if(response.status == "Success")
            {
                setSDFBalance(response.data);
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
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch(`/api/settings/update?setting=${setting}&value=${value}`, options)
        .then((res) => {
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
            console.log("Caught error" +error);
        });  
    }

    const handleSDFUpdate = (type, value) => {
        
    }

    const UndergradCard = (
        <UnderGradSettingsCard settingsData={settingsData} handleSettingUpdate={handleSettingUpdate} SDFBalance={SDFBalance} handleSDFUpdate={handleSDFUpdate}/>
    )
    return (
        <>
        <Row className="mt-3">
            <Col xs={6}>
                {settingsDataIsLoaded ?  <UnderGradSettingsCard settingsData={settingsData} updateSetting={updateASetting} departments={departments}/> : <h1>not loaded</h1>}
                
            </Col>
            <Col>
                {settingsDataIsLoaded ?  <PosterSettings allSettinsData={settingsData} updateSetting={updateASetting}/> : <h1>not loaded</h1>}
            </Col>
        </Row>
            
        </>
    );
}

export default AllSettings;