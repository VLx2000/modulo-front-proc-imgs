import { Col, Container, Row } from "react-bootstrap";
import { BsFillPersonLinesFill, BsFillTerminalFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import './styles.css';

const Admin = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Link to={"/admin/scripts"}>
                        <div className="admin-option">
                            <BsFillTerminalFill size={100} />
                            <div>Gerenciar serviços</div>
                        </div>
                    </Link>
                </Col>
                <Col>
                    <Link to={"/admin/dashboard"}>
                        <div className="admin-option">
                            <BsFillPersonLinesFill size={100} />
                            <div>Gerenciar usuários</div>
                        </div>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default Admin;