import React, {useState} from "react";
import Form from "react-bootstrap/Form";

interface FileArrayInputProps {
    setFinalFilesArray: (newFilesArray: File[]) => void,
    disabled: boolean
}

interface KeyFile { // Para que cada valor do array seja unicamente identificado, para na hora da renderização não ocorra problemas
    file: File|null,
    key: string
}

export default function FileArrayInput({setFinalFilesArray, disabled}: FileArrayInputProps) {
    const [filesArray, setFilesArray] = useState<Array<KeyFile>>([])

    if (!disabled) {
        if (filesArray.length === 0) {
            filesArray.push({file: null, key: crypto.randomUUID()})
        }
        else if (filesArray[filesArray.length - 1].file !== null) {
            filesArray.push({file: null, key: crypto.randomUUID()})
        }
    }

    return (
        <>
            {filesArray.map((keyFile, currentIndex) => (
                <Form.Control
                    key={keyFile.key} 
                    type="file"
                    onChange={(event) => {
                        const files = (event.target as HTMLInputElement).files

                        if (files && files.length === 1) {
                            filesArray[currentIndex].file = files[0]
                        } else {
                            filesArray[currentIndex].file = null
                        }

                        const finalKeyFileArray = filesArray.filter((keyFile) => keyFile.file !== null) as KeyFile[]
                        const finalFileArray = finalKeyFileArray.map((keyFile) => keyFile.file) as File[]

                        setFinalFilesArray(finalFileArray)  // É o array que será usado para o submit
                        setFilesArray(finalKeyFileArray)
                    }}
                    disabled={disabled}
                />
                )
            )}
        </>
    )
}