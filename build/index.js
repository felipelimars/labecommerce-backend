"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
//console.log("Hello world!");
//console.log(users);
//console.log(products);
//console.log(createUser("u003", "Astrodev", "astrodev@email.com", "astrodev99"));
//console.log(getAllUsers);
//console.log(createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://images.unsplash.com/photo"));
//console.log(getAllProducts());
//console.log(searchProductsByName("Mochila"))
// Exercicio 1 (API Express) - Configurar Express e Script
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Testando o servidor e a requisição GET no Postman com "/Ping"
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get('/ping', (req, res) => {
    res.send('Pong!');
});
// Exercício 2) criar endpoints para automatizar a manipulação dos dados do arquivo database.ts.
// Get All Users
app.get('/users', (req, res) => {
    const result = database_1.users;
    res.status(200).send(result);
});
// Get All Products
app.get('/products', (req, res) => {
    const result = database_1.products;
    res.status(200).send(result);
});
// Get Products By Name
app.get('/product/search', (req, res) => {
    const query = req.query.q;
    const result = database_1.products;
    const productsByName = database_1.products.filter(product => product.name.toLowerCase() === query.toLowerCase());
    res.status(200).send(productsByName);
});
// Exercício 3) - Mesmo fluxo do exercício 2, criar produtos e usuários
app.post('/users', (req, res) => {
    const { id, name, email, password, createdAt } = req.body;
    const newUser = { id, name, email, password, createdAt };
    database_1.users.push(newUser);
    res.status(201).send("Cadastro realizado com sucesso!");
});
app.post('/products', (req, res) => {
    const { id, name, price, description, imageUrl } = req.body;
    const newProduct = { id, name, price, description, imageUrl };
    database_1.products.push(newProduct);
    res.status(201).send("Produto cadastrado com sucesso!");
});
