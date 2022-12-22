import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import {FiHelpCircle} from 'react-icons/fi'


interface HelpIconProps {
    text: string
}

export default function HelpIcon({text}: HelpIconProps) {
    return (
        <OverlayTrigger
            placement="right"
            delay={{ show: 10, hide: 50 }}
            overlay={(props) => (
                <Tooltip id="button-tooltip" {...props}>
                    {text}
                </Tooltip>
            )}
        >
            <span>
                <FiHelpCircle size={20} />
            </span>
        </OverlayTrigger>
    )
}