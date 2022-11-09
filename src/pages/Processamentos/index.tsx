import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { Processamento } from 'types/processamentos';
import { ListaProcs, ModalScripts, Voltar } from "components";
import { useParams, } from 'react-router-dom';
import axiosInstance from "utils/axios";

// pag q sera acessada ao clicar em alguma imagem
function Processamentos() {

    const params = useParams();

    const [carregado, setCarregado] = useState<Boolean>(false);
    const [processamentos, setProcessamentos] = useState<Processamento[]>([]);
    

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

    return (
        <Container className="processamentos-container">
            <Voltar caminho={`/imagens/${params.idPaciente}`} />
            <h3 className="titulo-pag">Processamentos do paciente {params.idPaciente} (Imagem {params.idImage})</h3>
            <header className="header">
                {/* Abrir modal de novo processamento */}
                <div className="div-botao-novo">
                    <ModalScripts />
                </div>
            </header>
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