import {
  users,
  products,
  createUser,
  getAllUsers,
  createProduct,
  getAllProducts,
  searchProductsByName,
} from "./database";

//console.log("Hello world!");
//console.log(users);
//console.log(products);

//console.log(createUser("u003", "Astrodev", "astrodev@email.com", "astrodev99"));
//console.log(getAllUsers);

//console.log(createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://images.unsplash.com/photo"));
//console.log(getAllProducts());

//console.log(searchProductsByName("Mochila"))

// Exercicio 1 (API Express) - Configurar Express e Script

import express, { Request, Response } from "express";
import cors from "cors";
import { TProduct, Tusers } from "./types";

const app = express();

app.use(express.json());
app.use(cors());

// Testando o servidor e a requisição GET no Postman com "/Ping"

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

// Exercício 2) criar endpoints para automatizar a manipulação dos dados do arquivo database.ts.

// Get All Users

  app.get("/users", (req: Request, res: Response) => {
    try {
    const result: Tusers[] = users;
    res.status(200).send(result);  
    } catch (error) {}
  });

// Get All Products

app.get("/products", (req: Request, res: Response) => {
  try {
    const query: string | undefined = req.query.q as string | undefined; // Query vai ser string ou undefined

    if (query !== undefined && query.length === 0) {
      // Se tiver query na busca "q?=" e não tiver nada no value, lança um erro
      throw new Error("O parâmetro 'q' deve conter pelo menos um caractere.");
    }

    // Lógica para buscar todos os produtos ou filtrar por query params, dependendo do valor de 'query'

    let result: TProduct[] = products;

    if (query !== undefined) {
      result = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
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

// Exercício 3) - criar produtos e usuários

// Create new users / new products

app.post("/users", (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;

    // Verifica se já existe um usuário com a mesma ID
    const idExist = users.find((user) => user.id === id);
    if (idExist) {
      throw new Error("Desculpe, já existe um usuário com a mesma ID, por favor insira uma nova ID.");
    }

    // Verifica se já existe um usuário com o mesmo email
    const emailExist = users.find((user) => user.email === email);
    if (emailExist) {
      throw new Error("Desculpe, já existe um usuário com o mesmo email, por favor insira um novo email.");
    }
    
    // Verifica se os dados estão no formato string
    if (
      typeof id === "string" &&
      typeof name === "string" &&
      typeof email === "string" &&
      typeof password === "string"
      ) {
      const newUser: Tusers = { id, name, email, password, createdAt: new Date().toISOString() };
      users.push(newUser);
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

app.post("/products", (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl } = req.body;

    // Verifica se já existe um produto com a mesma ID
      const idExist = products.find((product) => product.id === id);
      if (idExist) {
      throw new Error("Desculpe, já existe um produto com a mesma ID, por favor insira uma nova ID.");
    }
      
    // Verifica se todos os campos estão no formato correto
    if (
      typeof id === "string" &&
      typeof name === "string" &&
      typeof price === "number" &&
      typeof description === "string" &&
      typeof imageUrl === "string"
    ) {
      const newProduct: TProduct = { id, name, price, description, imageUrl };
      products.push(newProduct);
      res.status(201).send("Produto cadastrado com sucesso!");
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

// Delete Users / Products

app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    // Verifica se o ID existe antes de tentar deletar

    const indexToDelete = users.findIndex((user) => user.id === idToDelete);    
    if (indexToDelete === -1) {
      throw new Error("Desculpe, o ID do usuário não consta em nosso banco de dados, por favor insira uma ID existente.");   
    } else {
    users.splice(indexToDelete, 1);
      res.status(200).send({ message: "O usuário foi deletado com sucesso" });      
    }
    
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send("Ocorreu um erro inesperado.");
    }
  }
});

app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    // Verifica se o ID existe antes de tentar deletar

    const indexToDelete = products.findIndex((product) => product.id === idToDelete);    
    if (indexToDelete === -1) {
      throw new Error("Desculpe, o ID do produto não consta em nosso banco de dados, por favor insira uma ID existente.");   
    } else {
    products.splice(indexToDelete, 1);
      res.status(200).send({ message: "O produto foi deletado com sucesso" });      
    }
    
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send("Ocorreu um erro inesperado.");
    }
  }
});

// Edit Products

app.put("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const newName = (req.body.name as string) || undefined;
  const newPrice = req.body.price as number;
  const newDescription = (req.body.description as string) || undefined;
  const newImageUrl = (req.body.imageUrl as string) || undefined;


  // Verifica se o produto existe antes de editar

  const product = products.find((product) => product.id === id);

  if (!product) {
    res.status(404).send({ message: "Produto não encontrado." });
    return;
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
    product.name = newName;
  }

  if (newDescription !== undefined) {
    product.description = newDescription;
  }

  if (!isNaN(newPrice)) {
    product.price = newPrice;
  }

  if (newImageUrl !== undefined) {
    product.imageUrl = newImageUrl;
  }

  res.status(200).send({ message: "O item foi alterado com sucesso" });
})

// Edit Users

app.put("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const newName = (req.body.name as string) || undefined
  const newEmail = (req.body.email as string) || undefined
  const newPassword = (req.body.password as string) || undefined
  const newcreatedAt = (req.body.createdAt as string) || undefined


  // Verifica se o usuário existe antes de editar

  const user = users.find((user) => user.id === id)

  if (!user) {
    res.status(404).send({ message: "Usuário não encontrado." })
    return
  }

  // Verifica se os dados opcionais estão no formato correto, se fornecidos

  if (
    (newName && typeof newName !== "string") ||
    (newEmail && typeof newEmail !== "string") || 
    (newPassword && typeof newPassword !== "string") || 
    (newcreatedAt && typeof newcreatedAt !== "string")

  ) {
    res.status(400).send({ message: "Dados incorretos." })
    return;
  }

  // Atualiza os campos somente se um novo valor for fornecido

  if (newName !== undefined) {
    user.name = newName;
  }

  if (newEmail !== undefined) {
    user.email = newEmail;
  }

  if (newPassword !== undefined) {
    user.password = newPassword
  }

  if (newcreatedAt !== undefined) {
    user.createdAt = newcreatedAt
  }

  res.status(200).send({ message: "O usuário foi alterado com sucesso" })
})