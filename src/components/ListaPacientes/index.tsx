import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Paciente } from "types/pacientes";
import calculaIdade from "utils/calculaIdade";

type Props = {
    pacientes: Paciente[];
}

// component q exibe a lista de pacientes de determinado user
function ListaPacientes({ pacientes }: Props) {

    return (
        <div className="lista row">
            <div className='tam-lista'><p>{pacientes?.length ?? 0} paciente(s)</p></div>
            {pacientes.map(paciente => (
                <div key={paciente.id} className="col-sm-12 col-lg-6 col-xl-4 mb-3">
                    <Card className="card-paciente">
                        <div>
                            <h4>#{paciente.id}</h4>
                            <h6>Apelido: {paciente.apelido || '-'}</h6>
                            <div>Sexo: {paciente.sexo}</div>
                            <div>Idade: {calculaIdade(paciente.nascimento.toString())}</div>
                        </div>
                        <div className="div-botoes-paciente">
                            <Link to={`/editar/${paciente.id}`}>
                                <Button variant="outline-secondary">Editar</Button>
                            </Link>
                            <Link to={`/imagens/${paciente.id}`}>
                                <Button variant="outline-primary">Imagens</Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            ))}
        </div>
    );
}

export default ListaPacientes;