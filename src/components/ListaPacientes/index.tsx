import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Paciente } from "types/pacientes";

type Props = {
    pacientes: Paciente[];
}

// component q exibe a lista de imagens de determinado paciente
function ListaPacientes({ pacientes }: Props) {

    return (
        <div className="lista">
            <Table striped borderless responsive>
                <thead>
                    <tr>
                        <th>#id</th>
                        <th>Apelido</th>
                        <th>Sexo</th>
                        <th>Idade</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes.map(paciente => (
                        <tr key={paciente.id}>
                            <td>{paciente.id}</td>
                            <td>{paciente.nome}</td>
                            <td>{paciente.sexo}</td>
                            <td>{paciente.idade}</td>
                            <td>
                                <Link to={`/paciente/editar/${paciente.id}`}>
                                    <Button variant="secondary">Editar</Button>
                                </Link>
                                <Link to={`/paciente/${paciente.id}`}>
                                    <Button variant="primary">Imagens</Button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className='divMsg'><p>{pacientes.length} paciente(s)</p></div>
        </div>
    );
}

export default ListaPacientes;