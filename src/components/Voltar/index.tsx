import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

type Props = {
    caminho: string;
}

function Voltar({ caminho }: Props) {

    return(
        <div>
            <Link to={caminho}>
                <FontAwesomeIcon icon={faAngleLeft} /> Voltar
            </Link>
        </div>
    );
}

export default Voltar;