import Table from 'react-bootstrap/Table';
import RequestTableHead from './RequestTableHead';
import { useEffect, useState } from 'react';
import RequestTableBody from './RequestTableBody';
import RequestModal from './RequestModal';

export default function RequestTable() {
    const [error, setError] = useState(null);
    const [headingsLoaded, setHeadingsLoaded] = useState(false);
    const [bodyLoaded, setBodyLoaded] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [headings, setHeadings] = useState(null);
    const [items, setItems] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    //Get the table data here
    useEffect(()=> {
        fetch("/requests/headers")
            .then( (res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return res.json()
            })
            .then((response) => {
                
                console.log(`okay Heading response: ${JSON.stringify(response)}`);
                setHeadings(response);
                setHeadingsLoaded(true);
            },
            (error) => {
                setError(error);
            }
            )
    }, []);

    useEffect(() => {
        fetch("/requests/data")
            .then( (res) => {
                if (res.ok) {
                    return res.json()
                }
                console.log("rejecting promise");
                return Promise.reject(res);            
            })
            .then((response) => {
                console.log(`okay body response: ${JSON.stringify(response)}`);
                setItems(response);
                setBodyLoaded(true);
            },
            (error) => {
                setError(error);
                console.log("error");
            }
        ).catch((e) => {
            console.log("caught");
            console.log(e);
        });
    }, []);

    function handleClick(rowData){
        // alert(`clickedRow ${JSON.stringify(rowData)}`);
        setModalData(rowData);
        setShowModal(true);
        console.log(`showmodal: ${showModal}`);
    }

    const handleClose = () => setShowModal(false);

    return (
        <>
        <Table striped>
                {headingsLoaded == true ? <RequestTableHead headings={headings}></RequestTableHead> : null}  
                {bodyLoaded == true ? <RequestTableBody data={items} handleRowClick={handleClick}></RequestTableBody> :null}
                {error == true? <h1>error</h1> : null}
        </Table>
        <RequestModal show={showModal} requestData={modalData} onHide={handleClose}/>
        </>
        
    )
}
