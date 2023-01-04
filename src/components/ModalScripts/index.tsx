import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import { alertMsgSwitch } from 'utils/alertMsg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from 'utils/axios';

function ModalScripts() {
    const params = useParams();
    const location = useLocation()
    const { caminho } = location.state as any;

    const [show, setShow] = useState(false);
    const [scripts, setScripts] = useState<any>();
    const [scriptEscolhidoData, setScriptEscolhidoData] = useState<any>();
    const [scriptEscolhido, setScriptEscolhido] = useState<string>('');
    const [nomeSaida, setNomeSaida] = useState<string>('resultado_processado');

    const [error, setError] = useState<any | null>(null);
    const [showError, setShowError] = useState(false);

    const msgSucesso = 'Processamento concluído!';
    const msgProcessando = 'Processamento iniciado!';
    const msgErro = 'Ops. Algo deu errado!';

    useEffect(() => {
        axiosInstance
            .get('/processamentos/scripts/enabledScripts/')
            .then((res) => {
                setScripts(res.data);
                setScriptEscolhidoData(Object.values(res.data)[0]);
                setScriptEscolhido(Object.keys(res.data)[0])
            })
            .catch((error) => {
                const code = error?.response?.status;
                setError(alertMsgSwitch(code, 'Erro ao buscar scripts', setError));
                setShowError(true);
            });
    }, []);

    function processar() {
        setShow(false);
        let formData = new FormData();
        let script: any = [
        ]
        scriptEscolhidoData.inputs.forEach((input: { type: string; }) => {
            if(input.type === 'file') {
                script.push({ filename: `uploads/salvos/${caminho}` })
            } else if(input.type === 'static file array' || input.type === 'static file') {
                script.push({ })
            } else if(input.type === 'string') {
                script.push({ name: nomeSaida })
            } else {
                script.push({ })
            }

        })
        formData.append('inputs', JSON.stringify(script));
        formData.append('idImage', params?.idImage!);
        setNomeSaida('resultado_processado');
        toast.info(msgProcessando, {
            position: toast.POSITION.BOTTOM_CENTER,
            theme: 'colored'
        });
        axiosInstance
            .post(`/processamentos/execution/${scriptEscolhido}`, formData, {
                headers: { 'content-type': 'multipart/form-data' }
            }).then((res) => {
                toast.success(msgSucesso, {
                    position: toast.POSITION.BOTTOM_CENTER,
                    theme: 'colored'
                });
            })
            .catch((error) => {
                toast.error(msgErro, {
                    position: toast.POSITION.BOTTOM_CENTER,
                    theme: 'colored'
                });
            })
    }

    function handleNomeSaida(event: React.ChangeEvent<HTMLInputElement>) {
        const nome = event.target.value;
        if (nome !== '') {
            setNomeSaida(nome);
        }
    }

    function setScript(selectedValue){
        setScriptEscolhido(selectedValue);
        setScriptEscolhidoData(scripts[selectedValue]);
    }

    return (
        <header className="header mt-5 mb-5">
            <div className="div-botao-add-novo">
                <Button onClick={() => { setShow(true); }}>Novo processamento</Button>
            </div>
            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Executar processamento</Modal.Title>
                </Modal.Header>
                {showError && error}
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Escolha o método de processamento a ser executado:</Form.Label>
                        <Form.Select id='select' onChange={event => setScript(event.target.value)}>
                        {scripts && Object.keys(scripts).map(
                                (item: any) => 
                                    item === scriptEscolhido 
                                        ? <option key={item} value={item} selected >{item}</option>
                                        : <option key={item} value={item} >{item}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    {scriptEscolhidoData && Object.values(scriptEscolhidoData.inputs).map(
                        (item: any) =>
                        item.type === 'file' ?
                            <Form.Group className="mb-3" key={item.flag} hidden>
                                <Form.Label>{item.flag}</Form.Label>
                                <Form.Control type="text" value={`uploads/salvos/${caminho}`} disabled />
                            </Form.Group> : 
                        item.type === 'string' ?
                            <Form.Group className="mb-3" key={item.flag}>
                                <Form.Label>Dê um nome para a imagem processada:</Form.Label>
                                <Form.Control type="text" onChange={handleNomeSaida} placeholder={'resultado_processado'} />
                            </Form.Group> :
                        item.type === 'static file array' ?
                            <Form.Group className="mb-3" key={item.flag} hidden>
                                <Form.Label>{item.flag}</Form.Label>
                                <Form.Control type="text" value={item.filenames} disabled />
                            </Form.Group> : 
                        item.type === 'static file' ?
                            <>
                            <Form.Group className="mb-3" key={item.flag} hidden>
                                <Form.Label>{item.flag}</Form.Label>
                                <Form.Control type="text" value={item.filename} disabled />
                            </Form.Group> </>:<div>{item.toString()}</div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => processar()}>
                        Iniciar processamento
                    </Button>
                </Modal.Footer>
            </Modal>
        </header>
    );
}

export default ModalScripts;