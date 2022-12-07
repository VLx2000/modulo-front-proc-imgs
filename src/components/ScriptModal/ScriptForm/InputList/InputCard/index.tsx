import React, {useState} from "react";
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';
import Form from 'react-bootstrap/Form'
import TextArrayInput from "./TextArrayInput";
import FileArrayInput from "./FileArrayInput";
import HelpIcon from "../../../../HelpIcon";
import { ScriptInfo } from "types/scriptsInfo";

interface InputDescription {
    help: string,
    label: string,
    name: string,
    type: "text"|"file"|"file array"|"text array"
}


export interface InputDescriptions {
    help: string,
    inputs: InputDescription[]
}



interface InputCardProps {
    inputNumber: number,
    inputName: string,
    removeInput: (inputNumber: number) => void,
    inputDescriptions: {[key: string]: InputDescriptions}, // Para cada tipo do dropdown, inputs diferentes irão ser fornecidos
    inputInfo: any,
    formDisabled: boolean,
    scriptInfo: ScriptInfo,
    setScriptInfo: React.Dispatch<React.SetStateAction<ScriptInfo>>
}

export default function InputCard({inputNumber, inputName, removeInput, inputDescriptions, inputInfo, formDisabled, setScriptInfo, scriptInfo}: InputCardProps) {
    const [selectedInputType, setSelectedInputType] = useState<string>(
        (inputInfo.hasOwnProperty('type')) ? (inputInfo.type) : ("")
    )
    const [inputInfoUpdate, setInputInfoUpdate] = useState(inputInfo)

    return (
        <Card className="mb-4">
            <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                    <h5>{inputName} {inputNumber}</h5>
                    {!formDisabled && (
                        <CloseButton onClick={() => removeInput(inputNumber)}/>
                    )}
                </div>
            </Card.Header>
            <Card.Body>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>
                        Tipo <HelpIcon text={
                            (selectedInputType === '') ?
                            ("Clicando no botão abaixo, um dropdown com vários tipos de diferentes de inputs. Selecione um, e passe o mouse nesse icone para ver informações sobre o tipo escolhido.") :
                            (inputDescriptions[selectedInputType].help)
                        } />
                    </Form.Label>
                    <Form.Select 
                        onChange={(selectElement) => {
                            inputInfo.type = selectElement.target.value
                            setSelectedInputType(selectElement.target.value)
                            setScriptInfo({...scriptInfo})
                        }}
                        defaultValue={selectedInputType}
                        disabled={formDisabled}
                    >
                        <option value="">Selecione um tipo de input</option>
                        {Object.keys(inputDescriptions).map((inputType) => (
                            <option 
                                key={inputType}
                                value={inputType}
                            >
                                {inputType}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {selectedInputType !== '' && 
                    inputDescriptions[selectedInputType].inputs.map((inputDescription, index) => {
                        if (inputDescription.type === 'file') {
                            return (
                                <Form.Group className="mb-2" key={index}>
                                    <Form.Label>
                                        {inputDescription.label} <HelpIcon text={inputDescription.help} />
                                    </Form.Label>
                                    <Form.Control 
                                        type="file"
                                        onChange={(event) => {
                                            const files = (event.target as HTMLInputElement).files
                                            
                                            if (files && files.length === 1) {
                                                inputInfo.file = files[0]
                                                inputInfo.filename = files[0].name
                                            } else {
                                                inputInfo.file = null
                                                inputInfo.filename = ''
                                            }
                                            setScriptInfo({...scriptInfo})
                                        }}
                                        disabled={formDisabled}
                                    />
                                </Form.Group>
                            )
                        }
                        else if (inputDescription.type === 'file array') {
                            return (
                                <Form.Group className="mb-2" key={index}>
                                    <Form.Label>
                                        {inputDescription.label} <HelpIcon text={inputDescription.help} />
                                    </Form.Label>
                                    <FileArrayInput
                                        setFinalFilesArray={(newFilesArray) => {
                                            inputInfo.files = newFilesArray
                                            inputInfo.filenames = newFilesArray.map((file) => file.name)
                                            setScriptInfo({...scriptInfo})
                                        }}
                                        disabled={formDisabled}
                                    />
                                </Form.Group>
                            )
                        }
                        else if (inputDescription.type === 'text') {
                            return (
                                <Form.Group className="mb-2" key={index}>
                                    <Form.Label>
                                        {inputDescription.label} <HelpIcon text={inputDescription.help} />
                                    </Form.Label>
                                    <Form.Control 
                                        type="text"
                                        onChange={(event) => {
                                            inputInfo[inputDescription.name] = event.target.value
                                            setInputInfoUpdate({...inputInfo})
                                            setScriptInfo({...scriptInfo})
                                        }}
                                        value={(inputInfoUpdate.hasOwnProperty(inputDescription.name)) ? (inputInfoUpdate[inputDescription.name]) : ("")}
                                        disabled={formDisabled}
                                    />
                                </Form.Group>
                            )
                        }
                        else if (inputDescription.type === 'text array') {
                            if (!inputInfoUpdate.hasOwnProperty(inputDescription.name)) {
                                inputInfo[inputDescription.name] = []
                            }

                            return (
                                <Form.Group className="mb-2" key={index}>
                                    <Form.Label>
                                        {inputDescription.label} <HelpIcon text={inputDescription.help} />
                                    </Form.Label>
                                    <TextArrayInput
                                        placeholderValue={inputDescription.label}
                                        textArrayInit={inputInfo[inputDescription.name]}
                                        setFinalTextArray={(newTextArray: string[]) => {
                                            inputInfo[inputDescription.name] = newTextArray
                                            setScriptInfo({...scriptInfo})
                                        }}
                                        disabled={formDisabled}
                                    />
                                </Form.Group>
                            )
                        }
                    })
                }
            </Card.Body>
        </Card>
    )
}