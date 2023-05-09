import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import UnderGradSettingsCard from './UnderGradSettings';

function AllSettings() {
    const [settingsData, setSettingsData] = useState(null);

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
            if(response.status == "success")
            {
                setSettitngsData(response.data);
            }
        })
        .catch((error) => {
            console.log(error);
        });    
    }, []);

    const handleSettingUpdate = (newSettingData) =>{
        setSettingsData(newSettingData);
    }

    return (
        <>
        <Row className="mt-3">
            <Col xs={6}>
                <UnderGradSettingsCard settingsData={settingsData} handleSettingUpdate={handleSettingUpdate}/>
            </Col>
        </Row>
            
        </>
    );
}

export default AllSettings;