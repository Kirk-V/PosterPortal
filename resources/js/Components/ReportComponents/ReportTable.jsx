import {React, useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import ReportTableHead from './ReportTableHead';
import ReportRow from './ReportRow';

export default function ReportTable({tableOptions, handleReconciled}) {
    // const [tableSettings, setTableSettings] = useState(tableOptions)
    const [hasData, setHasData] = useState(false);
    const [rowData, setRowData] = useState(null);

    

    // Get the required rows from the database
    useEffect(() => {
        console.log("get new data"+ JSON.stringify(tableOptions));
        let options = 
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }   
        }
        fetch(`api/reportData?start=${tableOptions?.start_date ?? -1}&end=${tableOptions?.end_date ?? -1}&payment=${tableOptions?.payment_type ?? -1}`, options)
        .then( (response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((response) => {
            console.log(JSON.stringify(response));
            if(response.status == "Success")
            {
                console.log("SETTING DATA");
                setHasData(true);
                setRowData(response.data);
            }
        },(error) => {
            console.log(error);
        }
        );
    }, [tableOptions])


    return (
        <>
            <div>ReportTable</div>
            <Table
                striped={true}>
                <ReportTableHead></ReportTableHead>
                <tbody>
                {hasData? rowData.map((row)=> {
                    console.log(`row being added: ${JSON.stringify(row)}`);
                    return <ReportRow key={row.poster_id} data={row}/>
                }): null}
                </tbody>
                
            </Table>
            
        </>
        
    )
}
