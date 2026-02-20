import React, { useState } from 'react'
import { Button, Card, Container, Form, Alert } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { login, error } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)

    const success = await login(username, password)

    setSubmitting(false)

    if (success) {
      navigate('/')
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ minWidth: '320px', maxWidth: '400px' }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">Login</Card.Title>

          {location.state?.registered && (
            <Alert variant="success" className="mb-3">
              Usuário criado com sucesso. Faça login para continuar.
            </Alert>
          )}

          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Usuário</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? 'Entrando...' : 'Entrar'}
              </Button>
            </div>

            <div className="text-center mt-3">
              <Button
                variant="link"
                type="button"
                className="p-0"
                onClick={() => navigate('/register')}
              >
                Não tem uma conta? Cadastre-se
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default LoginPage