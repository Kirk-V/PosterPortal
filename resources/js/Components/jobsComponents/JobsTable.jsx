import Table from 'react-bootstrap/Table';
// import RequestTableHead from './RequestTableHead';
import { useEffect, useState } from 'react';
// import RequestTableBody from './RequestTableBody';
// import RequestModal from './RequestModal';

export default function JobsTable() {
    // Two objects for the headings and data within a table.
    const [headings, setHeadings] = useState(null);
    const [headingsLoaded, setHeadingsLoaded] = useState(false);
    const [data, setData] = useState(null);
    const [showingModal, setShowingModal] = useState(false);

    //Fetch the headings and data.
    useEffect(()=> {
        fetch("/jobs/jobsHeaders")
            .then( (res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return res.json()
            })
            .then((response) => {
                console.log(`okay Heading response: ${JSON.stringify(response)}`);
                console.log(`passing keys: ${Object.keys(response)}`)
                setHeadings(response);
                setHeadingsLoaded(true);
            },
            (error) => {
                setError(error);
            }
            )
    }, []);

    return (
        <>
        <Table striped hover={true}>
                {headingsLoaded == true ? <RequestTableHead headings={headings}></RequestTableHead> : null}  
                {bodyLoaded == true && headingsLoaded == true ? <RequestTableBody data={items} headers={headings} handleRowClick={handleClick}></RequestTableBody> :null}
                {error == true? <h1>error</h1> : null}
        </Table>
        <RequestModal show={showingModal} requestData={modalData} onHide={handleClose} courseData={courseData}/>
        </>
        
    )
}
