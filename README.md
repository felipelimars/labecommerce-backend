# Labecommerce

[Labecommerce API](https://documenter.getpostman.com/view/28315812/2s9YC8xBvZ)

Esta é a **documentação** da Labecommerce um projeto backend de uma API vinculada a um banco de dados real, que oferece endpoints para gerenciar _usuários_ , _produtos_ e _pedidos_.

### Conteúdos abordados

· NodeJS
· Typescript
· Express
· Knex
· SQL
· SQLite
· Postman

### Modelagem de relação entre as tabelas.

![image](https://github.com/labenuexercicios/projeto-labecommerce/assets/29845719/b446bbb0-bc9c-42d9-be04-b9ce1d605bd4)
https://dbdiagram.io/d/63c6e8e5296d97641d7a4666

<br>

## Endpoints

### Get all users

- **Descrição**: Retorna todos os _usuários cadastrados_.
- **Método**: GET
- **URL**: `/users`

### Get all products

- **Descrição**: Retorna todos os _produtos cadastrados_.
- **Método**: GET
- **URL**: `/products`

### Get product by name

- **Descrição**: Retorna _produtos com base no nome fornecido_. Funciona da mesma forma que o endpoint "Get all products", mas com filtro por nome.
- **Método**: GET
- **URL**: `/products/:name`
- **Exemplo de consulta com palavra-chave**: `/products?q=gamer`

### Get purchase by ID

- **Descrição**: Retorna _pedidos com base no ID fornecido_.
- **Método**: GET
- **URL**: `/purchases/:id`
- **Exemplo de consulta com palavra-chave**: `/purchases/01`

### Create user

- **Descrição**: Cria um **novo usuário**.
- **Método**: POST
- **URL**: `/users`
- **Corpo da solicitação**: body: raw formato JSON com os dados do usuário a ser criado.

### Create product

- **Descrição**: Cria um **novo produto**.
- **Método**: POST
- **URL**: `/products`
- **Corpo da solicitação**: body: raw formato JSON com os dados do produto a ser criado.

### Create purchase

- **Descrição**: Cria um **novo pedido**.
- **Método**: POST
- **URL**: `/purchases`
- **Corpo da solicitação**: body: raw formato JSON com os dados do pedido a ser criado.

### Delete user by id

- **Descrição**: Deleta um _usuário com base no ID fornecido_.
- **Método**: DELETE
- **URL**: `/users/:id`
- **Exemplo da URL como remover**: `/users/01`

### Delete product by id

- **Descrição**: Deleta um _produto com base no ID fornecido_.
- **Método**: DELETE
- **URL**: `/products/:id`
- **Exemplo da URL para remover**: `/products/01`
  
### Delete purchase by id

- **Descrição**: Deleta um _pedido com base no ID fornecido_.
- **Método**: DELETE
- **URL**: `/purchases/:id`
- **Exemplo da URL para remover**: `/purchases/01`

### Edit product by id

- **Descrição**: Edita um _produto com base no ID fornecido_.
- **Método**: PUT
- **URL**: `/products/:id`
- **Exemplo da URL para editar**: `/products/01`
- **Corpo da solicitação**: body: raw formato JSON com os dados do produto a ser editado.

### Edit user by id

- **Descrição**: Edita um _usuário com base no ID fornecido_.
- **Método**: PUT
- **URL**: `/users/:id`
- **Exemplo da URL para remover**: `/users/01`
- **Corpo da solicitação**: body: raw formato JSON com os dados do usuário a ser editado.

## Postman

Para testar os endpoints da API, você pode usar o [**Postman**](https://documenter.getpostman.com/view/28315812/2s9YC8xBvZ). Basta importar a coleção no Postman para começar a fazer solicitações e testar os diferentes recursos da API.

Certifique-se de incluir os dados corretos no corpo da solicitação (body) ao criar novos usuários ou produtos e ao editar produtos existentes.

### Como instalar e executar o projeto

## Pré-requisitos

Antes de começar, certifique-se de atender aos seguintes requisitos:

- Node.js e VScode instalados em sua máquina.

## Instalação

Siga os passos abaixo para instalar e executar o projeto:

1. Copie o link do repositório do GitHub: https://github.com/felipelimars/labecommerce-backend.git

2. Abra o projeto no Visual Studio Code (ou em seu editor de código preferido).

3. No terminal do VS Code (ou qualquer terminal de sua preferência), navegue até o diretório do projeto e execute git clone + link-do-repositorio

4. Instale as dependências do projeto utilizando o comando: npm install

5. Inicie o servidor de desenvolvimento utilizando o comando: npm run dev

Agora o servidor está em execução e conectado com a API.



