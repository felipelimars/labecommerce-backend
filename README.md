# Labecommerce API

Esta é a **documentação** da API Labecommerce, que oferece endpoints para gerenciar _usuários_ e _produtos_.

## Endpoints

### Get all users

- **Descrição**: Retorna todos os _usuários cadastrados_.
- **Método**: GET
- **URL**: `/users`

### Get all products

- **Descrição**: Retorna todos os _produtos cadastrados_. Você pode filtrar os resultados por palavras-chave no nome do produto usando _query params_.
- **Método**: GET
- **URL**: `/products`
- **Exemplo de consulta com palavra-chave**: `/products?q=camiseta`

### Get product by name

- **Descrição**: Retorna _produtos com base no nome fornecido_. Funciona da mesma forma que o endpoint "Get all products", mas com filtro por nome.
- **Método**: GET
- **URL**: `/products/:name`
- **Exemplo de consulta por nome**: `/products/camiseta`

### Create new user

- **Descrição**: Cria um **novo usuário**.
- **Método**: POST
- **URL**: `/users`
- **Corpo da solicitação**: JSON com os dados do usuário a ser criado.

### Create new product

- **Descrição**: Cria um **novo produto**.
- **Método**: POST
- **URL**: `/products`
- **Corpo da solicitação**: JSON com os dados do produto a ser criado.

### Delete user by id

- **Descrição**: Deleta um _usuário com base no ID fornecido_.
- **Método**: DELETE
- **URL**: `/users/:id`

### Delete product by id

- **Descrição**: Deleta um _produto com base no ID fornecido_.
- **Método**: DELETE
- **URL**: `/products/:id`

### Edit product by id

- **Descrição**: Edita um _produto com base no ID fornecido_.
- **Método**: PUT
- **URL**: `/products/:id`
- **Corpo da solicitação**: JSON com os dados do produto a ser editado.

### Edit user by id

- **Descrição**: Edita um _usuário com base no ID fornecido_.
- **Método**: PUT
- **URL**: `/users/:id`
- **Corpo da solicitação**: JSON com os dados do usuário a ser editado.

## Postman

Para testar os endpoints da API, você pode usar o [**Postman**](https://documenter.getpostman.com/view/28315812/2s9YC8xBvZ). Basta importar a coleção no Postman para começar a fazer solicitações e testar os diferentes recursos da API.

Certifique-se de incluir os dados corretos no corpo da solicitação ao criar novos usuários ou produtos e ao editar produtos existentes.
