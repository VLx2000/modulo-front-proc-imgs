import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar'
import {InputDescriptions} from './ScriptForm/InputList/InputCard'
import ScriptForm from './ScriptForm';
import inputsJson from './inputs.json';
import outputsJson from './outputs.json'
import { BsFillCheckCircleFill }  from "react-icons/bs"
import { AiFillCloseCircle } from "react-icons/ai"
import { CommandVisualizer } from './CommandVisualizer';
import { ScriptInfo } from 'types/scriptsInfo';
import axiosInstance from 'utils/axios';




interface ScriptModalProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    showModal: boolean,
    formDisabled: boolean,
    modalTitle: string,
    scriptInfo: ScriptInfo,
    setScriptInfo: React.Dispatch<React.SetStateAction<ScriptInfo>>,
    getUpdateScriptName: () => string,
    setScripts: React.Dispatch<React.SetStateAction<any>>,
    scripts: any,
    enabledScripts: any,
    disabledScripts: any,
    currentPage: "enableds"|"disableds"
}


export default function ScriptModal({setShowModal, showModal, formDisabled, modalTitle, scriptInfo, setScriptInfo, getUpdateScriptName, setScripts, scripts, enabledScripts, disabledScripts, currentPage}: ScriptModalProps) {
    const [status, setStatus] = useState<"form"|"loading"|"error"|"success">("form")
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [statusMessage, setStatusMessage] = useState("")

    const handleClose = () => {
        setShowModal(false)
        setStatus("form")
        setLoadingProgress(0)
    };

    const handleProgress = (e: any) => {
        setLoadingProgress(e.loaded / e.total * 100)
    }

    const handleCreateSuccess = (response: any) => {
        setStatus("success")
        setStatusMessage("Script criado com sucesso !")

        enabledScripts[scriptInfo.name] = scriptInfo
        setScripts({...enabledScripts})

        console.log(response.data)
    }

    const handleUpdateSuccess = (updateScriptName: string, response: any) => {
        setStatus("success")
        setStatusMessage(`Script ${updateScriptName} atualizado com sucesso !`)

        if (currentPage === 'enableds') {
            scripts = enabledScripts
        } else {
            scripts = disabledScripts
        }
        delete scripts[updateScriptName]  // Apaga o conteudo antigo do script
        scripts[scriptInfo.name] = scriptInfo
        setScripts({...scripts})
        
        console.log(response.data)
    }

    const handleError = (reason: any) => {
        setStatus("error")
        setStatusMessage("Falha ao criar script ! Para mais informações, verificar o log do console.")
        console.log(reason)
    }

    const submitForm = () => {
        setStatus("loading")

        const currentScriptName = getUpdateScriptName()

        const inputsDescription = inputsJson as {[key: string]: InputDescriptions}
        const outputsDescription = outputsJson as {[key: string]: InputDescriptions}
    
        const formData = new FormData()
    
        formData.append('name', scriptInfo.name)
        
        formData.append('command', scriptInfo.command)
    
        if (scriptInfo.script) {
            formData.append('script', scriptInfo.script, scriptInfo.script.name)
        }
    
        formData.append('inputs', JSON.stringify(translateInputList(scriptInfo.inputs, formData, inputsDescription)))
    
        formData.append('outputs', JSON.stringify(translateInputList(scriptInfo.outputs, formData, outputsDescription)))
    
        if (currentScriptName === '') {
            // Adicionando um novo script
            axiosInstance.post('/processamentos/scripts', formData, {
                onUploadProgress: (e) => handleProgress(e)
            })
                .then((response) => (handleCreateSuccess(response)))
                .catch((reason) => (handleError(reason)))
        }
        else {
            // Atualizando um script
            axiosInstance.put(`/processamentos/scripts/${currentScriptName}`, formData, {
                onUploadProgress: (e) => handleProgress(e)
            })
                .then((response) => (handleUpdateSuccess(currentScriptName, response)))
                .catch((reason) => (handleError(reason)))
        }
    }

    return (
        <Modal
            show={showModal}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            fullscreen="lg-down"
        >
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{display: status !== 'form'?"none":"block"}}>
                    <ScriptForm 
                        scriptInfo={scriptInfo}
                        setScriptInfo={setScriptInfo}
                        formDisabled={formDisabled}
                    />
                    <hr />
                    <CommandVisualizer
                        scriptInfo={scriptInfo}
                    />
                </div>

                {
                    status === 'loading' &&
                    <ProgressBar animated now={loadingProgress} />
                }

                {
                    status === 'success' &&
                    <div style={{"textAlign": "center"}}>
                        <BsFillCheckCircleFill size={100} color={"green"} />
                        <p>{statusMessage}</p>
                    </div>
                }

                {
                    status === 'error' &&
                    <div style={{"textAlign": "center"}}>
                        <AiFillCloseCircle size={100} color={"red"} />
                        <p>{statusMessage}</p>
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                {
                    (status === 'form' || status === 'success') &&
                    <Button variant={(status === 'form') ? ('secondary') : ('success')} onClick={handleClose}>
                        {(status === 'form') ? ("Fechar") : ("Concluido")}
                    </Button>
                }

                {
                    status === 'error' &&
                    <Button variant="secondary" onClick={() => {
                        setStatus("form")
                    }}>
                        Voltar
                    </Button>
                }
                
                {
                    status === 'form' && 
                    <Button 
                        variant="primary" 
                        disabled={formDisabled}
                        onClick={() => submitForm()}
                    >
                        {getUpdateScriptName() === '' ? "Criar" : "Atualizar"}
                    </Button>
                }
                
            </Modal.Footer>
        </Modal>
    );
}

function translateInputList(data: any[], formData: FormData, inputsDescription: {[key: string]: InputDescriptions}) {
    const translation = []
    for (let inputInfo of data) {
        const inputKeys = inputsDescription[inputInfo.type].inputs
        const currentInput: any = {"type": inputInfo['type']}
        for (let inputKey of inputKeys) {
            if (inputKey.type === 'file') {
                if (inputInfo['file']) {
                    const file = inputInfo['file'] as File
                    formData.append('static files', file, file.name)
                }
            }
            else if (inputKey.type === 'file array') {
                if (inputInfo['files']) {
                    const files = inputInfo['files'] as FileList
                    Array.from(files).forEach((file) => {
                        formData.append('static files', file, file.name)
                    })
                }
            }
            currentInput[inputKey.name] = inputInfo[inputKey.name]
        }
        translation.push(currentInput)
    }
    return translation
}
