import { useEffect, useState } from "react";
import { Container, Button, FormControl, Tabs, Tab, Spinner } from "react-bootstrap";
import { Image } from 'types/images';
import { ListaImgs, Voltar } from "components";
import { useParams, Link } from 'react-router-dom';
import axiosInstance from "utils/axios";
import { alertMsgSwitch } from "utils/alertMsg";

// pag q sera acessada ao clicar em algum paciente
function ListaImagens() {

    const params = useParams();

    const [carregado, setCarregado] = useState<Boolean>(false);
    const [images, setImages] = useState<Image[]>([]);
    const [allImages, setAllImages] = useState<Image[]>([]);

    const [error, setError] = useState<any | null>(null);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        axiosInstance
            .get('/images/' + params.idPaciente)
            .then((res) => {
                const data = res.data as Image[];
                setImages(data);
                setAllImages(data);
            })
            .catch((error) => {
                const code = error?.response?.status;
                setError(alertMsgSwitch(code, 'Erro ao carregar imagens', setError));
                setShowError(true);
            })
            .finally(() => setCarregado(true));
    }, [params.idPaciente]);

    function handleFilter(event: React.ChangeEvent<HTMLInputElement>) {
        const filter = event.target.value;
        if (filter === '') {
            setImages(allImages);
        }
        else {
            setImages(allImages.filter(image =>
                image.id.toString().includes(filter))
            );
        }
    }

    return (
        <Container className="images-container">
            <Voltar caminho={'/'} />
            <h3 className="titulo-pag">Imagens do paciente {params.idPaciente}</h3>
            <header className="header">
                <FormControl
                    type="search"
                    placeholder="filtrar imagem por id"
                    className="me-2"
                    aria-label="Search"
                    onChange={handleFilter}
                />
                {/* Ir para formulario de upload de imagens */}
                <div className="div-botao-novo">
                    <Link to={`/upload/${params.idPaciente}`}>
                        <Button>Fazer upload de nova imagem</Button>
                    </Link>
                </div>
            </header>
            {showError && error}
            {carregado ?
                <Tabs defaultActiveKey="principais" id="tab-arquivo">
                    <Tab eventKey="principais" title={`Minhas imagens (${images?.filter(img => !img.arquivado).length ?? 0})`}>
                        {/* Listagem de imagens n arquivadas */}
                        <ListaImgs images={images.filter(img => !img.arquivado)} arquivado={false} />
                    </Tab>
                    <Tab eventKey="arquivados" title={`Arquivadas (${images?.filter(img => img.arquivado).length ?? 0})`} >
                        {/* Listagem de imagens arquivadas */}
                        <ListaImgs images={images.filter(img => img.arquivado)} arquivado={true} />
                    </Tab>
                </Tabs>
                : <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }
        </Container>
    );
}

export default ListaImagens;