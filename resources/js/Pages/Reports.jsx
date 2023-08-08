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
    const [budgetYears, setBudgetYears] = useState(Array.from(Array(5), (_, i) => new Date().getFullYear() - i));
    const [options, setOptions] = useState(()=> {
        return {
            'budget_year' : budgetYears[0],
            'start_date' : `${budgetYears[0]}-04-01`,
            'end_date' : `${budgetYears[0]+1}-04-01`,
            'payment_type': "All"
        }
    });
    const [tableReady, setTableReady] = useState(false);


    console.log("optsion Sstate is = "+JSON.stringify(options));
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
        if(name == 'budget_year')
        {
            console.log("UPdate by");
            handleBudgetYearChange(val);
        }
        else
        {
            console.log(`update: ${name} to ${val}`);
            let copy = {...options}
            copy[name] = val;
            setTableReady(false); //prevent reload of table while adjusting settings
            setOptions(copy);
        }
        
        
    }

    const updateTable = () => {
        console.log("update table");
        setTableReady(true);
    }

    const reconcilePoster = (id) => {
        
    }

    const handleSetDefaults = () => 
    {
        //default values are
        let defaults = {
            'budget_year' : BudgetYears[0],
            'start_date' : `${BudgetYears[0]}-04-01`,
            'end_date' : `${BudgetYears[0]+1}-04-01`,
        }
        setOptions(defaults);
    }

    const handleBudgetYearChange = (newYear) => {
        let optionsCopy = {...options};
        console.log("new year"+newYear);
        optionsCopy['budget_year'] = `${newYear}`;
        optionsCopy['start_date'] = `${newYear}-05-01`;
        optionsCopy['end_date'] = `${parseInt(newYear)+1}-04-30`;
        setOptions(optionsCopy);
    }

    return (
        <>
        <Container>
            <ReportsLayout/>
            <OptionsBar parentOptions={options} handleOptionsUpdate={handleOptionsUpdate} getPosters={updateTable} BudgetYears={budgetYears} setDefaults={handleSetDefaults}/>
            {tableReady ? <ReportTable tableOptions={options} handleReconciled={reconcilePoster} /> : null}
        </Container>
        </>
        
    )
}
