import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import { AuthContext } from 'contexts/auth';
import { useContext } from 'react';
import './styles.css';

function NavigationBar() {

    const context = useContext(AuthContext);

    const handleLogout = () => {
        context?.logout!();
    }

    return (
        <Navbar collapseOnSelect bg="dark" variant='dark' expand="lg" sticky="top">
            <Container >
                <Navbar.Brand href='/' title="Processamento de imagens">
                    <h1>Processamento de imagens</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav.Link href="/">
                        <p className='link'>Pacientes</p>
                    </Nav.Link>
                    <Nav.Link href="">
                        <p className='link'>outro</p>
                    </Nav.Link>
                    <Nav.Link href="">
                        <p className='link'>outro</p>
                    </Nav.Link>
                    <div className='div-sair'><Button variant='outline-danger' onClick={handleLogout}>Sair</Button></div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;