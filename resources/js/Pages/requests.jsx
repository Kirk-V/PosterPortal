import RequestTableRow from '@/Components/RequestTableRow';
import { router } from '@inertiajs/react'
import RequestTable from '@/Components/RequestTable';
function Requests({ auth, data }) {
    const requests = data;
    return (
        <>
        <RequestTable/>
        </>
        
    );
}

export default Requests