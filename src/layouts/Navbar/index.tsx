import { Nav, Navbar, Container } from 'react-bootstrap';
import './styles.css';

function NavigationBar() {

    return (
        <Navbar collapseOnSelect bg="dark" variant='dark' expand="lg" sticky="top">
            <Container >
                <Navbar.Brand href='/' title="Processamento de imagens">
                    <h1>Processamento de imagens</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav.Link href="#lista">
                        <p className='link'>Lista Pacientes</p>
                    </Nav.Link>
                    <Nav.Link href="#outro">
                        <p className='link'>outro</p>
                    </Nav.Link>
                    <Nav.Link href="#outro">
                        <p className='link'>outro</p>
                    </Nav.Link>
                    <Nav.Link href="#outro">
                        <p className='link'>outro</p>
                    </Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;