import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pacientes from 'pages/Pacientes';
import ListaImagens from "pages/Imagens";
import UploadForm from "pages/Imagens/form";
//import EdicaoForm from "pages/Pacientes/edicao";
import Login from "pages/Login";
import { Layout } from "layouts";

// uso de react router dom para mudança de pags
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/paciente" element={<Layout />}>
          <Route index element={<Pacientes />} />
          <Route path=":idPaciente" element={<ListaImagens />} />
          <Route path=":idPaciente/upload" element={<UploadForm />} />
          {/* <Route path=":idPaciente/editar" element={<EdicaoForm />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;