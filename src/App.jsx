import React from 'react'
import FornecedorForm from './pages/Fornecedor/FornecedorForm'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import Inicial from './pages/Inicial'
import Menu from './components/Menu'
import FornecedorList from './pages/Fornecedor/FornecedorList'
import ClienteForm from './pages/Cliente/ClienteForm'
import ClienteList from './pages/Cliente/ClienteList'
import ProdutoForm from './pages/Produto/ProdutoForm'

const App = () => {
  return (
    <BrowserRouter>
    <Menu />
    <Routes>
      <Route path="/" element={<Inicial/>} />
      <Route path="/cadastrar-fornecedor" element={<FornecedorForm />} />
      <Route path="/listar-fornecedores" element={<FornecedorList />}/> 
      <Route path="/editar-fornecedor/:id" element={<FornecedorForm />}/>
      <Route path="/cadastrar-cliente" element={<ClienteForm />} />
      <Route path="/listar-clientes" element={<ClienteList />} />
      <Route path="/editar-cliente/:id" element={<ClienteForm />} />
      <Route path="/cadastrar-produto" element={<ProdutoForm />} />

    </Routes>
    </BrowserRouter>
  )
}

export default App