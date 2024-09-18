
# Armazenamento de Dados da API do GitHub

Este projeto é uma API RESTful construída usando Node.js e o ORM Sequelize, projetada para interagir com a API do GitHub. Ele busca dados de usuários e informações de repositórios da API do GitHub, armazena em um banco de dados PostgreSQL e permite a manipulação dos dados armazenados utilizando operações REST padrão (GET, POST, PUT, DELETE).

## Funcionalidades

- **Buscar Dados de Usuário do GitHub**: Recupera informações como login, nome, localização, bio, contagem de repositórios públicos e mais, para qualquer usuário especificado do GitHub.
- **Buscar Dados de Repositórios do GitHub**: Recupera informações de repositórios, como nome, descrição, linguagem, forks e mais, para o usuário especificado.
- **Armazenamento em PostgreSQL**: Todos os dados são armazenados em um banco de dados PostgreSQL, tornando-os persistentes e consultáveis via endpoints da API.
- **Operações REST**:
  - `GET /api/users/:username` – Recupera um usuário e seus repositórios do banco de dados.
  - `POST /api/users` – Armazena um novo usuário e seus repositórios a partir do GitHub.
  - `PUT /api/users/:id` – Atualiza as informações de um usuário no banco de dados.
  - `DELETE /api/users/:id` – Exclui um usuário e seus repositórios do banco de dados.

## Tecnologias Utilizadas

- **Node.js**: Framework de backend para construção da API.
- **Express.js**: Framework web para gerenciamento de rotas da API e métodos HTTP.
- **Sequelize**: ORM para interação com o banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados para persistir os dados de usuários e repositórios.
- **Axios**: Utilizado para fazer requisições HTTP à API do GitHub.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Eduardo4815162342/github-api
   cd github-api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o banco de dados PostgreSQL:
   - Crie um banco de dados PostgreSQL (por exemplo, `github_db`).
   - Atualize a configuração do banco de dados em `config/database.js`.

4. Inicie a aplicação:
   ```bash
   node index.js
   ```

## Uso

- Use o Postman ou qualquer cliente HTTP para interagir com a API.
- **Exemplo de requisição POST para buscar e armazenar um usuário do GitHub**:
  ```bash
  POST /api/users
  Body: { "username": "facebook" }
  ```

- **Exemplo de requisição GET para recuperar um usuário e seus repositórios**:
  ```bash
  GET /api/users/facebook
  ```

- **Exemplo de requisição PUT para atualizar um usuário no banco de dados**:
  ```bash
  PUT /api/users/:id
  Body: { "name": "Novo Nome", "location": "Nova Localização", "bio": "Nova Biografia" }
  ```

- **Exemplo de requisição DELETE para remover um usuário e seus repositórios do banco de dados**:
  ```bash
  DELETE /api/users/:id
  ```
