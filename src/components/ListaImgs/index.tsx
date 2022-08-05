import { useState } from "react";
import { Badge, Button, ButtonGroup, Dropdown, Modal, Table } from "react-bootstrap";
import { Image } from "types/images";
import axiosInstance from "utils/axios";

type Props = {
    images: Image[];
    arquivado: boolean;
}

// component q exibe a lista de imagens de determinado paciente
function ListaImgs({ images, arquivado }: Props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // para arquivar/desarquivar img
    function changeFileVisibility(id: Number) {
        axiosInstance
            .put('/images/archive/' + id)
            .then((res) => {
                //alert("File Hide success");
                document.location.reload();
            })
            .catch((err) => alert("Erro ao modificar imagem" + err));
    }

    // apaga imagem
    function deleteFile(id: Number) {
        axiosInstance
            .delete('/images/' + id)
            .then((res) => {
                //alert("File Hide success");
                document.location.reload();
            })
            .catch((err) => alert("Erro ao deletar imagem" + err));
    }

    // atualiza aquisicao da imagem
    function atualizarAquisicao(aquisicao: string, id: Number) {
        //console.log(aquisicao)
        axiosInstance
            .put('/images/update/' + id, { aquisicao: new Date(aquisicao).toISOString() })
            .then((res) => {
                document.location.reload();
            })
            .catch((err) => alert("Erro ao atualizar aquisicao" + err));
    }

    return (
        <div className="lista">
            <Table striped bordered responsive>
                <thead>
                    <tr>
                        <th>#id</th>
                        <th>Status</th>
                        <th>Data de aquisição</th>
                        <th>Tipo</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {images.map(image => (
                        <tr key={image.id}>
                            <td>{image.id}</td>
                            <td>
                                <Badge pill bg="dark" text="light">Processamento ainda não realizado</Badge>{' '}
                            </td>
                            <td>
                                <input type="date" value={image.aquisicao.toString().slice(0,10) || ''}
                                    onChange={(e) => atualizarAquisicao(e.target.value, image.id)} />
                            </td>
                            <td>{image.tipo}</td>
                            <td>
                                <Dropdown as={ButtonGroup}>
                                    <Button variant="info">Iniciar processamento</Button>
                                    <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => changeFileVisibility(image.id)}>
                                            {image.arquivado ? 'Desarquivar' : 'Arquivar'}</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleShow()} className='opcao-remover'>
                                            Remover</Dropdown.Item>
                                        <Modal
                                            show={show}
                                            onHide={handleClose}
                                            backdrop="static"
                                            keyboard={false}
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title>Atenção!</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                A imagem será a apagada da lista de imagens, 
                                                mas permanecerá nos servidores, 
                                                assim como exposto nos termos de uso.
                                                Não é possível desfazer tal ação. 
                                                Você tem certeza que deseja apagar?
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>Voltar</Button>
                                                <Button variant="outline-danger" onClick={() => deleteFile(image.id)}>Apagar</Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <span> </span>
                                <Button disabled variant="success">Resultados</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className='divMsg'><p>{images.length} imagem(ns) {arquivado && 'arquivadas'}</p></div>
        </div>
    );
}

export default ListaImgs;