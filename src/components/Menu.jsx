import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Menu = () => {
    
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const displayName = user?.username || user?.email || 'Usuário'

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow">
        <Container>
            <Navbar.Brand as={Link} to="/" className="fw-bold">
                MeuSistema
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="menu-principal" />

            <Navbar.Collapse id="menu-principal">

                {isAuthenticated && (
                  <>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/listar-produtos">Produtos</Nav.Link>
                        <Nav.Link as={Link} to="/listar-clientes">Clientes</Nav.Link>
                        <Nav.Link as={Link} to="/listar-fornecedores">Fornecedores</Nav.Link>
                    </Nav>

                    <Nav>
                        <NavDropdown
                            align="end"
                            title={
                                <span>
                                    <FaUserCircle className="me-2" />
                                    {displayName}
                                </span>
                            }
                        >        
                            <NavDropdown.Item disabled>
                                Logado como <strong>{displayName}</strong>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>
                                <FaSignOutAlt className="me-2" />
                                Sair
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                  </>
                )}
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Menu