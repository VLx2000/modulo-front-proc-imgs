import { ListaUsers, Voltar } from "components";
import { useEffect, useState } from "react";
import { Container, FormControl, Spinner } from "react-bootstrap";
import { alertMsgSwitch } from "utils/alertMsg";
import axiosInstance from "utils/axios";

const teste = [
    {
        name: 'teste1',
        id: 1,
        email: 'teste@gmail.com',
        desativado: false
    },
    {
        name: 'teste2',
        id: 2,
        email: 'teste@gmail.com',
        desativado: false
    },
    {
        name: 'teste3',
        id: 3,
        email: 'teste@gmail.com',
        desativado: true
    },
];

const Dashboard = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const [error, setError] = useState<any | null>(null);
    const [showError, setShowError] = useState(false);

    const [users, setUsers] = useState(teste);
    const [allUsers, setAllUsers] = useState(teste);


    /* useEffect(() => {
        setLoading(true);
        axiosInstance
            .get('/user/')
            .then((res) => {
                setUsers(res.data);
                setAllUsers(res.data);
            })
            .catch((error) => {
                const code = error?.response?.status;
                setError(alertMsgSwitch(code, 'Erro ao obter users', setError));
                setShowError(true);
            })
            .finally(() => setLoading(false));
    }, []); */


    function handleFilter(event: React.ChangeEvent<HTMLInputElement>) {
        const filter = event.target.value;
        if (filter === '') {
            setUsers(allUsers);
        }
        else {
            setUsers(allUsers.filter(image =>
                image.id.toString().includes(filter))
            );
        }
    }

    return (
        <Container>
            <Voltar caminho={`/admin`} />
            {loading && <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
            }
            {showError && error}
            <h3 className="titulo-pag">Usuários do sistema</h3>
            <header className="header">
                <FormControl
                    type="search"
                    placeholder="filtrar user por id"
                    className="me-2"
                    aria-label="Search"
                    onChange={handleFilter}
                />
            </header>
            {!loading && <ListaUsers usuarios={users} />}
        </Container>);
};

export default Dashboard;