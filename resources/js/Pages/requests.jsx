import RequestTableRow from '@/Components/RequestTableRow';
import { router } from '@inertiajs/react'

function Requests({ auth, data }) {
    const requests = data;
    return (
        <>
        <table>
            {requests.map((i, key) => (<RequestTableRow requestData={i}>{i.request_id}</RequestTableRow> ) )}
        </table>
            
        </>
        
    );
}

export default Requests