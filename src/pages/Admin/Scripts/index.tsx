import React, { useState, useEffect } from 'react';

import { ScriptInfo } from '../../../types/scriptsInfo';
import ScriptList from '../../../components/ScriptsList';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import ScriptModal from '../../../components/ScriptModal';
import DeleteModal from '../../../components/DeleteModal';
import EnableModal from "../../../components/EnableModal"
import DisableModal from "../../../components/DisableModal"
import axiosInstance from 'utils/axios';
import { ButtonGroup } from 'react-bootstrap';
import { Voltar } from 'components';
import { alertMsgSwitch } from 'utils/alertMsg';

function createNullScriptInfo() {
  return {
    "name": "",
    "command": "",
    "script": null,
    "inputs": [],
    "outputs": [],
    "static files": null,
    "scriptFilename": null
  }
}


var updateScriptName = ""
var enabledScripts: any
var disabledScripts: any

const Scripts: React.FC = () => {
  const [scripts, setScripts] = useState<any>({})
  const [currentPage, setCurrentPage] = useState<"enableds" | "disableds">("enableds")
  const [showModal, setShowModal] = useState(false);
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState("");
  const [scriptInfo, setScriptInfo] = useState<ScriptInfo>(createNullScriptInfo())
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteScriptName, setDeleteScriptName] = useState<string>("")
  const [showDisableModal, setShowDisableModal] = useState(false)
  const [disableScriptName, setDisableScriptName] = useState<string>("")
  const [showEnableModal, setShowEnableModal] = useState(false)
  const [enableScriptName, setEnableScriptName] = useState<string>("")
  const [filter, setFilter] = useState("")
  const [error, setError] = useState<any | null>(null);
  const [showError, setShowError] = useState(false);
  const getUpdateScriptName = () => (updateScriptName)
  const setUpdateScriptName = (newUpdateScriptName: string) => { updateScriptName = newUpdateScriptName }

  useEffect(() => {
    axiosInstance.get("/processamentos/scripts/enabledScripts/")
      .then((scriptsInfos) => {
        enabledScripts = scriptsInfos.data
        setScripts(scriptsInfos.data)
      })
      .catch((error) => {
        const code = error?.response?.status;
        setError(alertMsgSwitch(code, 'Erro ao obter serviços', setError));
        setShowError(true);
      })
  }, [])

  useEffect(() => {
    axiosInstance.get("/processamentos/scripts/disabledScripts/")
      .then((scriptsInfos) => {
        disabledScripts = scriptsInfos.data
      })
      .catch((error) => {
        const code = error?.response?.status;
        setError(alertMsgSwitch(code, 'Erro ao obter serviços', setError));
        setShowError(true);
      })
  }, [])

  return (
    <main>
      <Container fluid="md">
        <Voltar caminho={`/admin`} />
        <h3 className="titulo-pag">Serviços</h3>
        <Row className="justify-content-center mt-5 mb-5">
          <ButtonGroup aria-label="Basic example">
            <Button
              variant='outline-primary'
              onClick={() => {
                setCurrentPage("enableds")
                setScripts(enabledScripts)
              }
              }
              active={currentPage === "enableds"}
            >
              Habilitados
            </Button>
            <Button
              variant='outline-danger'
              onClick={() => {
                setCurrentPage("disableds")
                setScripts(disabledScripts)
              }
              }
              active={currentPage === "disableds"}
            >
              Desabilitados
            </Button>
          </ButtonGroup>
        </Row>
        <Row className="justify-content-center mb-2">
          <Col xxl={5} xl={6} lg={7} md={8} sm={9} xs={10}>
            <Form.Control
              type="text"
              placeholder='Filtrar serviços'
              value={filter}
              onChange={(event) => { setFilter(event.target.value) }}
            />
          </Col>
        </Row>
        <Row className="justify-content-center mb-5">
          <Col xxl={3} xl={4} lg={5} md={6} sm={7} xs={8}>
            <div className="d-grid">
              {currentPage === 'enableds' &&
                <Button
                  onClick={() => {
                    setShowModal(true)
                    setModalTitle("Criando novo serviço")
                    setFormDisabled(false)
                    setScriptInfo(createNullScriptInfo())
                    setUpdateScriptName("")
                  }}
                  variant="success"
                >
                  Criar novo serviço
                </Button>
              }
            </div>
          </Col>
        </Row>
        {showError && error}
      </Container>

      <ScriptList
        scripts={scripts}
        setModalTitle={setModalTitle}
        setFormDisabled={setFormDisabled}
        setShowModal={setShowModal}
        setScriptInfo={setScriptInfo}

        setShowDeleteModal={setShowDeleteModal}
        setDeleteScriptName={setDeleteScriptName}

        setShowDisableModal={setShowDisableModal}
        setDisableScriptName={setDisableScriptName}

        setShowEnableModal={setShowEnableModal}
        setEnableScriptName={setEnableScriptName}

        setUpdateScriptName={setUpdateScriptName}
        filter={filter}
        currentPage={currentPage}
      />

      <ScriptModal
        modalTitle={modalTitle}
        showModal={showModal}
        setShowModal={setShowModal}
        scriptInfo={scriptInfo}
        setScriptInfo={setScriptInfo}
        formDisabled={formDisabled}
        getUpdateScriptName={getUpdateScriptName}

        setScripts={setScripts}
        scripts={scripts}
        enabledScripts={enabledScripts}
        disabledScripts={disabledScripts}
        currentPage={currentPage}
      />

      <DeleteModal
        scripts={scripts}
        setScripts={setScripts}
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        scriptName={deleteScriptName}
      />

      <EnableModal
        scripts={scripts}
        enabledScripts={enabledScripts}
        disabledScripts={disabledScripts}

        setScripts={setScripts}
        setShowEnableModal={setShowEnableModal}
        scriptName={enableScriptName}
        showEnableModal={showEnableModal}
      />

      <DisableModal
        scripts={scripts}
        enabledScripts={enabledScripts}
        disabledScripts={disabledScripts}

        setScripts={setScripts}
        setShowDisableModal={setShowDisableModal}
        scriptName={disableScriptName}
        showDisableModal={showDisableModal}
      />
    </main>
  );
};

export default Scripts;