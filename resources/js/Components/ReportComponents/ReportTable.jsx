import {React, useState, useEffect, useRef } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ReportTableHead from './ReportTableHead';
import ReportRow from './ReportRow';
import ReportTableBottomRow from './ReportTableBottomRow';
import ReportPDF from './ReportPDF';
import PosterModal from './PosterModal';

export default function ReportTable({tableOptions, handleReconciled}) {
    // const [tableSettings, setTableSettings] = useState(tableOptions)
    const [hasData, setHasData] = useState(false);
    const [rowData, setRowData] = useState(null);
    const [totalValues, setTotalValues] = useState(null);
    const [showPrintPDF, setShowPrintPDF] = useState(false);
    const [showingPosterModal, setShowingPosterModal] = useState(false);
    const [posterModalData, setPosterModalData] = useState(null);

    

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
            // console.log(JSON.stringify(response));
            if(response.status == "Success")
            {
                console.log("SETTING DATA");
                setHasData(true);
                setRowData(response.data);
                // console.log("ROW DATA " + JSON.stringify(rowData));
                setTotalValues(findTotals(response.data));
            }
        },(error) => {
            console.log(error);
        }
        );
    }, [tableOptions])

    const findTotals = (allRows) => 
    {
        let receivedTotal= 0, grantPayment= 0,SDFDiscount= 0, cashPayment = 0, subtotal=0;
        allRows.forEach((row) => {
            subtotal += parseFloat(row.transactions.total);
            receivedTotal += parseFloat(row.transactions.total_received);
            grantPayment += row.requests.payment_method == 'speed_code' ? parseFloat(row.transactions.total): 0;
            cashPayment += row.requests.payment_method == 'cash' ? parseFloat(row.transactions.total): 0;
            SDFDiscount += parseFloat(row.discount);            
        });
        let totals = {
            total: subtotal,
            cash: cashPayment,
            grant: grantPayment,
            SDF: SDFDiscount,
            received: receivedTotal
        };

        return totals;
    }

    const makePrintPDF = () => 
    {
        setShowPrintPDF(true);
    }

    const closePrintPDF = () => 
    {
        setShowPrintPDF(false);
    }

    const handleRowClick = (poster_id) => 
    {
        console.log("showing Poster Modal");
        setPosterModalData(rowData.poster_id);
        setShowingPosterModal(true);
    }


    const handleCloseModal = () => {
        setShowingPosterModal(false);
        setPosterModalData(null);
    }

    return (
        <>
        <div className="border mt-4 p-2 bg-opacity-50">
            <Row className="justify-content-end mt-3">
                <Col xs={1}>
                    <Button onClick={makePrintPDF}>Print</Button>
                </Col>
            </Row>
            <Table
                striped={true}>
                <ReportTableHead></ReportTableHead>
                <tbody>
                {hasData ? rowData?.map((row)=> {
                    // console.log(`row being added: ${JSON.stringify(row)}`);
                    return <ReportRow key={row.poster_id} data={row}/>
                }): null}
                <ReportTableBottomRow totals={totalValues}></ReportTableBottomRow>
                </tbody>
                
            </Table>        
        </div>
        {showPrintPDF? <ReportPDF handleCloseModal={closePrintPDF} reportData={rowData} reportSettings={tableOptions}/>: null}
        {showingPosterModal? <PosterModal posterData={posterModalData}/>: null}
        </>
        
    )
}
