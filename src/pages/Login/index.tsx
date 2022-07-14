import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Login() {
    const style = { 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh'
    }

    return (
        <Container style={style}>
            <Link to={'/paciente'}>
                <Button>Entrar</Button>
            </Link>
        </Container>
    );
}

export default Login;