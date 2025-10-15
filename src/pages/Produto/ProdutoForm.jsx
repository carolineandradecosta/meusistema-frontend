import React, { useEffect } from "react";
import {
  Button,
  Container,
  Form,
  OverlayTrigger,
  Tooltip,
  Modal,
} from "react-bootstrap";
import { FaQuestionCircle, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProdutoForm = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState({
    nome: "",
    preco: "",
    descricao: "",
    quantidadeEstoque: "",
    fornecedorId: "",
  });

  const [fornecedores, setFornecedores] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);

  const handlePrecoChange = (e) => {
    let valor = e.target.value;

    // Substituir vírgula por ponto
    valor = valor.replace(",", ".");

    // Remover caracteres que não sejam dígitos ou ponto
    valor = valor.replace(/[^0-9.]/g, "");

    // Garantir que tenha no máximo um ponto e duas casas decimais
    if (valor.includes(".")) {
      const [parteInteira, parteDecimal] = valor.split(".");
      valor =
        parteInteira + "." + (parteDecimal ? parteDecimal.slice(0, 2) : "");
    }

    // Atualizar o estado do produto com o valor formatado
    setProduto({ ...produto, preco: valor });
  }

  useEffect(() => {
    axios
      .get(`${apiUrl}/fornecedores`)
      .then((response) => setFornecedores(response.data))
      .catch((error) =>
        console.error("Houve um erro ao carregar fornecedores: ", error)
      );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${apiUrl}/produtos`, produto)
      .then((response) => {
        console.log("Produto cadastrado com sucesso: ", response);
        setModalAberto(true);
      })
      .catch((error) => console.error("Erro ao cadastrar produto: ", error));
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4" d-flex align-itrms-center>
        {id ? "Editar Produto" : "Adicionar Produto"}

        <OverlayTrigger
          placement="right"
          overlay={<Tooltip>Preencha os dados do Produto</Tooltip>}
        >
          <span className="ms-2" style={{ cursor: "pointer" }}>
            <FaQuestionCircle />
          </span>
        </OverlayTrigger>
      </h2>

      <Form onSubmit={handleSubmit}>
        {/* Campo Nome do Produto */}

        <Form.Group className="mb-3">
          <Form.Label>Nome do Produto</Form.Label>
          <Form.Control
            type="text"
            required
            value={produto.nome}
            onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
          />
        </Form.Group>

        {/* Campo Preço */}

        <Form.Group className="mb-3">
          <Form.Label>Preço</Form.Label>
          <Form.Control
            type="text"
            required
            value={produto.preco}
            onChange={handlePrecoChange}
          />
        </Form.Group>

        {/* Campo Descrição */}

        <Form.Group className="mb-3">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            type="text"
            required
            value={produto.descricao}
            onChange={(e) =>
              setProduto({ ...produto, descricao: e.target.value })
            }
          />
        </Form.Group>

        {/* Campo Quantidade */}

        <Form.Group className="mb-3">
          <Form.Label>Quantidade em Estoque</Form.Label>
          <Form.Control
            type="number"
            required
            value={produto.quantidadeEstoque}
            onChange={(e) =>
              setProduto({ ...produto, quantidadeEstoque: e.target.value })
            }
          />
        </Form.Group>

        {/* Campo Fornecedor */}

        <Form.Group className="mb-3">
          <Form.Label>Fornecedor</Form.Label>
          <Form.Select
            required
            value={produto.fornecedorId}
            onChange={(e) =>
              setProduto({ ...produto, fornecedorId: e.target.value })
            }
          >
            <option>Selecione um fornecedor</option>
            {fornecedores.map((fornecedor) => (
              <option key={fornecedor.id} value={fornecedor.id}>
                {fornecedor.nome}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="success">
          Salvar
        </Button>
      </Form>

      {/* Modal de Sucesso */}

      <Modal
        show={modalAberto}
        onHide={() => {
          setModalAberto(false);
          navigate("/listar-produtos");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FaCheckCircle className="text-success me-2" /> Sucesso:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {id
            ? "Produto editado com sucesso"
            : "Produto adicionado com sucesso"}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => navigate("/listar-produtos")}
          >
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProdutoForm;
