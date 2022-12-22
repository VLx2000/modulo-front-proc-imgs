
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import axiosInstance from "utils/axios"

interface EnableModalProps {
    scripts: any,
    enabledScripts: any,
    disabledScripts: any,
    setScripts: React.Dispatch<React.SetStateAction<any>>,
    setShowDisableModal: React.Dispatch<React.SetStateAction<boolean>>,
    showDisableModal: boolean,
    scriptName: string
}

export default function DeleteModal({scripts, enabledScripts, disabledScripts, setScripts, showDisableModal, setShowDisableModal, scriptName}: EnableModalProps) {
    return (
        <Modal
            show={showDisableModal}
            onHide={() => setShowDisableModal(false)}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Desabilitar {scriptName} ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Deseja mesmo desabilitar {scriptName} ? 
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDisableModal(false)}>
                    Fechar
                </Button>
                <Button 
                    variant="primary"
                    onClick={() => { // Colocar um loading ?
                        axiosInstance.put(`/processamentos/admin/scripts/disable/${scriptName}`)
                            .then((response) => {
                                console.log(response)
                                disabledScripts[scriptName] = {...enabledScripts[scriptName]}
                                delete enabledScripts[scriptName]
                                
                                setScripts({...enabledScripts})
                                setShowDisableModal(false)
                            })
                    }}
                >
                    Desabilitar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}