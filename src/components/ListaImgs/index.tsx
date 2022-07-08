import { useState } from "react";
import { Badge, Button, ButtonGroup, Dropdown, Modal, Table } from "react-bootstrap";
import { Image } from "types/images";
import axiosInstance from "utils/axios";
import './styles.css';

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
            .put('/archive/' + id)
            .then((res) => {
                //alert("File Hide success");
                document.location.reload();
            })
            .catch((err) => alert("Erro ao modificar imagem" + err));
    }

    // apaga imagem
    function deleteFile(id: Number) {
        axiosInstance
            .delete('/' + id)
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
            .put('/update/' + id, { aquisicao: aquisicao })
            .then((res) => {
                document.location.reload();
            })
            .catch((err) => alert("Erro ao atualizar aquisicao" + err));
    }

    return (
        <div className="lista-imagens">
            <Table striped bordered responsive>
                <thead>
                    <tr>
                        <th>#id</th>
                        <th>Data de aquisição</th>
                        <th>Tipo</th>
                        <th>Status</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {images.map(image => (
                        <tr key={image.id}>
                            <td>{image.id}/Paciente: {image.idPaciente}</td>
                            <td>
                                <input type="date" value={image.aquisicao} className="aquisicao"
                                    onChange={(e) => atualizarAquisicao(e.target.value, image.id)} />
                            </td>
                            <td>{image.tipo}</td>
                            <td>
                                <Badge pill bg="dark" text="light">Processamento não iniciado</Badge>{' '}
                            </td>
                            <td className="botao-download">
                                <Dropdown as={ButtonGroup}>
                                    <Button variant="success">Iniciar processamento</Button>
                                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
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