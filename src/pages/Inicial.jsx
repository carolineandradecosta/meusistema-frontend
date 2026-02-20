import React from 'react'
import { Card, Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { FaBoxOpen, FaChartLine, FaTruck, FaUsers } from 'react-icons/fa'

const Inicial = () => {

    const stats = {
    totalClientes: 128,
    produtosEstoque: 342,
    fornecedoresAtivos: 18,
  }

  const vendasPorMes = [
    { mes: 'Jan', valor: 18 },
    { mes: 'Fev', valor: 26 },
    { mes: 'Mar', valor: 32 },
    { mes: 'Abr', valor: 21 },
    { mes: 'Mai', valor: 37 },
    { mes: 'Jun', valor: 29 },
  ]

  const maxValor = Math.max(...vendasPorMes.map((v) => v.valor))

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Visão geral</h2>

      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Card.Title className="mb-0">Clientes</Card.Title>
                <FaUsers className="text-primary fs-3" />
              </div>
              <Card.Text className="display-6 fw-bold">{stats.totalClientes}</Card.Text>
              <small className="text-muted">Clientes cadastrados no sistema</small>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Card.Title className="mb-0">Produtos em estoque</Card.Title>
                <FaBoxOpen className="text-success fs-3" />
              </div>
              <Card.Text className="display-6 fw-bold">{stats.produtosEstoque}</Card.Text>
              <small className="text-muted">Itens disponíveis para venda</small>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Card.Title className="mb-0">Fornecedores ativos</Card.Title>
                <FaTruck className="text-warning fs-3" />
              </div>
              <Card.Text className="display-6 fw-bold">{stats.fornecedoresAtivos}</Card.Text>
              <small className="text-muted">Parceiros cadastrados</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={8}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title className="mb-0">Vendas por mês</Card.Title>
                <FaChartLine className="text-info fs-4" />
              </div>

              {vendasPorMes.map((item) => (
                <div key={item.mes} className="mb-2">
                  <div className="d-flex justify-content-between">
                    <span>{item.mes}</span>
                    <small className="text-muted">{item.valor}k</small>
                  </div>
                  <ProgressBar
                    now={(item.valor / maxValor) * 100}
                    variant="info"
                    className="mt-1"
                  />
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title className="mb-3">Atalhos rápidos</Card.Title>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">• Cadastrar novo cliente</li>
                <li className="mb-2">• Cadastrar novo produto</li>
                <li className="mb-2">• Cadastrar novo fornecedor</li>
                <li className="mb-2">• Consultar últimas vendas</li>
              </ul>
              <small className="text-muted">
                Os dados desta dashboard são apenas ilustrativos para demonstração.
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Inicial