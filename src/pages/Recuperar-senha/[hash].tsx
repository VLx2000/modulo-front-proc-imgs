import { Voltar } from "components";
import { useState, useMemo, useEffect } from "react";
import { Form, Button, Alert, Container, Spinner } from "react-bootstrap";
import axiosInstance from "utils/axios";
import "./styles.css";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const ResetPassword = () => {
  const hash = useQuery().get("hash");
  const navigation = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [match, setMatch] = useState(true)
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ data: string } | null>(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if(match) {
      setSuccess("");
      setLoading(true);
      await axiosInstance
        .post("/users/resetPassword", { password, token: hash })
        .then(() => {
          navigation('/')
        })
        .catch((err) =>
          setError(
            { data: err.response.data?.message } || {
              data: "Um erro inesperado occoreu",
            }
          )
        )
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (!hash || hash.length !== 64) navigation("/");
  }, [hash, navigation]);

  useEffect(() => {
    if(passwordConfirmation !== password) setMatch(false)
    else setMatch(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordConfirmation])

  return (
    <Container className="resetpass-container">
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </Spinner>
        </div>
      ) : (
        <Form onSubmit={onSubmit}>
          <Voltar caminho={`/`} />
          <h3 className="titulo-pag mb-4 mt-4">Recuperar senha</h3>
          {error && <Alert variant="danger">{error?.data}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          
          <Form.Group controlId="password" className="mb-3">
            <Form.Label column sm="6">
              Senha
            </Form.Label>
            <Form.Control
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="passwordConfirmation" className="mb-5">
            <Form.Label column sm="6">
              Confirmar senha
            </Form.Label>
            <Form.Control
              required
              isInvalid={!match}
              type="password"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              As senhas não conferem
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="entrar" className="mb-2 div-botao-enviar">
            <Button type="submit" disabled={!match}>Enviar</Button>
          </Form.Group>
        </Form>
      )}
    </Container>
  );
};

export default ResetPassword;
