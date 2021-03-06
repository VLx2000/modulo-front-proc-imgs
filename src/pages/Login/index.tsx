import { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { AuthContext } from "contexts/auth";
import './styles.css';

function Login() {

    const context = useContext(AuthContext);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const submitHandler = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        context?.login!(email, password);
    };

    return (
        <Container className="login-container">
            <Form onSubmit={submitHandler}>
                <h3 className="titulo-pag">Login</h3>
                <Form.Group controlId="email" className="mb-3">
                    <Form.Label column sm="6">Email</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        onChange={(e) => setEmail(e.target.value as string)}
                        placeholder="name@example.com"
                    />
                </Form.Group>
                <Form.Group controlId="senha" className="mb-3">
                    <Form.Label column sm="6">Senha</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        onChange={(e) => setPassword(e.target.value as string)}
                    />
                </Form.Group>
                <Form.Group controlId="entrar" className="mb-3 div-botao-entrar">
                    <Button type="submit">Entrar</Button>
                </Form.Group>
            </Form>
        </Container>
    );
}

export default Login;