
import React, { useState } from 'react'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('USER')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    setSuccessMessage(null)

    try {
      await api.post('/auth/register', {
        username,
        password,
        email,
        role,
      })

      setSuccessMessage('Usuário criado com sucesso. Você já pode fazer login.')

      setTimeout(() => {
        navigate('/login', { state: { registered: true } })
      }, 1200)
    } catch (err) {
      const backendMessage = err?.response?.data?.message
      setError(backendMessage || 'Erro ao criar usuário. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ minWidth: '320px', maxWidth: '420px' }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">Criar conta</Card.Title>

          {successMessage && (
            <Alert variant="success" className="mb-3">
              {successMessage}
            </Alert>
          )}

          {error && !successMessage && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Usuário</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite um nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Crie uma senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nível de acesso</Form.Label>
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="USER">Usuário Comum</option>
                <option value="ADMIN">Administrador</option>
              </Form.Select>
            </Form.Group>

            <div className="d-grid gap-2 mb-3">
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? 'Cadastrando...' : 'Cadastrar'}
              </Button>
            </div>

            <div className="text-center">
              <Button
                variant="link"
                type="button"
                className="p-0"
                onClick={() => navigate('/login')}
              >
                Já tem uma conta? Fazer login
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default RegisterPage