import PrimaryLayout from '@/Layouts/PrimaryLayout';
import Requests from './requests';

function PosterPortal({ auth , currentView}) {
    let pageView;
    if(currentView === 'requests')
    {
        pageView = <Requests/>;
    }
    else if(currentView === 'settings')
    {
        pageView = <h1>settings</h1>;
    }
    else
    {
        pageView = <h1>defaults</h1>;
    }
    return (
        <PrimaryLayout onPage={currentView}>
            {pageView}
        </PrimaryLayout>
            
    );
}
// PosterPortal.layout = page => <PrimaryLayout children={page}></PrimaryLayout>

export default PosterPortal