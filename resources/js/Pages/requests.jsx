// import RequestTableRow from '@/Components/RequestTableRow';
import { router } from '@inertiajs/react'
import RequestTable from '@/Components/RequestComponents/RequestTable';
function Requests({ auth, data }) {
    const requests = data;
    return (
        <>
        <RequestTable/>
        </>
        
    );
}

export default Requests;