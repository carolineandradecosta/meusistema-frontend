import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { FaCheckCircle, FaQuestionCircle } from 'react-icons/fa'
import api from '../../services/api'

const ProdutoForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [modalAberto, setModalAberto] = useState(false)
  const [fornecedores, setFornecedores] = useState([])

  const [produto, setProduto] = useState({
    nome: '',
    preco: '',
    descricao: '',
    quantidadeEstoque: '',
    fornecedorId: '',
  })

  useEffect(() => {
    api
      .get('/fornecedores')
      .then(response => setFornecedores(response.data))
      .catch(error => console.error('Erro ao carregar fornecedores: ', error))
  }, [])

  useEffect(() => {
    if (id) {
      api
        .get(`/produtos/${id}`)
        .then(response => {
          const data = response.data
          setProduto({
            nome: data.nome,
            preco: data.preco,
            descricao: data.descricao || '',
            quantidadeEstoque: data.quantidadeEstoque,
            fornecedorId: data.fornecedor?.id ?? '',
          })
        })
        .catch(error => console.error('Erro ao carregar produto: ', error))
    }
  }, [id])

  const handleChange = (campo, valor) => {
    setProduto(prev => ({
      ...prev,
      [campo]: valor,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const payload = {
      nome: produto.nome,
      preco: produto.preco,
      descricao: produto.descricao,
      quantidadeEstoque: Number(produto.quantidadeEstoque),
      fornecedorId: Number(produto.fornecedorId),
    }

    const request = id
      ? api.put(`/produtos/${id}`, payload)
      : api.post('/produtos', payload)

    request
      .then(() => setModalAberto(true))
      .catch(error => console.error('Erro ao cadastrar/editar produto: ', error))
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4 d-flex align-items-center">
        {id ? 'Editar Produto' : 'Adicionar Produto'}
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip>Preencha os dados do produto</Tooltip>}
        >
          <span className="ms-2" style={{ cursor: 'pointer' }}>
            <FaQuestionCircle />
          </span>
        </OverlayTrigger>
      </h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            required
            value={produto.nome}
            onChange={e => handleChange('nome', e.target.value)}
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.01"
                required
                value={produto.preco}
                onChange={e => handleChange('preco', e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Quantidade em estoque</Form.Label>
              <Form.Control
                type="number"
                min="0"
                required
                value={produto.quantidadeEstoque}
                onChange={e => handleChange('quantidadeEstoque', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={produto.descricao}
            onChange={e => handleChange('descricao', e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fornecedor</Form.Label>
          <Form.Select
            required
            value={produto.fornecedorId}
            onChange={e => handleChange('fornecedorId', e.target.value)}
          >
            <option value="">Selecione um fornecedor</option>
            {fornecedores.map(fornecedor => (
              <option key={fornecedor.id} value={fornecedor.id}>
                {fornecedor.nomeFantasia}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="success">
          Salvar
        </Button>
      </Form>

      <Modal
        show={modalAberto}
        onHide={() => {
          setModalAberto(false)
          navigate('/listar-produtos')
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FaCheckCircle className="text-success me-2" /> Sucesso:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {id ? 'Produto editado com sucesso' : 'Produto adicionado com sucesso'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => navigate('/listar-produtos')}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default ProdutoForm
