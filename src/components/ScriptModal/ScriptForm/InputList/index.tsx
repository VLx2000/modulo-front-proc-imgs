import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import InputCard, {InputDescriptions} from './InputCard';
import HelpIcon from '../../../HelpIcon';
import { ScriptInfo } from 'types/scriptsInfo';



interface InputListProps {
    inputListName: string,
    inputName: string,
    inputDescriptions: {[key: string]: InputDescriptions}, // Para cada tipo do dropdown, inputs diferentes irão ser fornecidos
    inputInfoListInit: object[],
    formDisabled: boolean,
    text: string,
    scriptInfo: ScriptInfo,
    setScriptInfo: React.Dispatch<React.SetStateAction<ScriptInfo>>
}

export default function InputList({inputListName, inputName, inputDescriptions, inputInfoListInit, formDisabled, text, scriptInfo, setScriptInfo}: InputListProps) {
    const [open, setOpen] = useState(false);
    const [inputInfoList, setInputInfoList] = useState<any[]>(inputInfoListInit);


    const addInput = () => {
        const newInput = {"key": crypto.randomUUID()}
        setInputInfoList([...inputInfoList, newInput])
        inputInfoListInit.push(newInput)
    }
    const removeInput = (inputNumber: number) => {
        setInputInfoList(inputInfoList.filter((inputInfo, index) => (inputNumber - 1 !== index)))
        inputInfoListInit.splice(inputNumber - 1, 1)
    }

    return (
        <>
            <div className="d-grid gap-2 mb-3">
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    variant="secondary"
                >
                    {inputListName} <HelpIcon text={text} />
                </Button>
            </div>
            <Collapse in={open}>
                <div>
                    <Container className='p-3 mb-2 bg-light'>
                        {inputInfoList.map((inputInfo, inputIndex) => (
                            <InputCard 
                                key={(inputInfo.key)?(inputInfo.key):(inputIndex)}
                                removeInput={removeInput} 
                                inputInfo={inputInfo}
                                inputName={inputName} 
                                inputNumber={inputIndex + 1}
                                formDisabled={formDisabled}
                                inputDescriptions={inputDescriptions}
                                scriptInfo={scriptInfo}
                                setScriptInfo={setScriptInfo}
                            />
                        ))}

                        {!formDisabled && (
                            <div className="d-grid gap-2">
                                <Button
                                    aria-controls="example-collapse-text"
                                    variant="outline-success"
                                    onClick={addInput}
                                >
                                    Aumentar lista
                                </Button>
                            </div>
                        )}
                    </Container>
                </div>
            </Collapse>
        </>
    );
}