// import RequestTableRow from '@/Components/RequestTableRow';
import { router } from '@inertiajs/react'
import RequestTable from '@/Components/RequestComponents/RequestTable';
import JobsTable from '@/Components/jobsComponents/JobsTable';
function Jobs({ auth, data }) {
    const requests = data;
    return (
        <JobsTable/>

        
    );
}
export default Jobs