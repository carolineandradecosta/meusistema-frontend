import React from 'react'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import Inicial from './pages/Inicial'

import FornecedorForm from './pages/Fornecedor/FornecedorForm'
import FornecedorList from './pages/Fornecedor/FornecedorList'
import ClienteForm from './pages/Cliente/ClienteForm'
import ClienteList from './pages/Cliente/ClienteList'
import ProdutoList from './pages/Produto/ProdutoList'
import ProdutoForm from './pages/Produto/ProdutoForm'
import Menu from './components/Menu'
import Footer from './components/Footer'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <BrowserRouter>
          <AuthProvider>
        <div className="d-flex flex-column min-vh-100">
          <Menu />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <div className="flex-grow-1">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Inicial />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/listar-produtos"
                element={
                  <ProtectedRoute>
                    <ProdutoList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cadastrar-produto"
                element={
                  <ProtectedRoute>
                    <ProdutoForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/editar-produto/:id"
                element={
                  <ProtectedRoute>
                    <ProdutoForm />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/cadastrar-fornecedor"
                element={
                  <ProtectedRoute>
                    <FornecedorForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/listar-fornecedores"
                element={
                  <ProtectedRoute>
                    <FornecedorList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/editar-fornecedor/:id"
                element={
                  <ProtectedRoute>
                    <FornecedorForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cadastrar-cliente"
                element={
                  <ProtectedRoute>
                    <ClienteForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/listar-clientes"
                element={
                  <ProtectedRoute>
                    <ClienteList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/editar-cliente/:id"
                element={
                  <ProtectedRoute>
                    <ClienteForm />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App