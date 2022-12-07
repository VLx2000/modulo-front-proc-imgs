import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'


interface ScriptCardProps {
    showModal: (readOnlyMode: boolean, modalTitle: string) => void,
    showDeleteModal: () => void,
    showEnableModal: () => void,
    showDisableModal: () => void,
    scriptName: string,
    setUpdateScriptName: (newScriptName: string) => void,
    showMoreInfoBtn: boolean,
    showUpdateBtn: boolean,
    showDeleteBtn: boolean,
    showDisableBtn: boolean,
    showEnableBtn: boolean
}

export default function ScriptCard({showModal, showDeleteModal, showDisableModal, showEnableModal, scriptName, setUpdateScriptName, showMoreInfoBtn, showUpdateBtn, showDeleteBtn, showDisableBtn, showEnableBtn}: ScriptCardProps) {
    return (
        <div>
            <Card>
                <Card.Header as="h5">{scriptName}</Card.Header>
                <Card.Body>
                    <div className="d-grid gap-2">
                        {showMoreInfoBtn && 
                            <Button 
                                variant="primary" 
                                size="sm" 
                                onClick={() => {
                                        showModal(true, `Visualizando ${scriptName}`)
                                        setUpdateScriptName("")
                                    }
                                }
                            >
                                Mais informações
                            </Button>
                        }
                        {showUpdateBtn && 
                            <Button 
                                variant="primary" 
                                size="sm" 
                                onClick={() => {
                                        showModal(false, `Editando ${scriptName}`)
                                        setUpdateScriptName(scriptName)
                                    }
                                }
                            >
                                Atualizar
                            </Button>
                        }
                        {showDisableBtn &&
                            <Button 
                                variant="danger"
                                size="sm"
                                onClick={() => showDisableModal()} 
                            >
                                Desabilitar
                            </Button>
                        }
                        {showEnableBtn && 
                        <Button 
                            variant="primary"
                            size="sm"
                            onClick={() => showEnableModal()} 
                        >
                            Habilitar
                        </Button>
                        }
                        {showDeleteBtn &&
                            <Button 
                                variant="danger"
                                size="sm"
                                onClick={() => showDeleteModal()} 
                            >
                                Deletar
                            </Button>
                        }
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}