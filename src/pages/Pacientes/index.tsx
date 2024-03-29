import { ListaPacientes } from 'components';
import { useEffect, useState } from 'react';
import { Button, Col, Container, FormControl, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Paciente } from 'types/pacientes';
import { alertMsgSwitch } from 'utils/alertMsg';
import axiosInstance from 'utils/axios';

//pag q lista os pacientes
function Pacientes() {

    const [carregado, setCarregado] = useState<Boolean>(false);
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [allPacientes, setAllPacientes] = useState<Paciente[]>([]);

    const [error, setError] = useState<any | null>(null);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        axiosInstance
            .get('/pacientes/')
            .then((res) => {
                const data = res.data as Paciente[];
                setPacientes(data);
                setAllPacientes(data);
            })
            .catch((error) => {
                const code = error?.response?.status;
                setError(alertMsgSwitch(code, 'Erro ao carregar pacientes', setError));
                setShowError(true);
            })
            .finally(() => setCarregado(true));
    }, []);

    function handleFilter(event: React.ChangeEvent<HTMLInputElement>) {
        const filter = event.target.value;
        if (filter === '') {
            setPacientes(allPacientes);
        }
        else {
            setPacientes(allPacientes.filter(paciente =>
                paciente.id.toString().includes(filter) ||
                paciente.apelido.toString().includes(filter)
            )
            );
        }
    }

    return (
        <Container>
            <h3 className="titulo-pag">Lista de Pacientes</h3>
            {showError && error}
            <header className="header mt-5 mb-5">
                <Row>
                    <Col sm={8}>
                        <FormControl
                            type="search"
                            placeholder="filtrar por id ou apelido"
                            className="me-2"
                            aria-label="Search"
                            onChange={handleFilter}
                        />
                    </Col>
                    {/* Ir para formulario de criação de pacientes */}
                    <Col sm={4} className="div-botao-add-novo">
                        <Link to={'/adicionar'}>
                            <Button>Adicionar novo paciente</Button>
                        </Link>
                    </Col>
                </Row>
            </header>
            {carregado ?
                <ListaPacientes pacientes={pacientes} />
                : <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }
        </Container>
    );
}

export default Pacientes;