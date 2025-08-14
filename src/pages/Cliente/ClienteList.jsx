import React, { useEffect, useState } from 'react'
import { Button, Container, Modal, ModalBody, ModalFooter, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import { FaEdit, FaExclamationTriangle, FaPlus, FaQuestionCircle, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ClienteList = () => {

  const apiUrl = import.meta.env.VITE_API_URL
  const [clientes, setClientes] = useState([])
  const [modalAberto, setModalAberto] = useState(false)
  const [clienteSelecionado, setClienteSelecionado] = useState(null)

  useEffect(() => {
    axios.get(`${apiUrl}/clientes`)
    .then(response => setClientes(response.data))
    .catch(error => console.error("Erro ao carregar cliente: ", error))
  }, [])

  const fecharModal = () => {
    setModalAberto(false)
    setClienteSelecionado(null)
  }

  const abrirModal = (cliente) => {
    setClienteSelecionado(cliente)
    setModalAberto(true)
  }

  const removerCliente = () => {
    axios.delete(`${apiUrl}/clientes/${clienteSelecionado.id}`)
    .then(() => {
      setClientes(prev => prev.filter(c => c.id !== clienteSelecionado.id))
      fecharModal()
    })
  }


  return (
    <Container className="mt-5">
      <h2 className="mt-4" d-flex aling-items-center>
        Lista de Clientes
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip>Visualize, edite ou exclua Clientes</Tooltip>}        
        >
          <span className="ms-2" style={{ curso: 'pointer' }}>
            <FaQuestionCircle  />
          </span>          
        </OverlayTrigger>
      </h2>

      <div className="mb-3">
        <Button as={Link} to="/cadastrar-cliente" variant="primary">
          <FaPlus className="me-2" /> Adicionar Cliente
        </Button>
      </div>

      <Table striped  bordered hover responsive>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            clientes.map(cliente => (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>
                  <Button
                    as={Link}
                    to={`/editar-cliente/${cliente.id}`}
                    variant="warning"
                    size="sm"
                    className=""
                  >
                    <FaEdit className="me-1" /> Editar
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => abrirModal(cliente)}
                  >
                    <FaTrash className="me-1" /> Excluir
                  </Button>
                </td>

              </tr>
            ))
          }
        </tbody>

      </Table>

      <Modal show={modalAberto} onHide={fecharModal} centered>
        <Modal.Header>
          <Modal.Title>
            <FaExclamationTriangle className="text-danger me-2" />
            Confirmar exclusão
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir o cliente:{' '}<strong>{clienteSelecionado?.nome}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secundary" onClick={fecharModal}>Cancelar</Button>
          <Button variant="danger" onClick={removerCliente}>Excluir</Button>
        </Modal.Footer>

      </Modal>

    </Container>
  )
}

export default ClienteList