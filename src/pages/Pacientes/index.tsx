import { ListaPacientes } from 'components';
import { useEffect, useState } from 'react';
import { Button, Container, FormControl, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Paciente } from 'types/pacientes';
import { alertMsgSwitch } from 'utils/alertMsg';
import axiosInstance from 'utils/axios';

//pag q lista os pacientes
function Pacientes() {

    const [carregado, setCarregado] = useState<Boolean>(false);
    const [pacientes, setPacientes] = useState<Paciente[]>([]);

    const [error, setError] = useState<any | null>(null);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        axiosInstance
            .get('/pacientes/')
            .then((res) => {
                const data = res.data as Paciente[];
                setPacientes(data);
            })
            .catch((error) => {
                const code = error?.response?.status;
                setError(alertMsgSwitch(code, 'Erro ao carregar pacientes', setError));
                setShowError(true);
            })
            .finally(() => setCarregado(true));
    }, []);

    return (
        <Container>
            <h3 className="titulo-pag">Lista de Pacientes</h3>
            <header className="header">
                <FormControl
                    type="search"
                    placeholder="filtrar pacientes por id"
                    className="me-2"
                    aria-label="Search"
                /* onChange={handleFilter} */
                />
                {/* Ir para formulario de criação de pacientes */}
                <div className="div-botao-novo">
                    <Link to={'/adicionar'}>
                        <Button>Adicionar novo paciente</Button>
                    </Link>
                </div>
            </header>
            {showError && error}
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