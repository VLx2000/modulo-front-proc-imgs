import { useContext, useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { AuthContext } from "contexts/auth";
import { Link } from "react-router-dom";
const logo = require('../../assets/logo.ico');

function Login() {

    const context = useContext(AuthContext);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const submitHandler = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        context?.login!(email, password);
    };

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
                        {context?.loading ?
                            <div className="d-flex justify-content-center">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div> :
                            <Form onSubmit={submitHandler}>
                                <h3 className="titulo-pag">Login</h3>
                                {context?.error && <Alert variant="danger">Email ou senha incorretos!</Alert>}
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
                                    <Link to={'/reset'}>Esqueci minha senha</Link>
                                </Form.Group>
                                <Form.Group controlId="entrar" className="mb-3 div-botao">
                                    <Button type="submit">Entrar</Button>
                                </Form.Group>
                                <div>Não tem uma conta? <Link to={'/register'}>Registrar-se</Link></div>
                            </Form>}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Login;