import { Voltar } from "components";
import { useState } from "react";
import { Form, Button, Alert, Container, Spinner } from "react-bootstrap";
import axiosInstance from "utils/axios";
import './styles.css';

const ResetPasswordRequest = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<{ data: string } | null>(null)

  const onSubmit = async (e) => {
    e.preventDefault();
    setSuccess('')
    setLoading(true)
    await axiosInstance.post('/users/resetPasswordRequest', { email })
    .then(res => {
        setSuccess("Confira seu email para resetar sua senha!");
    })
    .catch(err => setError({ data: err.response.data?.message } || {data: 'Um erro inesperado occoreu'}))
    .finally(() => setLoading(false))
    
  };

  return (
    <Container className="resetpass-container">
          {loading ?
              <div className="d-flex justify-content-center">
                  <Spinner animation="border" role="status">
                      <span className="visually-hidden">Carregando...</span>
                  </Spinner>
              </div> :
              <Form onSubmit={onSubmit}>
                  <Voltar caminho={`/`} />
                  <h3 className="titulo-pag mb-4 mt-4">Recuperar senha</h3>
                  {error && <Alert variant="danger">{error?.data}</Alert>}
                  {success && <Alert variant="success">{success}</Alert>}
                  <Form.Group controlId="email" className="mb-5">
                      <Form.Label column sm="6">Email</Form.Label>
                      <Form.Control
                          required
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                      />
                  </Form.Group>
                  <Form.Group controlId="entrar" className="mb-2 div-botao-enviar">
                      <Button type="submit">Enviar</Button>
                  </Form.Group>
              </Form>}
      </Container>
  );
};

export default ResetPasswordRequest;
