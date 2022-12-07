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
                    <h1>Proc de imgs</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav.Link href="/">
                        <p className='link'>Pacientes</p>
                    </Nav.Link>
                    <Nav.Link href="/admin">
                        <p className='link'>Painel de admin</p>
                    </Nav.Link>
                    <div className='div-sair'>
                        <div>Entrou como: {context?.user != null ? context?.user.name: 'Carregando'}</div>
                        <Button variant='outline-danger' onClick={handleLogout}> Sair</Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;