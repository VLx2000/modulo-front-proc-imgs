import { ListaPacientes, Voltar } from 'components';
import { Button, Container, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Paciente } from 'types/pacientes';

//pag q lista os pacientes
function Pacientes() {

    const pacientes: Paciente[] = [
        {
            id: 1,
            nome: "cleiton",
            sexo: 'masculino',
            idade: '13 anos'
        },
        {
            id: 8,
            nome: "-",
            sexo: 'masculino',
            idade: '29 anos'
        },
        {
            id: 12,
            nome: "tabata",
            sexo: 'feminino',
            idade: '-'
        },
        {
            id: 16,
            nome: "-",
            sexo: '-',
            idade: '67 anos'
        },
    ];

    return (
        <Container>
            <Voltar caminho={'/'} />
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
                    <Link to={`/paciente`}>
                        <Button>Adicionar novo paciente</Button>
                    </Link>
                </div>
            </header>
            <ListaPacientes pacientes={pacientes} />
        </Container>
    );
}

export default Pacientes;