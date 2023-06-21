import Table from 'react-bootstrap/Table';
import JobsTableHead from '@/Components/jobsComponents/JobsTablehead';
import JobsTableBody from '@/Components/jobsComponents/JobsTableBody';
import JobsModal from '@/Components/jobsComponents/Jobsmodal';
import { useEffect, useState } from 'react';
// import RequestTableBody from './RequestTableBody';
// import RequestModal from './RequestModal';

export default function JobsTable() {
    // Two objects for the headings and data within a table.
    const [headings, setHeadings] = useState(null);
    const [headingsLoaded, setHeadingsLoaded] = useState(false);
    const [bodyData, setBodyData] = useState(null);
    const [bodyDataLoaded, setBodyDataLoaded] = useState(false);
    const [modalData, setModalData] = useState(null);
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
                console.log(`okay, Job Heading response: ${JSON.stringify(response)}`);
                console.log(`passing keys: ${Object.keys(response)}`)
                setHeadings(response);
                setHeadingsLoaded(true);
            },
            (error) => {
                setError(error);
            }
            )
    }, []);


    useEffect(() => {
        fetch("/jobs&page=1")
            .then( (res) => {
                if (res.ok) {
                    return res.json()
                }
                console.log("rejecting promise");
                return Promise.reject(res);
            })
            .then((response) => {
                console.log(`okay body response: ${JSON.stringify(response)}`);
                setBodyData(response);
                setBodyDataLoaded(true);
            },
            (error) => {
                setError(error);
                console.log("error");
            }
        ).catch((e) => {
            console.log("caught");
            console.log(e);
        });
    }, [showingModal]);


    function handleRowClick(rowData){
        setModalData(rowData);
        setShowingModal(true);
        console.log(`showmodal: ${showingModal}`);
    }

    const handleClose = () => {
        setShowingModal(false);
        setModalData(null);
        console.log("closing");
    }

    return (
        <>
        <Table striped hover={true}>
                {headingsLoaded == true ? <JobsTableHead headings={headings}></JobsTableHead> : null}
                {bodyDataLoaded == true && headingsLoaded == true ? <JobsTableBody data={bodyData} headers={headings} onRowClick={handleRowClick}></JobsTableBody> :null}
                {/* {error == true? <h1>error</h1> : null} */}
        </Table>
        <JobsModal show={showingModal} modalData={modalData} onHide={handleClose} key={modalData}/>
        </>

    )
}
