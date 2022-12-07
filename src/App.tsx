import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Pacientes,
  ListaImagens,
  UploadForm,
  Login,
  Register,
  NovoPaciente,
  EditarPaciente,
  ResetPasswordRequest,
  ResetPassword,
  Processamentos,
} from "pages";
import { Layout } from "layouts";
import AuthProvider, { AuthContext } from "./contexts/auth";
import { useContext } from "react";
import Scripts from "pages/Admin/Scripts";
import Admin from "pages/Admin";
import Dashboard from "pages/Admin/Dashboard";

// uso de react router dom para mudança de pags
function App() {
  const Private = ({ children }: any) => {
    const context = useContext(AuthContext);

    if (context?.loading) {
      return <div>Carregando...</div>;
    }

    if (!context?.authenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  // rotas
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<ResetPasswordRequest />} />
          <Route path="/reset/confirm" element={<ResetPassword />} />
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Private>
                  <Pacientes />
                </Private>
              }
            />
            <Route
              path="/imagens/:idPaciente"
              element={
                <Private>
                  <ListaImagens />
                </Private>
              }
            />
            <Route
              path="/upload/:idPaciente"
              element={
                <Private>
                  <UploadForm />
                </Private>
              }
            />
            <Route
              path="/editar/:idPaciente"
              element={
                <Private>
                  <EditarPaciente />
                </Private>
              }
            />
            <Route
              path="/adicionar"
              element={
                <Private>
                  <NovoPaciente />
                </Private>
              }
            />
            <Route
              path="/imagens/:idPaciente/processamentos/:idImage"
              element={
                <Private>
                  <Processamentos />
                </Private>
              }
            />
            <Route 
              path="/admin" 
              element={
                <Private>
                  <Admin />
                </Private>
              } />
            <Route 
              path="/admin/scripts" 
              element={
                <Private>
                  <Scripts />
                </Private>
              } />
            <Route 
              path="/admin/dashboard" 
              element={
                <Private>
                  <Dashboard />
                </Private>
              } />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
