import { useEffect, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "utils/axios";
import { Voltar } from "components";
import { Paciente } from "types/pacientes";
import { alertMsgSwitch } from "utils/alertMsg";

// component q exibe form para editar paciente
function EditarPaciente() {

    const params = useParams();
    const navigate = useNavigate();

    const [carregado, setCarregado] = useState<Boolean>(false);
    const [paciente, setPaciente] = useState<Paciente>();

    const [apelido, setApelido] = useState<string>('');
    const [sexo, setSexo] = useState<string>('');
    const [nascimento, setNascimento] = useState<Date>();

    const [error, setError] = useState<any | null>(null);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        axiosInstance
            .get('/pacientes/' + params.idPaciente)
            .then((res) => {
                const data = res.data as Paciente;
                setPaciente(data);
                setApelido(data?.apelido);
                setSexo(data?.sexo);
                setNascimento(data?.nascimento);
            })
            .catch((error) => {
                const code = error?.response?.status;
                setError(alertMsgSwitch(code, 'Paciente não encontrado', setError));
                setShowError(true);
            })
            .finally(() => setCarregado(true));
    }, [paciente?.apelido, paciente?.nascimento, paciente?.sexo, params.idPaciente]);

    const submitHandler = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        axiosInstance
            .put('/pacientes/' + params.idPaciente,
                JSON.stringify({ apelido, sexo, nascimento }),
                { headers: { "Content-Type": 'application/json', } }
            )
            .then((res) => {
                navigate('/');
            })
            .catch((error) => {
                const code = error?.response?.status;
                setError(alertMsgSwitch(code, 'Erro ao editar paciente', setError));
                setShowError(true);
            });
    };

    const deletar = async () => {
        axiosInstance
            .delete('/pacientes/' + params.idPaciente)
            .then((res) => {
                navigate('/');
            })
            .catch((error) => {
                const code = error?.response?.status;
                setError(alertMsgSwitch(code, 'Erro ao deletar paciente', setError));
                setShowError(true);
            });
    };

    return (
        <Container>
            <Voltar caminho={`/`} />
            {carregado ?
                <Container className="login-container">
                    <Form onSubmit={submitHandler}>
                        <h3 className="titulo-pag">Editar paciente {paciente?.id}</h3>
                        {showError && error}
                        <Form.Group controlId="apelido" className="mb-3">
                            <Form.Label column sm="6">Apelido</Form.Label>
                            <Form.Control
                                defaultValue={apelido}
                                onChange={(e) => setApelido(e.target.value as string)}
                            />
                        </Form.Group>
                        <Form.Group controlId="sexo" className="mb-3">
                            <Form.Label column sm="6">Sexo</Form.Label>
                            <Form.Select
                                defaultValue={sexo}
                                required
                                onChange={(e) => setSexo(e.target.value as string)}>
                                <option>Não declarado</option>
                                <option>Masculino</option>
                                <option>Feminino</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="data" className="mb-3">
                            <Form.Label column sm="6">Data de nascimento</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                defaultValue={nascimento?.toString().slice(0, 10)}
                                onChange={(e) => setNascimento(e.target.value as unknown as Date)}
                            />
                        </Form.Group>
                        <Form.Group controlId="criar" className="mb-3 div-botao-entrar">
                            <Button variant="secondary" type="submit">Salvar</Button>
                            <span> </span>
                            <Button variant="outline-danger" onClick={deletar}>Apagar paciente</Button>
                        </Form.Group>
                    </Form>
                </Container>
                : <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }
        </Container>
    );
}

export default EditarPaciente;