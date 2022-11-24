import fileDownload from "js-file-download";
import { useState } from "react";
import { Badge, Button, Spinner, Table } from "react-bootstrap";
import { Processamento } from "types/processamentos";
import axiosInstance from "utils/axios";
import './styles.css';

type Props = {
    processamentos: Processamento[];
}

// component q exibe a lista de procns de determinado paciente
function ListaProcs({ processamentos }: Props) {

    const [loading, setLoading] = useState<boolean>(false);

    function getResults(idProc: number) {
        setLoading(true);
        axiosInstance
            .get('/resultados/' + idProc)
            .then((res) => {
                res.data.map((result: { id: number; }) => downloadResult(result.id))
            })
            .catch((err) => alert("Erro ao atualizar aquisicao" + err))
            .finally(() => setLoading(false));
    }

    function downloadResult(idResult: number) {
        axiosInstance
            .get('/resultados/download/' + idResult)
            .then((res) => {
                //console.log(res.headers)
                fileDownload(res.data, res.headers['content-disposition'].split('filename=')[1]);
            })
            .catch((err) => alert("Erro ao atualizar aquisicao" + err));
    }

    function setColor(status: string) {
        if (status.match('PROCESSADO'))
            return 'success';
        else if (status.match('ERRO'))
            return 'danger';
        else
            return 'primary';
    }

    function formatDate(dateString: string) {
        let date = new Date(dateString);

        let year: any = date.getFullYear();
        let month: any = date.getMonth() + 1;
        let day: any = date.getDate();
        let hr: any = date.getHours();
        let min: any = date.getMinutes();
        let sec: any = date.getSeconds();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        if (hr < 10) {
            hr = '0' + hr;
        }
        if (min < 10) {
            min = '0' + min;
        }
        if (sec < 10) {
            sec = '0' + sec;
        }
        return day + '-' + month + '-' + year + ' ' + hr + ':' + min + ':' + sec;
    }

    return (
        <div className="lista">
            {loading && <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
            }
            <Table striped bordered responsive>
                <thead>
                    <tr>
                        <th>#id</th>
                        <th>Status</th>
                        <th>Início</th>
                        <th>Término</th>
                        <th>Serviço</th>
                        <th>Resultados</th>
                    </tr>
                </thead>
                <tbody>
                    {processamentos.map(proc => (
                        <tr key={proc.id}>
                            <td>{proc.id}</td>
                            <td><Badge pill bg={setColor(proc.status)}>{proc.status}</Badge>{' '}</td>
                            <td>{formatDate(proc.createdAt?.toString() as string)}</td>
                            <td>{
                                proc.status.match('PROCESSANDO')
                                    ? '-'
                                    : formatDate(proc.updatedAt?.toString() as string)
                            }
                            </td>
                            <td>{proc.nomeServico}</td>
                            <td>
                                <Button
                                    disabled={!proc.status.match('PROCESSADO')}
                                    variant="success"
                                    onClick={() => getResults(proc.id)}>
                                    Baixar
                                </Button>
                            </td>
                        </tr>
                    )).sort((a, b) => (b?.key! as number) - (a?.key! as number))}
                </tbody>
            </Table>
            <div className='divMsg'><p>{processamentos?.length ?? 0} processamento(s)</p></div>
        </div>
    );
}

export default ListaProcs;