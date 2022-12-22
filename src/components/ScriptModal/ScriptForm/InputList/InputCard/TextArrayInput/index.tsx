import React, {useState} from "react";
import Form from "react-bootstrap/Form";

interface TextArrayInputProps {
    textArrayInit: string[],
    placeholderValue: string,
    setFinalTextArray: (newTextArray: string[]) => void,
    disabled: boolean
}

export default function TextArrayInput({textArrayInit, placeholderValue, setFinalTextArray, disabled}: TextArrayInputProps) {
    const [textArray, setTextArray] = useState([...textArrayInit])

    if (!disabled) {
        if (textArray.length === 0) {
            textArray.push('')
        }
        else if (textArray[textArray.length - 1] !== '') {
            textArray.push('')
        }
    }

    return (
        <>
            {textArray.map((textValue, currentIndex) => (
                <Form.Control
                    key={currentIndex} 
                    placeholder={`${placeholderValue} ${currentIndex + 1}`} 
                    type="text"
                    value={textValue}
                    onChange={(event) => {
                        textArray[currentIndex] = event.target.value
                        const finalTextArray = textArray.filter((value) => value !== '')
                        setFinalTextArray([...finalTextArray])  // É o array que será usado para o submit
                        setTextArray(finalTextArray)
                    }}
                    disabled={disabled}
                />
                )
            )}
        </>
    )
}