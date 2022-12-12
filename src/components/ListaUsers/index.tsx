import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Users } from "types/users";
import { alertMsgSwitch } from "utils/alertMsg";
import axiosInstance from "utils/axios";
import './styles.css';

type Props = {
    usuarios: Users[];
}

function ListaUsers({ usuarios }: Props) {

    const [error, setError] = useState<any | null>(null);
    const [showError, setShowError] = useState(false);

    function mudarStatus(idUser: number) {
        axiosInstance
            .put('/users/status/' + idUser)
            .then((res) => {
                document.location.reload();
                //console.log(res.data)
            })
            .catch((error) => {
                const code = error?.response?.status;
                setError(alertMsgSwitch(code, "Erro ao alterar status de user #" + idUser, setError));
                setShowError(true);
            })
    }

    return (
        <div className="lista">
            {showError && error}
            <div className='divMsg'><p>{usuarios?.length ?? 0} usuário(s)</p></div>
            <Table striped bordered responsive>
                <thead>
                    <tr>
                        <th>#id</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Tipo</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(user => (
                        <tr key={user.id}>
                            <td style={{opacity: user.hidden ? '0.5' : '1'}}>{user.id}</td>                      
                            <td style={{opacity: user.hidden ? '0.5' : '1'}}>{user.name}</td>
                            <td style={{opacity: user.hidden ? '0.5' : '1'}}>{user.email}</td>
                            <td style={{opacity: user.hidden ? '0.5' : '1'}}>{user.type}</td>
                            <td>
                                <Button
                                    style={{opacity: '1 !important'}}
                                    variant={user.hidden ? 'success' : 'danger'}
                                    onClick={() => mudarStatus(user.id)}>
                                    {user.hidden ? 'Ativar' : 'Desativar'}
                                </Button>
                            </td>
                        </tr>
                    )).sort((a, b) => (a?.key! as number) - (b?.key! as number))}
                </tbody>
            </Table>
        </div>
    );
}

export default ListaUsers;