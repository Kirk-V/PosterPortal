// import RequestTableRow from '@/Components/RequestTableRow';
import { router } from '@inertiajs/react'
import RequestTable from '@/Components/RequestComponents/RequestTable';
import JobsTable from '@/Components/jobsComponents/JobsTable';
function Jobs({ auth, data, showErrorHandle, departments}) {
    
    const requests = data;

    const handleClose = () => {
        setShowModal(false);
        setModalData(null);
        console.log("closing");
    }

    const handleToastClose = () => 
    {
        setErrorToast({ message: "", errorType: "", show: false });
    }

    function handleErrorToast(errorMessage, errorType) {
        console.log(`Setting error to ${errorMessage} , ${errorType}, true`);
        setErrorToast({ message: errorMessage, errorType: errorType, show: true });
    }
    return (
        <JobsTable showErrorHandle={showErrorHandle} departments={departments}/>

        
    );
}
export default Jobs