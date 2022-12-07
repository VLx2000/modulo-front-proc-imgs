
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import axiosInstance from "utils/axios"

interface EnableModalProps {
    scripts: any,
    enabledScripts: any,
    disabledScripts: any,
    setScripts: React.Dispatch<React.SetStateAction<any>>,
    setShowEnableModal: React.Dispatch<React.SetStateAction<boolean>>,
    showEnableModal: boolean,
    scriptName: string
}

export default function DeleteModal({scripts, enabledScripts, disabledScripts, setScripts, showEnableModal, setShowEnableModal, scriptName}: EnableModalProps) {
    return (
        <Modal
            show={showEnableModal}
            onHide={() => setShowEnableModal(false)}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Habilitar {scriptName} ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Deseja mesmo habilitar {scriptName} ? 
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowEnableModal(false)}>
                    Fechar
                </Button>
                <Button 
                    variant="primary"
                    onClick={() => { // Colocar um loading ?
                        axiosInstance.put(`/processamentos/scripts/enable/${scriptName}`)
                            .then((response) => {
                                console.log(response)
                                enabledScripts[scriptName] = {...disabledScripts[scriptName]}
                                delete disabledScripts[scriptName]
                                
                                setScripts({...disabledScripts})
                                setShowEnableModal(false)
                            })
                    }}
                >
                    Habilitar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}