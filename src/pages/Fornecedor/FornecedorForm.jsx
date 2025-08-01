import React, { useEffect } from 'react'
import { Container, Form, OverlayTrigger, Tooltip, Row, Col, Button, Modal } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { FaCheckCircle, FaQuestionCircle } from 'react-icons/fa'
import { useState } from 'react'
import axios from 'axios'

const FornecedorForm = () => {

    // Estou verificando se existe o ID na URL
    const { id } = useParams()

    // useEffect para carregar as informações para editar
    useEffect(() => {
        if (id) {
            axios.get(`${apiUrl}/fornecedores/${id}`)
            .then(response => setFornecedor(response.data))
            .catch(error => console.error("Houve um erro ao carregar o fornecedor: ", error))
        }
    }, [id])

    const navigate = useNavigate()
    
    const apiUrl = import.meta.env.VITE_API_URL

    const [modalAberto, setModalAberto] = useState(false)

    const [fornecedor, setFornecedor] = useState({
        nome: "",
        email: "",
        cnpj: "",
        tipoFornecedor: "COMUM",
        endereco: {
            cep: "",
            logradouro: "",
            numero: "",
            complemento: "",
            bairro: "",
            cidade: "",
            estado: "",
            pais: 'Brasil'
        }
    })

    const handleEndereco = (campo, valor) => {
        setFornecedor((prev) => ({
            ...prev,
            endereco: { ...prev.endereco, [campo]: valor }
        }))
    }

    const handleCepChange = (e) => {
        // Tem que estar pronto para mudar também o endereço completo
        handleEndereco('cep', e.target.value )
    }

    useEffect(() => {
        const cep = fornecedor.endereco.cep.replace(/\D/g, '')
        if (cep.length === 8) {
            axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => {
                handleEndereco('logradouro', response.data.logradouro)
                handleEndereco('bairro', response.data.bairro)
                handleEndereco('cidade', response.data.localidade)
                handleEndereco('estado', response.data.estado)
            })
            .catch(error => console.error("Houve um erro ao buscar o endereço no viacep: ", error))
        }
    }, [fornecedor.endereco.cep])

    const handleSubmit = (e) => {
        e.preventDefault()

        const fornecedorData = {
            ...fornecedor,
            cnpj: fornecedor.cnpj.replace(/[^\d]/g, '')
        }

        const request = id
        ? axios.put(`${apiUrl}/fornecedores/${id}`, fornecedorData)
        : axios.post(`${apiUrl}/fornecedores/`, fornecedorData)

        request.then(() => setModalAberto(true))
        .catch(error => console.error("Erro ao cadastrar/editar fornecedor: ", error))


        /*axios.post(`${apiUrl}/fornecedores`, fornecedorData)
        .then(response => {
            console.log("Fornecedor cadastro com sucesso: ", response)
            setModalAberto(true)
        })
        .catch(error => console.error("Erro ao cadastrar fornecedor: ", error))*/
    }

  return (
    <Container className="mt-4">
        <h2 className="mb-4 d-flex align-items-center">
            { id ? 'Editar Fornecedor' : 'Adicionar Fornecedor'}
            
            <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Preencha os dados do fornecedor</Tooltip>}
            >
                <span className="ms-2" style={{ cursor: 'pointer' }}>
                    <FaQuestionCircle />
                </span>
            </OverlayTrigger>
        </h2>

        <Form onSubmit={handleSubmit}>

            { /* Campo Nome */ }
            <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    type="text"
                    required
                    value={fornecedor.nome}
                    onChange={e => setFornecedor({ ...fornecedor, nome: e.target.value })}
                />
            </Form.Group>


            { /* Campo Email */ }

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    required
                    value={fornecedor.email}
                    onChange={e => setFornecedor({ ...fornecedor, email: e.target.value })}
                />
            </Form.Group>

            { /* Campo CNPJ */ }

            <Form.Group className="mb-3">
                <Form.Label>CNPJ</Form.Label>
                <Form.Control
                    type="text"
                    required
                    value={fornecedor.cnpj}
                    onChange={e => setFornecedor({ ...fornecedor, cnpj: e.target.value })}
                />
            </Form.Group>

            { /* Select para tipo fornecedor */ }

            <Form.Group className="mb-3">
               <Form.Label>Tipo Fornecedor</Form.Label>
               <Form.Select
                value={fornecedor.tipoFornecedor}
                onChange={e => setFornecedor({ ...fornecedor, tipoFornecedor: e.target.value })}
               >
                <option value="COMUM">COMUM</option>
                <option value="PREMIUM">PREMIUM</option>
                </Form.Select> 

            </Form.Group>

            { /* Campos de Endereço */ }
                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>CEP</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex: 58000-000"
                                value={fornecedor.endereco.cep}
                                onChange={handleCepChange}
                                autoComplete="off"
                                required
                            />
                        </Form.Group>
                    
                    </Col>
                    <Col md={8}>
                        <Form.Group className="mb-3">
                            <Form.Label>Logradouro</Form.Label>
                            <Form.Control
                                type="text"                            
                                value={fornecedor.endereco.logradouro}
                                onChange={e => handleEndereco('logradouro', e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Número</Form.Label>
                            <Form.Control
                                type="text"
                                value={fornecedor.endereco.numero}
                                onChange={e => handleEndereco('numero', e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col md={8}>
                        <Form.Group className="mb-3">
                            <Form.Label>Complemento</Form.Label>
                            <Form.Control
                                type="text"
                                value={fornecedor.endereco.complemento}
                                onChange={e => handleEndereco('complemento', e.target.value)}
                            />
                         </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Bairro</Form.Label>
                            <Form.Control
                                type="text"
                                value={fornecedor.endereco.bairro}
                                onChange={e => handleEndereco('bairro', e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control
                                type="text"
                                value={fornecedor.endereco.cidade}
                                onChange={e => handleEndereco('cidade', e.target.value)}
                                required
                            />
                         </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                type="text"
                                value={fornecedor.endereco.estado}
                                onChange={e => handleEndereco('estado', e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>País</Form.Label>
                            <Form.Control
                                type="text"
                                value={fornecedor.endereco.pais}
                                onChange={e => handleEndereco('pais', e.target.value)}
                            />
                         </Form.Group>
                    </Col>
                </Row>

                <Button type="submit" variant="success">
                    Salvar
                </Button>

        </Form>

        {/* Modal de Sucesso */}

        <Modal show={modalAberto} onHide={() => { setModalAberto(false); navigate('/listar-fornecedores') }}>
            <Modal.Header closeButton>
                <Modal.Title>
                   <FaCheckCircle className="text-success me-2" /> Sucesso:
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Fornecedor adicionado com sucesso!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => navigate( '/listar-fornecedores')}>Fechar</Button>
                </Modal.Footer>
        </Modal>

    </Container>
  )
}

export default FornecedorForm