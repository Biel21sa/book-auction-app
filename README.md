# Book Auction App

Esta aplicação permite que vendedores cadastrem livros disponíveis para leilão e que compradores façam ofertas nos livros de interesse. Apenas os vendedores podem visualizar todas as ofertas recebidas, enquanto os compradores podem ver o status de suas próprias ofertas.

## Tecnologias Utilizadas

- Frontend: TypeScript, React, Next.js, MaterialUI, Styled-Components
- Backend: TypeScript, Node.js, NestJS, TypeORM, PostgreSQL, Docker

## Configuração e Execução do Projeto

### Pré-requisitos

- Node.js (versão 14 ou superior)
- Docker (para PostgreSQL)
- Yarn (gerenciador de pacotes)

### Passo a Passo

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/Biel21sa/book-auction-app.git
   cd book-auction-app
   ```

2. **Instale as Dependências**

   ```bash
   yarn install
   ```

3. **Configure o Banco de Dados com Docker**

   ```bash
   docker-compose up -d
   ```

4. **Configuração de Variáveis de Ambiente**

   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   DATABASE_URL=postgresql://username:password@localhost:5432/bookauction
   JWT_SECRET=your_jwt_secret

5. **Executar as Migrações do Banco de Dados**

   ```bash
   yarn run migration:run
   ```

6. **Iniciar o Servidor Backend**

   ```bash
   cd backend
   yarn run start:dev
   ```

7. **Iniciar o Servidor Frontend**

   ```bash
   cd frontend
   yarn dev
   ```

## Endpoints da API

### Autenticação

#### Registro de Usuário

Endpoint: `POST /auth/register`

**Exemplo de Requisição:**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Exemplo de Resposta:**

```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com"
}
```

#### Login de Usuário

Endpoint: `POST /auth/login`

**Exemplo de Requisição:**

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Exemplo de Resposta:**

```json
{
  "accessToken": "jwt_token"
}
```

### Livros

#### Listar todos os livros

Endpoint: `GET /books`

**Exemplo de Resposta:**

```json
[
  {
    "id": 1,
    "title": "Livro Exemplo",
    "author": "Autor Exemplo",
    "genre": "Ficção",
    "bids": [
      {
        "id": 1,
        "amount": 100,
        "userId": 2
      }
    ]
  }
]
```

#### Filtrar livros

Endpoint: `GET /books/filter`

Parâmetros de Query:

- `title`: Título do livro
- `author`: Autor do livro
- `genre`: Gênero do livro

**Exemplo de Requisição:**

GET /books/filter?title=Livro&author=Autor&genre=Ficção

**Exemplo de Resposta:**

```json
[
  {
    "id": 1,
    "title": "Livro Exemplo",
    "author": "Autor Exemplo",
    "genre": "Ficção",
    "bids": [
      {
        "id": 1,
        "amount": 100,
        "userId": 2
      }
    ]
  }
]
```

#### Adicionar livro

Endpoint: `POST /books`

**Exemplo de Requisição:**

```json
{
  "title": "Novo Livro",
  "author": "Novo Autor",
  "genre": "Novo Gênero"
}
```

**Exemplo de Resposta:**

```json
{
  "id": 2,
  "title": "Novo Livro",
  "author": "Novo Autor",
  "genre": "Novo Gênero"
}
```

### Lance

#### Adicionar Lance

Endpoint: `POST /books/:id/offer`

**Exemplo de Requisição:**

```json
{
  "amount": 150
}
```

**Exemplo de Resposta:**

```json
{
  "id": 3,
  "amount": 150,
  "bookId": 1,
  "userId": 1
}
```

#### Listar os Três Maiores Lances de um Livro

Endpoint: `GET /books/:id/offers`

**Exemplo de Resposta:**

```json
[
  {
    "id": 3,
    "amount": 150,
    "userId": 1
  },
  {
    "id": 1,
    "amount": 100,
    "userId": 2
  }
]
```

## Executando Teste

**Para executar os testes, use o seguinte comando:**

```bash
yarn test
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Contato

Gabriel Silva Alves: gabriel21silvaalves@gmail.com
Projeto Link: https://github.com/Biel21sa/book-auction

Este `README.md` fornece instruções claras sobre como configurar e executar o projeto localmente, além de uma documentação abrangente dos endpoints da API com exemplos de requisições e respostas.
