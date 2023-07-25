// import { Link } from '@inertiajs/react';
import Container from 'react-bootstrap/Container';
import NavBar from '@/Components/NavBar';
import {Head} from '@inertiajs/react'

export default function Primary({ onPage, children, signedInUser }) {
    return (     
        <>
        <Head title={onPage} />
        <NavBar currentView={onPage} user={signedInUser}>

        </NavBar>
        <Container>{children}</Container>
        </>
    );
}