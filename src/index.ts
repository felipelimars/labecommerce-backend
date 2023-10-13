import {
  users,
  products,
  createUser,
  getAllUsers,
  createProduct,
  getAllProducts,
  searchProductsByName,
} from "./database";

// Exercicio 1 (API Express) - Configurar Express e Script

import express, { Request, Response } from "express";
import cors from "cors";
import { TProduct, Tusers } from "./types";
import { db } from "./database/knex"

const app = express();

app.use(express.json());
app.use(cors());

// Rodando o servidor na porta 3003 
app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

//Testando com requisição GET no Postman com "/Ping"
app.get("/ping", async (req: Request, res: Response) => {
  res.send("Pong!");
});

// Criação de endpoints para automatizar a manipulação dos dados do arquivo database.ts.
// e posteriormente conectando banco de dados sqlite e knex.

// Get All Users
app.get("/users", async (req: Request, res: Response) => {
    try {
    const result: Tusers[] = await db.raw(`SELECT * FROM users`)
    res.status(200).send(result);  
    } catch (error) {
      if (req.statusCode === 200) {
        res.status(500);
      }
  
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
});

// Get All Products
app.get("/products", async (req, res) => {
  try {
    const query = req.query.q as string | undefined;

    let result: TProduct[] = [];

    if (query === undefined || query.length === 0) {
      // Se o parâmetro 'q' não for fornecido ou estiver vazio, retorne todos os produtos
      result = await db.raw('SELECT * FROM products');
    } else {
      result = await db.raw('SELECT * FROM products WHERE name LIKE ?', [`%${query.toLowerCase()}%`]);
    }

    res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send("Ocorreu um erro inesperado.");
    }
  }
});

// Get All Purchases
app.get("/purchases", async (req, res) => {
  try {
    const query = req.query.q as string | undefined;

    let result

    if (query === undefined || query.length === 0) {
      // Se o parâmetro 'q' não for fornecido ou estiver vazio, retorne todos os produtos
      result = await db.raw('SELECT * FROM purchases');
    } else {
      result = await db.raw('SELECT * FROM purchases WHERE name LIKE ?', [`%${query.toLowerCase()}%`]);
    }

    res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send("Ocorreu um erro inesperado.");
    }
  }
});

// Get Products By Name
app.get("/product/search", (req: Request, res: Response) => {
  const query: string = req.query.q as string;
  const result: TProduct[] = products;

  const productsByName: TProduct[] = products.filter(
    (product) => product.name.toLowerCase() === query.toLowerCase()
  );
  res.status(200).send(productsByName);
});

// Create new user
app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;

    // Verifica se já existe um usuário com a mesma ID
    const idExist = await db.raw(`SELECT id FROM users WHERE id = "${id}"`);

    if (idExist.length > 0) {
      res.status(400).send
      throw new Error("Desculpe, já existe um usuário com a mesma ID, por favor insira uma nova ID.");
    }

    // Verifica se já existe um usuário com o mesmo email
    const emailExist = await db.raw(`SELECT email FROM users WHERE email = "${email}"`);

    if (emailExist.length > 0) {
    res.status(400).send
    throw new Error("Desculpe, já existe um usuário com o mesmo email, por favor insira um novo email.");  
    }

    // Continuar com a inserção do usuário se o id e o email não existirem
    await db.raw(`INSERT INTO users (id, name, email, password) VALUES ("${id}", "${name}", "${email}", "${password}")`);

    // Verifica se os dados estão no formato string
    if (
      typeof id === "string" &&
      typeof name === "string" &&
      typeof email === "string" &&
      typeof password === "string"
    ) {
      const newUser: Tusers = { id, name, email, password, createdAt: new Date().toISOString() };
      users.push(newUser);

      return res.status(200).send("Cadastro realizado com sucesso!");
    } else {
      throw new Error("Os dados devem ser do formato string.");
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    } else {
      return res.status(500).send("Ocorreu um erro inesperado.");
    }
  }
});

// Create new product
app.post("/products", async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl } = req.body;

    const idExist = await db.raw(`SELECT id FROM products WHERE id = "${id}"`);
    if(idExist.length > 0){
      throw new Error("Desculpe, já existe um produto com a mesma ID, por favor insira uma nova ID.");
      res.status(400)
    }
    // Verifica se todos os campos estão no formato correto
    if (
      typeof id === "string" &&
      typeof name === "string" &&
      typeof price === "number" &&
      typeof description === "string" &&
      typeof imageUrl === "string"
    ) {
      await db.raw(`INSERT INTO products (id, name, price, description, imageUrl)
      VALUES("${id}", "${name}", "${price}", "${description}", "${imageUrl}")
  `);
      res.status(201).send("Cadastro realizado com sucesso!");
    } else if (typeof price !== "number"){
      throw new Error("O preço deve ser um número.");
    } else {
      throw new Error("Os dados devem ser do formato string.");
    }

  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send("Ocorreu um erro inesperado.");
    }
  }
});

