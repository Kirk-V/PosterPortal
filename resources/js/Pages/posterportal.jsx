import PrimaryLayout from '@/Layouts/PrimaryLayout';
import Requests from './requests';
import Jobs from './jobs';
import Settings from './Settings';

import { useState, useEffect } from 'react';
import ErrorToast from '@/Components/ErrorToast';

function PosterPortal({ auth, currentView, data, user, departments }) {
    const [errorToast, setErrorToast] = useState({message: "", errorType: "", show: false});


    const handleToastClose = () => 
    {
        setErrorToast({ message: "", errorType: "", show: false });
    }

    function handleErrorToast(errorMessage, errorType) {
        console.log(`Setting error to ${errorMessage} , ${errorType}, true`);
        setErrorToast({ message: errorMessage, errorType: errorType, show: true });
    }

    let pageView;
    if (currentView === 'requests') {
        pageView = <Requests data={data} showErrorHandle={handleErrorToast} departments={departments}/>;
    }
    else if (currentView === 'settings') {
        pageView =<Settings departments={departments} showErrorHandle={handleErrorToast}/>;
    }
    else if (currentView === 'jobs') {
        pageView = <Jobs showErrorHandle={handleErrorToast} departments={departments}/>;
    }
    else {
        pageView = <Requests data={data} showErrorHandle={handleErrorToast} departments={departments}/>;
    }



    return (
        <>
        <PrimaryLayout onPage={currentView} signedInUser={user}>
            {pageView}
        </PrimaryLayout>
        <ErrorToast errorMessage={errorToast.message} errorType={errorToast.errorType} show={errorToast.show} handleClose={handleToastClose} />
        </>

    );
}
// PosterPortal.layout = page => <PrimaryLayout children={page}></PrimaryLayout>

export default PosterPortal