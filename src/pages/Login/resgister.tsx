import { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { AuthContext } from "contexts/auth";
import './styles.css';
import axiosInstance from "utils/axios";
import { Link } from "react-router-dom";

function Register() {

    const context = useContext(AuthContext);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const submitHandler = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        axiosInstance
            .post('/users/register', 
                JSON.stringify({ name, email, password }),
                { headers: { "Content-Type": 'application/json', } }
            )
            .then((res) => {
                context?.login!(email, password);
            })
            .catch((error) => {
                console.log('epa')
            });
    };

    return (
        <Container className="login-container">
            <Form onSubmit={submitHandler}>
                <h3 className="titulo-pag">Registrar-se</h3>
                <Form.Group controlId="newNome" className="mb-3">
                    <Form.Label column sm="6">Nome</Form.Label>
                    <Form.Control
                        required
                        onChange={(e) => setName(e.target.value as string)}
                    />
                </Form.Group>
                <Form.Group controlId="newEmail" className="mb-3">
                    <Form.Label column sm="6">Email</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        onChange={(e) => setEmail(e.target.value as string)}
                        placeholder="name@example.com"
                    />
                </Form.Group>
                <Form.Group controlId="newSenha" className="mb-3">
                    <Form.Label column sm="6">Senha</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        onChange={(e) => setPassword(e.target.value as string)}
                    />
                </Form.Group>
                <Form.Group controlId="criar" className="mb-3 div-botao-entrar">
                    <Button type="submit">Criar conta</Button>
                </Form.Group>
                <div>Já tem uma conta? <Link to={'/login'}>Logar-se</Link></div>
            </Form>
        </Container>
    );
}

export default Register;