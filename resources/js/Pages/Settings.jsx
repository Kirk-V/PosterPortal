// import RequestTableRow from '@/Components/RequestTableRow';
import { router } from '@inertiajs/react'
import AllSettings from '@/Components/SettingsComponents/AllSettings';

function Settings({ auth, data, departments }) {
    const requests = data;
    return (
        <AllSettings departments={departments}/>   
    );
}
export default Settings