import { Alert } from "react-bootstrap"

export function alertMsgSwitch(code: number, msg: string, setShowError: React.Dispatch<any>) {
    switch (code) {
        case 401:
            return (
                <Alert
                    variant="warning"
                    onClose={() => setShowError(false)}
                    dismissible>
                    Sessão expirada, faça <Alert.Link href='/login'>login</Alert.Link> novamente.
                </Alert>
            );
        case 404:
            return (
                <Alert
                    variant="danger"
                    onClose={() => setShowError(false)}
                    dismissible>
                    {msg} <Alert.Link href=' '>Tentar novamente.</Alert.Link>
                </Alert>
            );
        default:
            return (
                <Alert
                    variant="danger"
                    onClose={() => setShowError(false)}
                    dismissible>
                    Ops. Algo deu errado <Alert.Link href=' '>Tentar novamente.</Alert.Link>
                </Alert>
            );
    }
}