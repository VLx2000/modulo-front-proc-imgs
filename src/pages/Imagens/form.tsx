import { useRef, useState } from "react";
import { Alert, Button, Container, Form, ProgressBar } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "utils/axios";
import { Voltar } from "components";
import './styles.css';

// component q exibe form para upload
function UploadForm() {

    const params = useParams();
    // controller para cancelar requisição quando cliente desejar
    let abortControllerRef = useRef<AbortController>();

    const [image, setImage] = useState<Blob | string>('');
    const [aquisicao, setAquisicao] = useState<string>('');
    const [progress, setProgress] = useState<number>();
    const [message, setMessage] = useState<string>('');

    const submitHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setMessage('');
        let formData = new FormData();
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;   //sinal se deve continuar requisição
        formData.append("aquisicao", aquisicao as string);
        formData.append("idPaciente", params.idPaciente as string /* Math.floor(Math.random()* (10 - 1) + 1) as unknown as Blob*/);
        formData.append("idUser", 1 as unknown as Blob);
        formData.append("image", image);

        axiosInstance
            .post('/', formData, {
                signal,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (data) => {   //cria barra de progresso
                    setProgress(Math.round(100 * (data.loaded / data.total)));
                },
            })
            .then((res) => {
                //alert("File Upload success");
                setMessage('Enviado com sucesso');
            })
            .catch((error) => {
                const code = error?.response?.data?.code;
                switch (code) {
                    case "ERRO_ARQUIVO":
                        setMessage("ADICIONE UM ARQUIVO .nii OU .nii.gz!!");
                        break;
                    case "LIMIT_FILE_SIZE":
                        setMessage("Arquivo muito grande. Limite de 1GB");
                        break;
                    default:
                        setMessage("Ops. Algo deu errado");
                        break;
                }
                //console.log(signal)
                if (signal.aborted)
                    setMessage("Upload interrompido");
            });
    };

    return (
        <Container className="upload-container">
            <Voltar caminho={`/paciente/${params.idPaciente}`}/>
            <h3 className="titulo-pag">Upload de imagens</h3>
            <Form onSubmit={submitHandler} className="upload-form">
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Group className="form-inputs">
                        <Form.Control
                            type="file"
                            // types necessarios para obter somente uma imagem passada no forms
                            onChange={(e) => setImage(((e.target as HTMLInputElement).files as FileList)[0] as Blob)}
                        />
                        <Form.Control
                            type="date"
                            onChange={(e) => setAquisicao(e.target.value as string)}
                        />
                    </Form.Group>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Button variant="primary"
                        type="submit"
                        className="upload-button"
                        disabled={!!progress && message === ''}>
                        {!!progress && message === '' ? 'Enviando...' : 'Upload'}
                    </Button>
                </Form.Group>
                {message && //caso em q terminou o upload ou houve algum erro
                    <Alert variant={message === 'Enviado com sucesso' ? 'success' : 'danger'}>
                        <span>{message + ' '}</span>
                        <Link to={`/paciente/${params.idPaciente}`}>
                            <span className="recarregar">Ir para imagens salvas</span>
                        </Link>
                    </Alert>
                }
                {!message && progress &&    //caso em q upload esta sendo feito
                    <div className="progress-data">
                        <ProgressBar animated now={progress} label={`${progress}%`} />
                        <Button variant="warning" onClick={() => abortControllerRef.current?.abort()}>Cancelar</Button>
                    </div>
                }
            </Form>
        </Container>
    );
}

export default UploadForm;