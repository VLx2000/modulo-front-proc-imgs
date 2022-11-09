import { useEffect, useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom';
import axiosInstance from 'utils/axios';

function ModalScripts() {
    const params = useParams();
    const location = useLocation()
    const { caminho } = location.state as any;

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [scripts, setScripts] = useState<any>();
    const [scriptEscolhido, setScriptEscolhido] = useState<any>();
    const [nomeSaida, setNomeSaida] = useState<string>('saida');

    const msgSucesso = 'Processamento concluído! Recarregue a pág para visualizar o resultado.';
    const msgProcessando = 'Processamento iniciado! Recarregue a pág para acompanhar o processo.';
    const msgErro = 'Ops. Algo deu errado!';

    useEffect(() => {
        axiosInstance
            .get('/processamentos/scripts')
            .then((res) => {
                setScripts(res.data);
                setScriptEscolhido(Object.values(res.data)[0]);
                console.log(Object.values(res.data)[0])
            })
            .catch((error) => alert('Erro' + error));
    }, []);

    function processar() {
        let formData = new FormData();
        let script = [
            { filename: `uploads/salvos/${caminho}`, },
            {},
            { name: nomeSaida }
        ]
        formData.append('inputs', JSON.stringify(script));
        formData.append('idImage', params?.idImage!);
        console.log(formData)
        setMessage(msgProcessando);
        axiosInstance
            .post('/processamentos/execution/skull_striping', formData, {
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

    function setScript(){
        let selected = document.getElementById('select') as HTMLSelectElement;
        setScriptEscolhido(scripts[selected.options[selected.selectedIndex].value]);
    }

    return (
        <>
            <Button onClick={() => setShow(true)}>Novo processamento</Button>

            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Executar script</Modal.Title>
                </Modal.Header>
                {message && //caso em q terminou o proc ou houve algum erro
                    <Alert variant={corMsg()}>
                        <span>{message + ' '}</span>
                        <Link reloadDocument to={""}>
                            <span className="recarregar">Recarregar página</span>
                        </Link>
                    </Alert>
                }
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Escolha o script de processamento a ser executado:</Form.Label>
                        <Form.Select id='select' onChange={() => setScript()}>
                            {scripts && Object.keys(scripts).map(
                                (item: any) => <option key={item} value={item}>{item}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    {scriptEscolhido && Object.values(scriptEscolhido.inputs).map(
                        (item: any) =>
                        item.type === 'file' ?
                            <Form.Group className="mb-3">
                                <Form.Label>Caminho imagem</Form.Label>
                                <Form.Control type="text" defaultValue={`uploads/salvos/${caminho}`} disabled />
                            </Form.Group> : 
                        item.type === 'string' ?
                            <Form.Group className="mb-3">
                                <Form.Label>Nome do arquivo de saída</Form.Label>
                                <Form.Control type="text" defaultValue={item.name} onChange={handleNomeSaida} />
                            </Form.Group> :
                        item.type === 'static file array' ?
                            <Form.Group className="mb-3">
                                <Form.Label>Arquivos estáticos</Form.Label>
                                <Form.Control type="text" defaultValue={item.filenames} disabled />
                            </Form.Group> : <div>{item.toString()}</div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => processar()}>
                        Iniciar processamento
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalScripts;