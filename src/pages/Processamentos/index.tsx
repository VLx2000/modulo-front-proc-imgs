import { useEffect, useState } from "react";
import { Container, Button, Spinner, Alert } from "react-bootstrap";
import { Processamento } from 'types/processamentos';
import { ListaProcs, Voltar } from "components";
import { useParams, useLocation, Link } from 'react-router-dom';
import axiosInstance from "utils/axios";

// pag q sera acessada ao clicar em alguma imagem
function Processamentos() {

    const params = useParams();
    const location = useLocation()
    const { caminho } = location.state as any;

    const [carregado, setCarregado] = useState<Boolean>(false);
    const [processamentos, setProcessamentos] = useState<Processamento[]>([]);
    const [message, setMessage] = useState<string>('');

    const msgSucesso = 'Processamento concluído! Recarregue a pág para visualizar o resultado.';
    const msgProcessando = 'Processamento iniciado! Recarregue a pág para acompanhar o processo.';
    const msgErro = 'Ops. Algo deu errado!';

    useEffect(() => {
        axiosInstance
            .get('/processamentos/execution/image/' + params.idImage)
            .then((res) => {
                const data = res.data as Processamento[];
                setProcessamentos(data);
                //console.table(data)
                setCarregado(true);
            })
            .catch((err) => alert("Erro ao carregar processamentos" + err));
    }, [params.idImage]);

    function processar() {
        let formData = new FormData();
        let script = [
            { filename: `uploads/salvos/${caminho}`, },
            { },
            { name: 'saida' }
        ]
        formData.append('inputs', JSON.stringify(script));
        formData.append('idImage', params?.idImage!);
        console.log(formData)
        setMessage(msgProcessando);
        axiosInstance
            .post('/processamentos/execution/skull_striping', formData, {
                headers: { 'content-type': 'multipart/form-data' }
            }).then((res) => {
                setMessage(msgSucesso);
            })
            .catch((error) => {
                const code = error?.response?.data?.code;
                switch (code) {
                    default:
                        setMessage(msgErro);
                        break;
                }
            })
    }

    function corMsg(){
        if (message === msgSucesso)
          return 'success';
        else if (message === msgErro)
            return 'danger';
        else return 'warning';
    }

    return (
        <Container className="processamentos-container">
            <Voltar caminho={`/imagens/${params.idPaciente}`} />
            <h3 className="titulo-pag">Processamentos do paciente {params.idPaciente} (Imagem {params.idImage})</h3>
            <header className="header">
                {/* Abrir modal de novo processamento */}
                <div className="div-botao-novo">
                    <Button onClick={() => processar()}>Novo processamento</Button>
                </div>
            </header>
            {message && //caso em q terminou o upload ou houve algum erro
                <Alert variant={corMsg()}>
                    <span>{message + ' '}</span>
                    <Link reloadDocument to={""}>
                        <span className="recarregar">Recarregar página</span>
                    </Link>
                </Alert>
            }
            {carregado ?
                <ListaProcs processamentos={processamentos}/>
                : <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }
        </Container>
    );
}

export default Processamentos;