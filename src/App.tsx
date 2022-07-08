import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pacientes from 'pages/Pacientes';
import ListaImagens from "pages/Imagens";
import UploadForm from "pages/Imagens/form";
//import EdicaoForm from "pages/Pacientes/edicao";
import Navbar from 'layouts/Navbar'

// uso de react router dom para mudança de pags
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Pacientes />} />
        <Route path="paciente">
          <Route path=":idPaciente" element={<ListaImagens />} />
          <Route path=":idPaciente/upload" element={<UploadForm />} />
          {/* <Route path=":idPaciente/editar" element={<EdicaoForm />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;