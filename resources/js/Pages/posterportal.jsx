import PrimaryLayout from '@/Layouts/PrimaryLayout';
import Requests from './requests';
import Jobs from './jobs';

function PosterPortal({ auth , currentView, data}) {
    let pageView;
    if(currentView === 'requests')
    {
        pageView = <Requests data={data} />;
    }
    else if(currentView === 'settings')
    {
        pageView = <h1>settings</h1>;
    }
    else if(currentView === 'jobs')
    {
        pageView = <Jobs/>;
    }
    else
    {
        pageView = <Requests data={data} />;
    }
    return (
        <PrimaryLayout onPage={currentView} >
            {pageView}
        </PrimaryLayout>
            
    );
}
// PosterPortal.layout = page => <PrimaryLayout children={page}></PrimaryLayout>

export default PosterPortal