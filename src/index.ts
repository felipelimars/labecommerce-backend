import { users, products, createUser, getAllUsers, createProduct, getAllProducts, searchProductsByName } from "./database";

//console.log("Hello world!");
//console.log(users);
//console.log(products);


//console.log(createUser("u003", "Astrodev", "astrodev@email.com", "astrodev99"));
//console.log(getAllUsers);

//console.log(createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://images.unsplash.com/photo"));
//console.log(getAllProducts());

//console.log(searchProductsByName("Mochila"))


// Exercicio 1 (API Express) - Configurar Express e Script

import express, { Request, Response } from 'express'
import cors from 'cors'
import { TProduct, Tusers } from "./types";

const app = express()

app.use(express.json())
app.use(cors())

// Testando o servidor e a requisição GET no Postman com "/Ping"

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

// Exercício 2) criar endpoints para automatizar a manipulação dos dados do arquivo database.ts.

// Get All Users

app.get('/users', (req: Request, res: Response) => {
    const result: Tusers[] = users
    res.status(200).send(result)
})

// Get All Products

app.get('/products', (req: Request, res: Response) => {
    const result: TProduct[] = products
    res.status(200).send(result)
})

// Get Products By Name

app.get('/product/search', (req: Request, res: Response) => {
    const query: string = req.query.q as string;
    const result: TProduct[] = products
    
    const productsByName: TProduct[] = products.filter(product => product.name.toLowerCase() === query.toLowerCase()) 
    res.status(200).send(productsByName)
})

// Exercício 3) - Mesmo fluxo do exercício 2, criar produtos e usuários

app.post('/users', (req: Request, res: Response) => {
    const { id, name, email, password, createdAt }: Tusers = req.body
    const newUser: Tusers = { id, name, email, password, createdAt }
    users.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso!")
})

app.post('/products', (req: Request, res: Response) => {
    const { id, name, price, description, imageUrl }: TProduct = req.body
    const newProduct: TProduct = { id, name, price, description, imageUrl }
    products.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso!")
}) 