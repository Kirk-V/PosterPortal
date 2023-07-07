import { useState, useEffect } from 'react';
import ErrorToast from '@/Components/ErrorToast';
import Container from 'react-bootstrap/Container';
import NavBar from '@/Components/NavBar';
import ReportsLayout from '@/Layouts/ReportsLayout';
import OptionsBar from '@/Components/ReportComponents/OptionsBar';

import React from 'react'
import ReportTable from '@/Components/ReportComponents/ReportTable';

export default function Reports() {
    const [errorToast, setErrorToast] = useState({message: "", errorType: "", show: false});
    const [options, setOptions] = useState(null);
    const [tableReady, setTableReady] = useState(false);

    const handleToastClose = () => 
    {
        setErrorToast({ message: "", errorType: "", show: false });
    }

    function handleErrorToast(errorMessage, errorType) {
        console.log(`Setting error to ${errorMessage} , ${errorType}, true`);
        setErrorToast({ message: errorMessage, errorType: errorType, show: true });
    }

    const handleOptionsUpdate = (e) => {
        let name = e.target.name;
        let val = e.target.value;
        console.log(`update: ${name} to ${val}`);
        let copy = {...options}
        copy[name] = val;
        setTableReady(false); //prevent reload of table while adjusting settings
        setOptions(copy);
    }

    const updateTable = () => {
        console.log("update table");
        setTableReady(true);
    }

    const reconcilePoster = (id) => {
        
    }

    return (
        <>
        <Container>
            <ReportsLayout/>
            <OptionsBar handleOptionsUpdate={handleOptionsUpdate} getPosters={updateTable} />
            {tableReady ? <ReportTable tableOptions={options} handleReconciled={reconcilePoster} /> : null}

        </Container>
        </>
        
    )
}
