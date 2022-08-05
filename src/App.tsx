import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Pacientes, ListaImagens, UploadForm, Login, Register, NovoPaciente, EditarPaciente} from 'pages';
import { Layout } from "layouts";
import AuthProvider, { AuthContext } from './contexts/auth';
import { useContext } from "react";

// uso de react router dom para mudança de pags
function App() {

  const Private = ({ children }: any) => {
    const context = useContext(AuthContext);

    if (context?.loading) {
      return <div>Carregando...</div>
    }

    if (!context?.authenticated) {
      return <Navigate to='/login' />
    }
    return children;
  }

  // rotas
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route 
              index 
              element={
              <Private>
                <Pacientes />
              </Private>} />
            <Route 
              path=":idPaciente" 
              element={
                <Private>
                  <ListaImagens />
                </Private>} />
            <Route 
              path=":idPaciente/upload"
              element={
              <Private>
                <UploadForm />
              </Private>} />
            <Route 
              path="/editar/:idPaciente" 
              element={
              <Private>
                <EditarPaciente />
              </Private>} />
            <Route 
              path="/adicionar" 
              element={
              <Private>
                <NovoPaciente />
              </Private>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;