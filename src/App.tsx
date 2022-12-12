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
  const PrivateUser = ({ children }: any) => {
    const context = useContext(AuthContext);

    if (context?.loading) {
      return <div>Carregando...</div>;
    }

    if (!context?.authenticated || context?.user?.type !== 'user') {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const PrivateAdmin = ({ children }: any) => {
    const context = useContext(AuthContext);

    if (context?.loading) {
      return <div>Carregando...</div>;
    }

    if (!context?.authenticated || context?.user?.type !== 'admin') {
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
                <PrivateUser>
                  <Pacientes />
                </PrivateUser>
              }
            />
            <Route
              path="/imagens/:idPaciente"
              element={
                <PrivateUser>
                  <ListaImagens />
                </PrivateUser>
              }
            />
            <Route
              path="/upload/:idPaciente"
              element={
                <PrivateUser>
                  <UploadForm />
                </PrivateUser>
              }
            />
            <Route
              path="/editar/:idPaciente"
              element={
                <PrivateUser>
                  <EditarPaciente />
                </PrivateUser>
              }
            />
            <Route
              path="/adicionar"
              element={
                <PrivateUser>
                  <NovoPaciente />
                </PrivateUser>
              }
            />
            <Route
              path="/imagens/:idPaciente/processamentos/:idImage"
              element={
                <PrivateUser>
                  <Processamentos />
                </PrivateUser>
              }
            />
            <Route
              path="/admin" 
              element={
                <PrivateAdmin>
                  <Admin />
                </PrivateAdmin>
              } />
            <Route 
              path="/admin/scripts" 
              element={
                <PrivateAdmin>
                  <Scripts />
                </PrivateAdmin>
              } />
            <Route 
              path="/admin/dashboard" 
              element={
                <PrivateAdmin>
                  <Dashboard />
                </PrivateAdmin>
              } />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
