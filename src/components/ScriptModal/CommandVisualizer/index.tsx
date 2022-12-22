import Form from 'react-bootstrap/Form'
import HelpIcon from '../../HelpIcon'
import { ScriptInfo } from 'types/scriptsInfo';

interface CommandVizualizerProps {
    scriptInfo: ScriptInfo
}

export function CommandVisualizer({scriptInfo}: CommandVizualizerProps) {
    return (
        <>
            <Form.Label>
                Protótipo comando final <HelpIcon 
                    text='É um protótipo de como o comando final que executará o serviço ficará. Valores entre "<>" serão substituidos por um valor fornecido pelo usuário com essa chave. Uma flag seguida de ?<key>, indica que ela só será adicionada se o usuário enviar algo com a chave descrita. OBS: arquivos não estáticos podem variar de execução para execução dependendo do que o usuário enviar, mas os seus nomes serão iguais para todas execuções'
                />
            </Form.Label>
            <Form.Control
                as={"textarea"}
                readOnly={true}
                rows={5}
                value={generateFinalCommandString(scriptInfo)}
            />
        </>
    )
}

function generateFinalCommandString(scriptInfo: ScriptInfo): string {
    let commandList: string[] = [scriptInfo.command]

    if (scriptInfo.script) {
        commandList.push(scriptInfo.script.name)
    } else if (scriptInfo.scriptFilename) {
        commandList.push(scriptInfo.scriptFilename)
    }

    for (let inputInfo of scriptInfo.inputs) {
        if (inputInfo.type !== 'flag') {
            if (inputInfo.flag) {
                commandList.push(inputInfo.flag)
            }
        }

        if (inputInfo.type === 'string') {
            if (inputInfo.name) {
                commandList.push(`<${inputInfo.name}>`)
            }
        } else if (inputInfo.type === 'file') {
            if (inputInfo.filename) {
                commandList.push(inputInfo.filename)
            }
        } else if (inputInfo.type === 'static file') {
            if (inputInfo.filename) {
                commandList.push(inputInfo.filename)
            }
        } else if (inputInfo.type === 'string array') {
            if (inputInfo.names) {
                commandList.push(...inputInfo.names.map((name: string) => `<${name}>`))
            }
        } else if (inputInfo.type === 'file array') {
            if (inputInfo.filenames) {
                commandList.push(...inputInfo.filenames)
            }
        } else if (inputInfo.type === 'static file array') {
            if (inputInfo.filenames) {
                commandList.push(...inputInfo.filenames)
            }
        } else if (inputInfo.type === 'static string') {
            if (inputInfo.value) {
                commandList.push(inputInfo.value)
            }
        } else if (inputInfo.type === 'flag') {
            if (inputInfo.name && inputInfo.flag) {
                commandList.push(`${inputInfo.flag}?<${inputInfo.name}>`)
            }
        }
    }

    return commandList.filter((value) => value !== '').join(" ")
}