# 📦 Gerenciador de Produtos (Frontend)

## 💻 Descrição do Projeto

Este repositório contém a interface de usuário (Frontend) da aplicação **Gerenciador de Produtos**. Ele é a camada visual responsável por toda a interação do usuário com a API de Back-end.

O objetivo principal deste projeto é fornecer uma interface **intuitiva e responsiva** para o gerenciamento completo de recursos essenciais, funcionando como o painel de controle do sistema.

### 📌 Funcionalidades Chave

O Frontend implementa o **CRUD (Criação, Leitura, Atualização e Exclusão)** completo, permitindo a gestão das seguintes entidades, que são gerenciadas pelo Back-end:

* **Clientes**
* **Fornecedores**
* **Produtos**
* **Usuários**
* **Endereços**

---

## 🛠️ Bibliotecas:
- axios
- json-server
- react-bootstrap bootstrap
- react-icons
- react-input-mask

```bash
npm install react-router-dom axios json-server react-bootstrap bootstrap react-icons react-input-mask
```
### Lembre-se, é necessário importar o bootstrap no arquivo main.jsx

```js
import 'bootstrap/dist/css/bootstrap.min.css'
```
### Configuração do JSON-SERVER:

- No packege.json, insira um script novo:
```json
"server": "json-server --watch data/db.json"
```
- Crie uma pasta e arquivo: data/db.json (NA RAIZ)
- Dentro dela inicialize as tabelas do banco de dados:

```json
{
    "fornecedores": [],
    "produtos": [],
    "clientes": []
}
```

## 🔗 API de Integração (Backend)

O Frontend consome a **API Gerenciador de Produtos**, que é o núcleo de processamento e dados do sistema.

**Repositório:** [carolineandradecosta/meusistema-backend](https://github.com/carolineandradecosta/meusistema-backend)

---

## 📌 Status do Projeto
🚧 Em andamento – novas funcionalidades ainda estão sendo implementadas.
