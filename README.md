# Meu Sistema Front-end

Projeto Front-end em ReactJS do Curso Presencial Programação Fullstack

## Bibliotecas:
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