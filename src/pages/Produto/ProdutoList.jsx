import React, { useEffect, useState } from 'react'
import { Button, Container, Modal, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import { FaEdit, FaExclamationTriangle, FaPlus, FaQuestionCircle, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import api from '../../services/api'

const ProdutoList = () => {
  const [produtos, setProdutos] = useState([])
  const [modalAberto, setModalAberto] = useState(false)
  const [produtoSelecionado, setProdutoSelecionado] = useState(null)

  useEffect(() => {
    api
      .get('/produtos')
      .then(response => setProdutos(response.data))
      .catch(error => console.error('Erro ao carregar produtos: ', error))
  }, [])

  const fecharModal = () => {
    setModalAberto(false)
    setProdutoSelecionado(null)
  }

  const abrirModal = (produto) => {
    setProdutoSelecionado(produto)
    setModalAberto(true)
  }

  const removerProduto = () => {
    api
      .delete(`/produtos/${produtoSelecionado.id}`)
      .then(() => {
        setProdutos(prev => prev.filter(p => p.id !== produtoSelecionado.id))
        fecharModal()
      })
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4 d-flex align-items-center">
        Lista de Produtos
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip>Visualize e edite produtos cadastrados</Tooltip>}
        >
          <span className="ms-2" style={{ cursor: 'pointer' }}>
            <FaQuestionCircle />
          </span>
        </OverlayTrigger>
      </h2>

      <div className="mb-3">
        <Button as={Link} to="/cadastrar-produto" variant="primary">
          <FaPlus className="me-2" /> Adicionar Produto
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Quantidade em estoque</th>
            <th>Fornecedor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>
                {Number(produto.preco).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </td>
              <td>{produto.quantidadeEstoque}</td>
              <td>{produto.fornecedor?.nomeFantasia}</td>
              <td>
                <Button
                  as={Link}
                  to={`/editar-produto/${produto.id}`}
                  variant="warning"
                  size="sm"
                  className="me-2"
                >
                  <FaEdit className="me-1" /> Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => abrirModal(produto)}
                >
                  <FaTrash className="me-1" /> Excluir
                </Button>
              </td>
            </tr>
          ))}
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
          Tem certeza que deseja excluir o produto:{' '}
          <strong>{produtoSelecionado?.nome}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fecharModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={removerProduto}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default ProdutoList