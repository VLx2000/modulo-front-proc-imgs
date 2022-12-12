import { ListaUsers, Voltar } from "components";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Container, FormControl, Spinner } from "react-bootstrap";
import { alertMsgSwitch } from "utils/alertMsg";
import axiosInstance from "utils/axios";

const Dashboard = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<"all" | "enableds" | "disableds">("all");

    const [error, setError] = useState<any | null>(null);
    const [showError, setShowError] = useState(false);

    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);


    useEffect(() => {
        setLoading(true);
        axiosInstance
            .get('/users/getUsers')
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
    }, []);


    function handleFilter(event: React.ChangeEvent<HTMLInputElement>) {
        const filter = event.target.value;
        setCurrentPage("all");
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
            <h3 className="titulo-pag">Usuários do sistema</h3>
            <header className="header">
                <FormControl
                    type="search"
                    placeholder="filtrar user por id"
                    className="me-2"
                    aria-label="Search"
                    onChange={handleFilter}
                />
                <ButtonGroup aria-label="Basic example" className="div-botao-novo">
                    <Button
                        variant='outline-secondary'
                        onClick={() => {
                            setCurrentPage("all");
                            setUsers(allUsers);
                        }}
                        active={currentPage === "all"}
                    >
                        Todos
                    </Button>
                    <Button
                        variant='outline-primary'
                        onClick={() => {
                            setCurrentPage("enableds");
                            setUsers(allUsers.filter(user =>
                                user.hidden === false));
                        }}
                        active={currentPage === "enableds"}
                    >
                        Ativos
                    </Button>
                    <Button
                        variant='outline-danger'
                        onClick={() => {
                            setCurrentPage("disableds");
                            setUsers(allUsers.filter(user =>
                                user.hidden === true));
                        }}
                        active={currentPage === "disableds"}
                    >
                        Desativados
                    </Button>
                </ButtonGroup>
            </header >
            {showError && error}
            {!loading && <ListaUsers usuarios={users} />}
        </Container >);
};

export default Dashboard;