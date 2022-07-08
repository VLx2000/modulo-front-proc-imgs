import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//pag q lista os pacientes
function Pacientes() {

    const pacientes = [
        {
            id: 1,
            nome: "cleiton",
        },
        {
            id: 8,
            nome: "jose",
        },
        {
            id: 12,
            nome: "tabata",
        },
        {
            id: 16,
            nome: "clara",
        },
    ];

    return (
        <Container>
            {pacientes.map(paciente => (
                <div key={paciente.id}>
                    <span>{paciente.id} </span>
                    <span>{paciente.nome} </span>
                    <Link to={`/paciente/${paciente.id}`}>
                        <span>Upload</span>
                    </Link>
                </div>
            ))}
        </Container>
    );
}

export default Pacientes;