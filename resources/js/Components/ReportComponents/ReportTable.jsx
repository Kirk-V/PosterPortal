import {React, useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table';

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
        fetch(`api/reportData?start=${tableOptions.start_date ?? -1}&end=${tableOptions.end_date ?? -1}&payment=${tableOptions.payment_type ?? -1}`, options)
        .then( (res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return res.json();
        })
        .then((response) => {
            console.log(JSON.stringify(respone));
            if(response.status == "success")
            {
                setHasData(true);
                setRowData(response.data);
            }
        },(error) => {
            console.log(error);
        }
        );
    }, [tableOptions])


    return (
        <div>ReportTable</div>
    )
}