// Create new purchase
app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const { id, buyer, total_price } = req.body;
    
    // Verifica se todos os campos estão no formato correto
    if (
      typeof id === "string" &&
      typeof buyer === "string" &&
      typeof total_price === "number"
    ){ 
      // Verifica se o usuário existe
      const [userExists] = await db.raw(`SELECT id FROM users WHERE id = "${buyer}"`);
      if (!userExists) {
        res.status(400)
        throw new Error("O usuário não existe.");
      }

      if (id){
        res.status(400)
        throw new Error("Insira um pedido com novo ID.")
      }

      // Insere a compra no banco de dados
      await db.raw(`INSERT INTO purchases (id, buyer, total_price)
      VALUES("${id}", "${buyer}", "${total_price}")`);

      // Responde com sucesso
      res.status(201).send("Cadastro realizado com sucesso!");
    } else {
      throw new Error("Os dados devem ser do formato string.");
    }

  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send("Ocorreu um erro inesperado.");
    }
  }
});

// Delete Users 
app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const idToDel = req.params.id

    const [searchId] = await db.raw(`
    SELECT id FROM users WHERE id = '${idToDel}'
    `)

    if (!searchId){
      res.statusCode = 400
      throw new Error("Insira um id válido!")
    }

    if (!searchId) {
      res.statusCode = 404
      throw new Error("Id não existe")
    }

    await db.raw(`
    DELETE FROM users WHERE id ='${searchId.id}';
    `)

    res.status(200).send({ message: 'Usuário deletado com sucesso' })
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    }
  }
});

// Delete Products
app.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const idToDel = req.params.id

    const [searchId] = await db.raw(`
    SELECT id FROM products WHERE id = '${idToDel}'
    `)

    if (!searchId){
      res.statusCode = 400
      throw new Error("Insira um id válido!")
    }

    if (!searchId) {
      res.statusCode = 404
      throw new Error("Id não existe")
    }

    await db.raw(`
    DELETE FROM products WHERE id ='${searchId.id}';
    `)

    res.status(200).send({ message: 'Produto deletado com sucesso' })
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    }
  }
})

// Delete Purchase by ID
app.delete('/purchases/:id', async (req: Request, res: Response) => {
  try {
    const idToDel = req.params.id

    const [searchId] = await db.raw(`
    SELECT id FROM purchases WHERE id = '${idToDel}'
    `)

    if (!searchId){
      res.statusCode = 400
      throw new Error("Insira um id válido!")
    }

    if (!searchId) {
      res.statusCode = 404
      throw new Error("Id não existe")
    }

    await db.raw(`
    DELETE FROM purchases WHERE id ='${searchId.id}';
    `)

    res.status(200).send({ message: 'Pedido cancelado com sucesso' })
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    }
  }
})

// Edit Products
app.put("/products/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const newName = (req.body.name as string) || undefined;
  const newPrice = req.body.price as number;
  const newDescription = (req.body.description as string) || undefined;
  const newImageUrl = (req.body.imageUrl as string) || undefined;

  const [products] = await db.raw(`SELECT * FROM products WHERE id = "${id}"`);
  
  if (products) {
    await db.raw(`
      UPDATE products
      SET
        name = "${newName || products.name}",
        price = ${newPrice || products.price},
        description = "${newDescription || products.description}",
        image_url = "${newImageUrl || products.image_url}"
      WHERE id = "${id}"
    `);
  } else {
    res.status(400);
    throw new Error("Id não encontrado");
  }

  // Verifica se os dados opcionais estão no formato correto, se fornecidos

  if (
    (newName && typeof newName !== "string") ||
    (newDescription && typeof newDescription !== "string") || 
    (newPrice !== undefined && isNaN(newPrice)) ||
    (newImageUrl && typeof newImageUrl !== "string")
  ) {
    res.status(400).send({ message: "Dados incorretos." });
    return;
  }

  // Atualiza os campos somente se um novo valor for fornecido

  if (newName !== undefined) {
    products.name = newName;
  }

  if (newDescription !== undefined) {
    products.description = newDescription;
  }

  if (!isNaN(newPrice)) {
    products.price = newPrice;
  }

  if (newImageUrl !== undefined) {
    products.image_url = newImageUrl;
  }

  res.status(200).send({ message: "O item foi alterado com sucesso" });
})

// Edit Users
app.put("/users/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const newName = (req.body.name as string) || undefined
  const newEmail = (req.body.email as string) || undefined
  const newPassword = (req.body.password as string) || undefined

  const [users] = await db.raw(`SELECT * FROM users WHERE id = "${id}"`);

  if (users) {
      await db.raw(`
      UPDATE users SET
      name = "${newName || users.name}" 
      email = "${newEmail ||users.email}"
      password = "${newPassword || users.password}"
      WHERE id = "${id}"
    `);
  } else {
    res.status(400);
    throw new Error("Id não encontrado");
  }

  // Verifica se os dados opcionais estão no formato correto, se fornecidos

  if (
    (newName && typeof newName !== "string") ||
    (newEmail && typeof newEmail !== "string") || 
    (newPassword && typeof newPassword !== "string")
  ) {
    res.status(400).send({ message: "Dados incorretos." })
    return;
  }

  // Atualiza os campos somente se um novo valor for fornecido

  if (newName !== undefined) {
    users.name = newName;
  }

  if (newEmail !== undefined) {
    users.email = newEmail;
  }

  if (newPassword !== undefined) {
    users.password = newPassword
  }
  res.status(200).send({ message: "O usuário foi alterado com sucesso" })
})