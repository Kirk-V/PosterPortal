import PrimaryLayout from '@/Layouts/PrimaryLayout';
import Requests from './requests';
import Jobs from './jobs';
import Settings from './Settings';

import { useState, useEffect } from 'react';

function PosterPortal({ auth, currentView, data, user }) {



    let pageView;
    if (currentView === 'requests') {
        pageView = <Requests data={data}/>;
    }
    else if (currentView === 'settings') {
        pageView =<Settings/>;
    }
    else if (currentView === 'jobs') {
        pageView = <Jobs />;
    }
    else {
        pageView = <Requests data={data} />;
    }



    return (
        <PrimaryLayout onPage={currentView} signedInUser={user}>
            {pageView}
        </PrimaryLayout>

    );
}
// PosterPortal.layout = page => <PrimaryLayout children={page}></PrimaryLayout>

export default PosterPortal