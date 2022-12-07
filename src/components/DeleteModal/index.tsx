
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import axiosInstance from "utils/axios"

interface DeleteModalProps {
    scripts: any,
    setScripts: React.Dispatch<React.SetStateAction<any>>,
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
    showDeleteModal: boolean,
    scriptName: string
}

export default function DeleteModal({scripts, setScripts, showDeleteModal, setShowDeleteModal, scriptName}: DeleteModalProps) {
    return (
        <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Deletar {scriptName} ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Deseja mesmo deletar {scriptName} ? Isso não pode ser revertido.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                    Fechar
                </Button>
                <Button 
                    variant="danger"
                    onClick={() => { // Colocar um loading ?
                        axiosInstance.delete(`/processamentos/scripts/${scriptName}`)
                            .then((response) => {
                                console.log(response.data)
                                delete scripts[scriptName]
                                setScripts({...scripts})
                                setShowDeleteModal(false)
                            })
                    }}
                >
                    Deletar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}