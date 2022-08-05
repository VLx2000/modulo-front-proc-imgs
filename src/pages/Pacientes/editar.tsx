import { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "utils/axios";
import { Voltar } from "components";
import { Paciente } from "types/pacientes";

// component q exibe form para editar paciente
function EditarPaciente() {

    const params = useParams();
    const navigate = useNavigate();

    const [erro, setErro] = useState<string>('');
    const [carregado, setCarregado] = useState<Boolean>(false);
    const [paciente, setPaciente] = useState<Paciente>();

    const [apelido, setApelido] = useState<string>('');
    const [sexo, setSexo] = useState<string>('');
    const [nascimento, setNascimento] = useState<Date>();

    useEffect(() => {
        axiosInstance
            .get('/pacientes/' + params.idPaciente)
            .then((res) => {
                const data = res.data as Paciente;
                setPaciente(data);
                setApelido(data?.apelido);
                setSexo(data?.sexo);
                setNascimento(data?.nascimento);
                //console.table(data)
                setCarregado(true);
            })
            .catch((error) => {
                const code = error?.response?.status;
                console.log(code)
                switch (code) {
                    case 401:
                        setErro("Você não pode acessar esse paciente");
                        break;
                    default:
                        setErro("Ops. Algo deu errado");
                        break;
                }
            });
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
                console.log('epa')
            });
    };

    const deletar = async () => {
        axiosInstance
            .delete('/pacientes/' + params.idPaciente)
            .then((res) => {
                navigate('/');
            })
            .catch((error) => {
                console.log('epa')
            });
    };

    return (
        <Container>
            <Voltar caminho={`/`} />
            {erro && <Alert variant="danger">{erro}</Alert>}
            {carregado &&
                <Container className="login-container">
                    <Form onSubmit={submitHandler}>
                        <h3 className="titulo-pag">Editar paciente {paciente?.id}</h3>
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
                            <Button variant="outline-danger" onClick={deletar}>Apagar paciente</Button>
                        </Form.Group>
                    </Form>
                </Container>
            }
        </Container>
    );
}

export default EditarPaciente;