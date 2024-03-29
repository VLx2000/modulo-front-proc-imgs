import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Image } from "types/images";
import { alertMsgSwitch } from "utils/alertMsg";
import axiosInstance from "utils/axios";

type Props = {
    images: Image[];
    arquivado: boolean;
}

// component q exibe a lista de imagens de determinado paciente
function ListaImgs({ images, arquivado }: Props) {

    const params = useParams();
    const [show, setShow] = useState(false);

    const [error, setError] = useState<any | null>(null);
    const [showError, setShowError] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // para arquivar/desarquivar img
    function changeFileVisibility(id: Number) {
        axiosInstance
            .put('/images/' + params.idPaciente + '/archive/' + id)
            .then((res) => {
                document.location.reload();
            })
            .catch((error) => {
                const code = error?.response?.status;
                setError(alertMsgSwitch(code, 'Erro ao editar imagem', setError));
                setShowError(true);
            });
    }

    // apaga imagem
    function deleteFile(id: Number) {
        axiosInstance
            .delete('/images/' + params.idPaciente + '/delete/' + id)
            .then((res) => {
                document.location.reload();
            })
            .catch((error) => {
                const code = error?.response?.status;
                setError(alertMsgSwitch(code, 'Erro ao deletar imagem', setError));
                setShowError(true);
            });
    }

    // atualiza aquisicao da imagem
    function atualizarAquisicao(aquisicao: string, id: Number) {
        axiosInstance
            .put('/images/' + params.idPaciente + '/update/' + id, { aquisicao: new Date(aquisicao).toISOString() })
            .then((res) => {
                document.location.reload();
            })
            .catch((error) => {
                const code = error?.response?.status;
                setError(alertMsgSwitch(code, 'Erro ao atualizar aquisição', setError));
                setShowError(true);
            });
    }

    return (
        <div className="lista">
            {showError && error}
            <Table striped bordered responsive>
                <thead>
                    <tr>
                        <th>#id</th>
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
                                <input type="date" value={image.aquisicao.toString().slice(0, 10) || ''}
                                    onChange={(e) => atualizarAquisicao(e.target.value, image.id)} />
                            </td>
                            <td>{image.tipo}</td>
                            <td className="div-botoes-lista-imgs">
                                <div>
                                    <Button onClick={() => changeFileVisibility(image.id)} variant="outline-secondary">
                                        {image.arquivado ? 'Desarquivar' : 'Arquivar'}</Button>
                                    <span> </span>
                                    <Button onClick={() => handleShow()} variant="outline-danger">
                                        Remover</Button>
                                </div>
                                <span> </span>
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
                                <span> </span>
                                <Link to={`/imagens/${params.idPaciente}/processamentos/${image.id}`} state={{ caminho: image.caminho }}>
                                    <Button variant="success">Ver/Executar Processamento</Button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ListaImgs;