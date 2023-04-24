// import { Link } from '@inertiajs/react';
import Container from 'react-bootstrap/Container';
import NavBar from '@/Components/NavBar';

export default function Primary({ onPage, children }) {
    return (     
        <>
        <NavBar currentView={onPage}>

        </NavBar>
        <Container>{children}</Container>
        </>
    );
}