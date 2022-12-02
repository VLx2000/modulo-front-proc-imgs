import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "utils/axios";
import { Voltar } from "components";
import { alertMsgSwitch } from "utils/alertMsg";

// component q exibe form para criar novo paciente
function NovoPaciente() {

    const navigate = useNavigate();

    const [apelido, setApelido] = useState<string>('');
    const [sexo, setSexo] = useState<string>('');
    const [nascimento, setNascimento] = useState<string>('');

    const [error, setError] = useState<any | null>(null);
    const [showError, setShowError] = useState(false);

    const submitHandler = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        axiosInstance
            .post('/pacientes',
                JSON.stringify({ apelido, sexo, nascimento }),
                { headers: { "Content-Type": 'application/json', } }
            )
            .then((res) => {
                navigate('/');
            })
            .catch((error) => {
                const code = error?.response?.status;
                setError(alertMsgSwitch(code, 'Erro ao criar paciente', setError));
                setShowError(true);
            });
    };

    return (
        <Container>
            <Voltar caminho={`/`} />
            <Container className="login-container">
                <Form onSubmit={submitHandler}>
                    <h3 className="titulo-pag">Adicionar novo paciente</h3>
                    {showError && error}
                    <Form.Group controlId="newNome" className="mb-3">
                        <Form.Label column sm="6">Apelido</Form.Label>
                        <Form.Control
                            onChange={(e) => setApelido(e.target.value as string)}
                            />
                    </Form.Group>
                    <Form.Group controlId="newEmail" className="mb-3">
                        <Form.Label column sm="6">Sexo</Form.Label>
                        <Form.Select
                            defaultValue="Não declarado"
                            required
                            onChange={(e) => setSexo(e.target.value as string)}>
                            <option>Não declarado</option>
                            <option>Masculino</option>
                            <option>Feminino</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="newSenha" className="mb-3">
                        <Form.Label column sm="6">Data de nascimento</Form.Label>
                        <Form.Control
                            required
                            type="date"
                            onChange={(e) => setNascimento(e.target.value as string)}
                            />
                    </Form.Group>
                    <Form.Group controlId="criar" className="mb-3 div-botao-entrar">
                        <Button type="submit">Criar paciente</Button>
                    </Form.Group>
                </Form>
            </Container>
        </Container>
    );
}

export default NovoPaciente;