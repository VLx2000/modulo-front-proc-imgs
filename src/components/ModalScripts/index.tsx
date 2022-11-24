import { useEffect, useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import axiosInstance from 'utils/axios';
import './styles.css';

function ModalScripts() {
    const params = useParams();
    const location = useLocation()
    const { caminho } = location.state as any;

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [scripts, setScripts] = useState<any>();
    const [scriptEscolhidoData, setScriptEscolhidoData] = useState<any>();
    const [scriptEscolhido, setScriptEscolhido] = useState<string>('');
    const [nomeSaida, setNomeSaida] = useState<string>('saida');

    const msgSucesso = 'Processamento concluído!';
    const msgProcessando = 'Processamento iniciado!';
    const msgErro = 'Ops. Algo deu errado!';

    useEffect(() => {
        axiosInstance
            .get('/processamentos/scripts')
            .then((res) => {
                setScripts(res.data);
                setScriptEscolhidoData(Object.values(res.data)[0]);
                setScriptEscolhido(Object.keys(res.data)[0])
            })
            .catch((error) => alert('Erro' + error));
    }, []);

/*     function processar() {
        setShow(false);
        let formData = new FormData();
        let script: any = [
        ]
        scriptEscolhidoData.inputs.forEach(input => {
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
        setNomeSaida('saida');
        setMessage(msgProcessando);
        axiosInstance
            .post(`/processamentos/execution/${scriptEscolhido}`, formData, {
                headers: { 'content-type': 'multipart/form-data' }
            }).then((res) => {
                setMessage(msgSucesso);
            })
            .catch((error) => {
                const code = error?.response?.data?.code;
                switch (code) {
                    default:
                        setMessage(msgErro);
                        break;
                }
            })
    } */

    function processar() {
        setMessage(msgProcessando);
        axiosInstance
            .post('http://localhost:5000', JSON.stringify({ caminho: caminho, idImage: params?.idImage!}), {
                headers: { 'content-type': 'application/json' }
            }).then((res) => {
                setMessage(msgSucesso);
            })
            .catch((error) => {
                const code = error?.response?.data?.code;
                switch (code) {
                    default:
                        setMessage(msgErro);
                        break;
                }
            })
    }

    function corMsg() {
        if (message === msgSucesso)
            return 'success';
        else if (message === msgErro)
            return 'danger';
        else return 'warning';
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
        <header className="header">
            {message && //msg de estado do processamento
                <Alert variant={corMsg()} className='alertMsg'>
                    <span>{message}</span>
                </Alert>
            }
            <div className="div-botao-novo">
                <Button onClick={() => { processar();/* setShow(true); */ setMessage(''); }}>Novo processamento</Button>
            </div>
            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Executar script</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Escolha o script de processamento a ser executado:</Form.Label>
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
                            <Form.Group className="mb-3" key={item.flag}>
                                <Form.Label>{item.flag}</Form.Label>
                                <Form.Control type="text" value={`uploads/salvos/${caminho}`} disabled />
                            </Form.Group> : 
                        item.type === 'string' ?
                            <Form.Group className="mb-3" key={item.flag}>
                                <Form.Label>{item.flag}</Form.Label>
                                <Form.Control type="text" onChange={handleNomeSaida} />
                            </Form.Group> :
                        item.type === 'static file array' ?
                            <Form.Group className="mb-3" key={item.flag}>
                                <Form.Label>{item.flag}</Form.Label>
                                <Form.Control type="text" value={item.filenames} disabled />
                            </Form.Group> : 
                        item.type === 'static file' ?
                            <>
                            <Form.Group className="mb-3" key={item.flag}>
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