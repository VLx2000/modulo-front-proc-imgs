import { useEffect, useState } from "react";
import { Container, Button, FormControl, Tabs, Tab } from "react-bootstrap";
import { Image } from 'types/images';
import { ListaImgs, Voltar } from "components";
import { useParams, Link } from 'react-router-dom';
import axiosInstance from "utils/axios";

// pag q sera acessada ao clicar em algum paciente
function ListaImagens() {

    const params = useParams();

    const [carregado, setCarregado] = useState<Boolean>(false);
    const [images, setImages] = useState<Image[]>([]);
    const [allImages, setAllImages] = useState<Image[]>([])

    useEffect(() => {
        axiosInstance
            .get('/' + params.idPaciente)
            .then((res) => {
                const data = res.data as Image[];
                setImages(data);
                setAllImages(data);
                //console.table(data)
                setCarregado(true);
            })
            .catch((err) => alert("Erro ao carregar imagens" + err));
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
            <Voltar caminho={`/`} />
            <h3 className="titulo-pag">Imagens do paciente {params.idPaciente}</h3>
            <header className="header-imagens">
                <FormControl
                    type="search"
                    placeholder="filtrar imagem por id"
                    className="me-2"
                    aria-label="Search"
                    onChange={handleFilter}
                />
                {/* Ir para formulario de upload de imagens */}
                <div className="div-botao-novo-upload">
                    <Link to={`/paciente/${params.idPaciente}/upload`}>
                        <Button>Fazer upload de nova imagem</Button>
                    </Link>
                </div>
            </header>
            {carregado &&
                <Tabs defaultActiveKey="principais" id="tab-arquivo">
                    <Tab eventKey="principais" title="Minhas imagens">
                        {/* Listagem de imagens n arquivadas */}
                        <ListaImgs images={images.filter(img => !img.arquivado)} arquivado={false} />
                    </Tab>
                    <Tab eventKey="arquivados" title="Arquivadas">
                        {/* Listagem de imagens arquivadas */}
                        <ListaImgs images={images.filter(img => img.arquivado)} arquivado={true} />
                    </Tab>
                </Tabs>
            }
        </Container>
    );
}

export default ListaImagens;