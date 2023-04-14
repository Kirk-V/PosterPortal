import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';


export default function NavBar() {
    return (
        <Navbar 
                bg="light" 
                variant="light" 
                fixed="top"
                expand="md">
                <Container>
                    <Navbar.Brand>
                        <Image 
                            src="https://www.uwo.ca/web_standards/img/logos-faculties-stacked/svg/Western_Logo_F_S_SocialScience_RGB.svg" 
                            className="d-inline-block align-top"
                            width="15%"
                            // height="30"
                    />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-md`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                    
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                            Offcanvas
                        </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                        <Nav variant="pills" 
                            className="justify-content-end flex-grow-1 pe-3"
                            defaultActiveKey="/home">
                            
                            <Nav.Item>
                                <Nav.Link href="/requests">requests</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="/jobs">Jobs</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="/settings">Settings</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Form className="d-flex">
                          <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                          />
                          <Button variant="outline-success">Search</Button>
                        </Form>
                      </Offcanvas.Body>

                    </Navbar.Offcanvas>


                </Container>
                
            </Navbar>
    );
}