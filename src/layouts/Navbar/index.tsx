import { Navbar, Container, Button } from 'react-bootstrap';
import { AuthContext } from 'contexts/auth';
import { useContext } from 'react';
import './styles.css';

function NavigationBar() {

    const context = useContext(AuthContext);

    const handleLogout = () => {
        context?.logout!();
    }

    const home = context?.user?.type === 'admin' ? '/admin' : '/';

    return (
        <Navbar collapseOnSelect bg="dark" variant='dark' expand="lg" sticky="top">
            <Container >
                <Navbar.Brand href={home} title="Processamento de imagens">
                    <h1>Processamento de NIfTI</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
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