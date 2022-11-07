import { useEffect, useState } from "react";
import { Container, Button, Spinner } from "react-bootstrap";
import { Processamento } from 'types/processamentos';
import { ListaProcs, Voltar } from "components";
import { useParams } from 'react-router-dom';
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

    function processar() {
        let formData = new FormData();
        let script = [
            { filename: "uploads/salvos/1/1/58a40ab1f80b133882f4e2408d8ad1a5a90e170fb43d7dbbbbb0d924dcc05f80.nii", },
            { },
            { name: 'saida' }
        ]
        formData.append('inputs', JSON.stringify(script));
        formData.append('idImage', params?.idImage!);
        console.log(formData)

        axiosInstance
            .post('/processamentos/execution/skull_striping', formData, {
                headers: { 'content-type': 'multipart/form-data' }
            }).catch((err) => alert("Erro no processamento" + err));
    }

    return (
        <Container className="processamentos-container">
            <Voltar caminho={`/imagens/${params.idPaciente}`} />
            <h3 className="titulo-pag">Processamentos do paciente {params.idPaciente}, com imagem {params.idImage}</h3>
            <header className="header">
                {/* Abrir modal de novo processamento */}
                <div className="div-botao-novo">
                    <Button onClick={() => processar()}>Novo processamento</Button>
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