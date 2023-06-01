// import { Link } from '@inertiajs/react';
import Container from 'react-bootstrap/Container';
import NavBar from '@/Components/NavBar';

export default function Primary({ onPage, children, signedInUser }) {
    return (     
        <>
        <NavBar currentView={onPage} user={signedInUser}>

        </NavBar>
        <Container>{children}</Container>
        </>
    );
}