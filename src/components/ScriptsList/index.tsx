import Row from 'react-bootstrap/Row'
import Container from "react-bootstrap/Container"
import ScriptCard from './ScriptCard'
import Spinner from "react-bootstrap/Spinner"
import { ScriptInfo } from 'types/scriptsInfo'

interface ScriptListInterface {
    scripts: object,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    setModalTitle: React.Dispatch<React.SetStateAction<string>>,
    setScriptInfo: React.Dispatch<React.SetStateAction<ScriptInfo>>,
    setFormDisabled: React.Dispatch<React.SetStateAction<boolean>>,
    setDeleteScriptName: React.Dispatch<React.SetStateAction<string>>,
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,

    setEnableScriptName: React.Dispatch<React.SetStateAction<string>>,
    setShowEnableModal: React.Dispatch<React.SetStateAction<boolean>>,

    setDisableScriptName: React.Dispatch<React.SetStateAction<string>>,
    setShowDisableModal: React.Dispatch<React.SetStateAction<boolean>>,

    setUpdateScriptName: (newUpdateScriptName: string) => void,
    filter: string,
    currentPage: "enableds"|"disableds"
}

export default function ScriptList({scripts, setShowModal, setModalTitle, setScriptInfo, setFormDisabled, setDeleteScriptName, setShowDeleteModal, setUpdateScriptName, setDisableScriptName, setEnableScriptName, setShowDisableModal, setShowEnableModal, filter, currentPage}: ScriptListInterface) {
    if (scripts) {
        return (
            <Container fluid="md">
                <Row xl={5} lg={4} md={3} sm={2} className={"gy-5 gx-4"}>
                    {Object.entries(scripts)
                        .filter(([scriptName, scriptInfoRaw]) => (scriptName.startsWith(filter)))
                        .map(([scriptName, scriptInfoRaw]) => {

                            let scriptFilename = (scriptInfoRaw.path)?(scriptInfoRaw.path.split('/').pop()):(null)

                            let scriptInfo: ScriptInfo = {
                                "name": scriptName,
                                "command": scriptInfoRaw.command,
                                "inputs": scriptInfoRaw.inputs,
                                "outputs": (scriptInfoRaw.outputs) ? (scriptInfoRaw.outputs) : ([]),
                                "script": null,
                                "static files": [],
                                "scriptFilename": (scriptInfoRaw.scriptFilename)?(scriptInfoRaw.scriptFilename):(scriptFilename)  // caso exista um serviço que acabou de ser cadastrado, ele não possui path, então ele guarda o scriptFilename
                            }

                            let showModal = (readOnlyMode: boolean, modalTitle: string) => {
                                if (readOnlyMode) {
                                    setFormDisabled(true)
                                } else {
                                    setFormDisabled(false)
                                }
                                setModalTitle(modalTitle)
                                setShowModal(true)
                                setScriptInfo(scriptInfo)
                            }

                            let showDeleteModal = () => {
                                setShowDeleteModal(true)
                                setDeleteScriptName(scriptName)
                            }

                            let showEnableModal = () => {
                                setShowEnableModal(true)
                                setEnableScriptName(scriptName)
                            }

                            let showDisableModal = () => {
                                setShowDisableModal(true)
                                setDisableScriptName(scriptName)
                            }

                            if (currentPage === "enableds") {
                                return (
                                    <ScriptCard 
                                        key={scriptName}

                                        scriptName={scriptName} 
                                        setUpdateScriptName={setUpdateScriptName}
                                        showModal={showModal}

                                        showDeleteModal={showDeleteModal}
                                        showEnableModal={showEnableModal}
                                        showDisableModal={showDisableModal}
    
                                        showDeleteBtn={false}
                                        showDisableBtn={true}
                                        showMoreInfoBtn={true}
                                        showEnableBtn={false}
                                        showUpdateBtn={true}
                                    />
                                )
                            }
                            else {
                                return (
                                    <ScriptCard 
                                        key={scriptName} 
                                        scriptName={scriptName} 
                                        setUpdateScriptName={setUpdateScriptName}
                                        showModal={showModal}

                                        showDeleteModal={showDeleteModal}
                                        showEnableModal={showEnableModal}
                                        showDisableModal={showDisableModal}
    
                                        showDeleteBtn={true}
                                        showDisableBtn={false}
                                        showMoreInfoBtn={true}
                                        showEnableBtn={true}
                                        showUpdateBtn={true}
                                    />
                                )
                            }
                        })}
                </Row>
            </Container>
        )
    } else {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }
}