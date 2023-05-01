// import RequestTableRow from '@/Components/RequestTableRow';
import { router } from '@inertiajs/react'
import { useState, useEffect } from 'react';
import RequestTable from '@/Components/RequestComponents/RequestTable';


function Requests({ auth, data}) {
    const requests = data;
    const [settings, setSettings] = useState(null);

    //Get setting information
    useEffect( () => {
        // /requests/pending&id={id}
        // fetch(`/requests&id=${requestData.requests.request_id}`)
        fetch(`api/settings/all`)
        .then( (res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return res.json()
        })
        .then((response) => {
            console.log("req data:");
            console.log(`okay, Setting data: ${JSON.stringify(response)}`);
            // setRequest(response);
            setSettings(response);
        },
        (error) => {
            console.log(error)
        })
    }, []);


    return (
        <>
        <RequestTable settings={settings} />
        </>
    );


}

export default Requests;