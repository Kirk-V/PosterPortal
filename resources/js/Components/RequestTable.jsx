import Table from 'react-bootstrap/Table';
import RequestTableHead from './RequestTableHead';
import { useEffect, useState } from 'react';
import RequestTableBody from './RequestTableBody';

export default function RequestTable() {
    const [error, setError] = useState(null);
    const [headingsLoaded, setHeadingsLoaded] = useState(false);
    const [bodyLoaded, setBodyLoaded] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [headings, setHeadings] = useState(null);
    const [items, setItems] = useState(null);
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
            
                console.log(`okay Heading response: ${JSON.stringify(response)}`);
                setItems(response);
                setBodyLoaded(true);
            },
            (error) => {
                setError(error);
                console.log("error");
            }
        ).catch(() => {
            console.log("caught");
        });
    }, []);

    let table;
    if(headingsLoaded)
    {
        table = (
            <Table striped>
                <RequestTableHead headings={headings}></RequestTableHead>
                {bodyLoaded == true ? <RequestTableBody data={items}></RequestTableBody> :null}
            </Table>
        )
    }
    if(error)
    {
        table = (<h1>Error getting data</h1>);
    }
    return table;
}
