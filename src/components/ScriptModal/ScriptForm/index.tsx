
import Form from 'react-bootstrap/Form'
import InputList from './InputList'
import inputsJson from '../inputs.json'
import outputsJson from '../outputs.json'
import {InputDescriptions} from './InputList/InputCard'
import HelpIcon from '../../HelpIcon'
import { ScriptInfo } from 'types/scriptsInfo'


interface ScriptFormProps {
    scriptInfo: ScriptInfo,
    setScriptInfo: React.Dispatch<React.SetStateAction<ScriptInfo>>,
    formDisabled: boolean
}

export default function ScriptForm({scriptInfo, setScriptInfo, formDisabled}: ScriptFormProps) {
    const inputsDescription = inputsJson as {[key: string]: InputDescriptions};
    const outputsDescription = outputsJson as {[key: string]: InputDescriptions}

    return (
        <>
            <Form.Group controlId="scriptFile" className="mb-3">
                <Form.Label>
                    Script <HelpIcon 
                        text='É o arquivo que será executado no serviço. Caso não seja fornecido o arquivo, é necessário fornecer um comando'
                    />
                </Form.Label>
                <Form.Control 
                    type="file"
                    disabled={formDisabled}
                    onChange={(event) => {
                        const files = (event.target as HTMLInputElement).files
                        
                        if (files && files.length === 1) {
                            setScriptInfo({...scriptInfo, script: files[0], scriptFilename: files[0].name})
                        } else {
                            setScriptInfo({...scriptInfo, script: null, scriptFilename: null})
                        }
                    }}
                />
                
            </Form.Group>
            <Form.Group className="mb-3" controlId="scriptName">
                <Form.Label>
                    Nome <HelpIcon 
                        text='É o nome que ficará cadastrado para o serviço. Não podem exister serviços com mesmo nome'
                    />
                </Form.Label>
                <Form.Control 
                    value={scriptInfo.name} 
                    disabled={formDisabled}
                    onChange={(event) => {setScriptInfo({...scriptInfo, name: event.target.value})}}
                    type="text" 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="scriptCommand">
                <Form.Label>
                    Comando <HelpIcon
                        text='É o comando que será chamado para executar o serviço'
                    />
                </Form.Label>
                <Form.Control 
                    value={scriptInfo.command}
                    disabled={formDisabled}
                    onChange={(event) => {setScriptInfo({...scriptInfo, command: event.target.value})}}
                    type="text" 
                />
            </Form.Group>

            <InputList
                text="Entradas que serão utilizadas na execução do serviço"
                inputListName='Inputs'
                inputName='Input'
                formDisabled={formDisabled}
                inputInfoListInit={scriptInfo.inputs}
                scriptInfo={scriptInfo}
                setScriptInfo={setScriptInfo}
                inputDescriptions={inputsDescription}
            />

            <InputList
                text="Saídas que serão geradas pela execução do serviço"
                inputListName='Outputs'
                inputName='Output'
                formDisabled={formDisabled}
                scriptInfo={scriptInfo}
                setScriptInfo={setScriptInfo}
                inputInfoListInit={scriptInfo.outputs}
                inputDescriptions={outputsDescription}
            />
        </>
    )
}