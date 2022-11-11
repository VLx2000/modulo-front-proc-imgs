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
        getProcs(params.idImage);
        let interval = setInterval(() => {
            getProcs(params.idImage);
        }, 2000);
        return () => clearInterval(interval);
    }, [params.idImage]);

    function getProcs(idImage: string) {
        axiosInstance
            .get('/processamentos/execution/image/' + idImage)
            .then((res) => {
                const data = res.data as Processamento[];
                setProcessamentos(data);
                //console.table(data)
                setCarregado(true);
            })
            .catch((err) => alert("Erro ao carregar processamentos" + err));
    }

    return (
        <Container className="processamentos-container">
            <Voltar caminho={`/imagens/${params.idPaciente}`} />
            <h3 className="titulo-pag">Processamentos do paciente {params.idPaciente} (Imagem {params.idImage})</h3>
            {/* Abrir modal de novo processamento */}
            <ModalScripts />
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