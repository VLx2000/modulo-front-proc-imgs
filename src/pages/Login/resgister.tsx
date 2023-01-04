import { useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { AuthContext } from "contexts/auth";
import axiosInstance from "utils/axios";
import { Link } from "react-router-dom";
const logo = require('../../assets/logo.ico');

function Register() {

    const context = useContext(AuthContext);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<Boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [match, setMatch] = useState(false);

    const submitHandler = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (match) {
            setLoading(true);
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
                })
                .finally(() => setLoading(false))
        }
    };

    const termosUso = () =>
        <>
            <span>Li e concordo com os </span><a href='http://google.com'>Termos de Uso</a>
        </>

    useEffect(() => {
        if (password && passwordConfirmation !== password) setMatch(false)
        else setMatch(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [passwordConfirmation])

    return (
        <>
            <div className="login-header">
                <img
                    alt=""
                    src={logo}
                    width="24"
                    height="24"
                    style={{ borderRadius: 6 }}
                    className="d-inline-block align-top"
                />{' '}
                Biomedical Image Processing
            </div>
            <Container>
                <Row className="vh-90 justify-content-md-center d-flex align-items-center">
                    <Col xs lg="5">
                        {!loading ?
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
                                <Form.Group controlId="passwordConfirmation" className="mb-5">
                                    <Form.Label column sm="6">
                                        Confirmar senha
                                    </Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        isInvalid={!match}
                                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        As senhas não conferem
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="criar" className="mb-3 div-botao">
                                    <Form.Check
                                        type={'checkbox'}
                                        id={`default-checkbox`}
                                        label={termosUso()}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="criar" className="mb-3 div-botao">
                                    <Button type="submit" disabled={!match}>Criar conta</Button>
                                </Form.Group>
                                <div>Já tem uma conta? <Link to={'/login'}>Logar-se</Link></div>
                            </Form>
                            : <div className="d-flex justify-content-center">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Carregando...</span>
                                </Spinner>
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Register;