// import RequestTableRow from '@/Components/RequestTableRow';
import { router } from '@inertiajs/react'
import AllSettings from '@/Components/SettingsComponents/AllSettings';

function Settings({ auth, data }) {
    const requests = data;
    return (
        <AllSettings/>   
    );
}
export default Settings