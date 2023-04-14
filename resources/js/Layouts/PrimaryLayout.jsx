// import { Link } from '@inertiajs/react';
import Container from 'react-bootstrap/Container';
import NavBar from '@/Components/NavBar';

export default function Primary({ children }) {
    return (     
        <div>
            <NavBar>

            </NavBar>
            <Container >
                {children}
            </Container>
        </div>
    );
}