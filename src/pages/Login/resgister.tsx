import { useContext, useState } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import { AuthContext } from "contexts/auth";
import './styles.css';
import axiosInstance from "utils/axios";
import { Link } from "react-router-dom";

function Register() {

    const context = useContext(AuthContext);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [carregado, setCarregado] = useState<Boolean>(true);
    const [message, setMessage] = useState<string>('');

    const submitHandler = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setCarregado(false);
        axiosInstance
            .post('/users/register', 
                JSON.stringify({ name, email, password }),
                { headers: { "Content-Type": 'application/json', } }
            )
            .then((res) => {
                context?.login!(email, password);
            })
            .catch((error) => {
                setMessage(error.response.data.message);  
            });
        setCarregado(true);
    };

    return (
        <Container className="login-container">
            {carregado ?
                <Form onSubmit={submitHandler}>
                    <h3 className="titulo-pag">Registrar-se</h3>
                    {message && <Alert variant="warning">{message}</Alert>}
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
                : <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div> 
            }
        </Container>
    );
}

export default Register;