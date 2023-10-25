import {users} from "./database";
import express, { Request, Response } from "express";
import cors from "cors";
import { TProduct, Tusers } from "./types";
import { db } from "./database/knex"

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

// Get All Users
app.get("/users", async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string | undefined;

    let result: Tusers[] = [];

    if (query === undefined || query.length === 0) {
      // Se o parâmetro 'q' não for fornecido ou estiver vazio, retorne todos os produtos
      result = await db('users');
    } else {
      result = await db('users').select().where('name', 'like', `%${query.toLowerCase()}%`);
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

// Get All Products
app.get("/products", async (req, res) => {
  try {
    const query = req.query.q as string | undefined;

    let result: TProduct[] = [];

    if (query === undefined || query.length === 0) {
      // Se o parâmetro 'q' não for fornecido ou estiver vazio, retorne todos os produtos
      result = await db('products');
    } else {
      result = await db('products').select().where('name', 'like', `%${query.toLowerCase()}%`);
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

    const result = await db('purchases')

    res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send("Ocorreu um erro inesperado.");
    }
  }
});

// Create new user
app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;

    // Verifica se já existe um usuário com a mesma ID
    const idExist = await db('users').select('id').where('id', id).first();

    if (idExist) {
      return res.status(400).send("Desculpe, já existe um usuário com a mesma ID, por favor insira uma nova ID.");
    }

    // Verifica se já existe um usuário com o mesmo email
    const emailExist = await db('users').select('email').where('email', email).first();

    if (emailExist) {
      return res.status(400).send("Desculpe, já existe um usuário com o mesmo email, por favor insira um novo email.");
    }

    // Continuar com a inserção do usuário se o id e o email não existirem
    await db('users').insert({ id, name, email, password });

    // Verifica se os dados estão no formato string
    if (
      typeof id === "string" &&
      typeof name === "string" &&
      typeof email === "string" &&
      typeof password === "string"
    ) {
      const newUser: Tusers = { id, name, email, password, createdAt: new Date().toISOString() };
      users.push(newUser);

      return res.status(201).send("Cadastro realizado com sucesso!");
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

    const existingProduct = await db('products').select('id').where('id', id).first();

    if (existingProduct) {
      throw new Error("Desculpe, já existe um produto com a mesma ID, por favor insira uma nova ID.");
    }

    if (
      typeof id === "string" &&
      typeof name === "string" &&
      typeof price === "number" &&
      typeof description === "string" &&
      typeof imageUrl === "string"
    ) {
      await db('products').insert({
        id,
        name,
        price,
        description,
        imageUrl,
      });

      res.status(201).send("Cadastro realizado com sucesso!");
    } else if (typeof price !== "number") {
      res.status(400).send("O preço deve ser um número.");
    } else {
      res.status(400).send("Os dados devem ser do formato string.");
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
    const { buyer, total_price, purchase_id, product_id, quantity } = req.body;

    if (
      typeof buyer === "string" &&
      typeof total_price === "number"
    ) {
      // Verifica se o usuário existe
      const userExists = await db('users')
        .select('id')
        .where('id', buyer)
        .first();

      if (!userExists) {
        throw new Error("O usuário não existe.");
      }

      // Verifica se o purchase ID já existe
      const idExists = await db('purchases')
        .select('id')
        .where('id', purchase_id)
        .first();

      if (idExists) {
        throw new Error("Já existe um pedido com o mesmo ID. Insira um ID diferente.");
      }

      // Insere a compra no banco de dados
      await db('purchases').insert({
        id : purchase_id,
        buyer,
        total_price,
      });

      await db('purchases_products').insert({
        purchase_id,
        product_id,
        quantity
      })

      // Responde com sucesso
      return res.status(201).send("Pedido realizado com sucesso!");
    } else {
      throw new Error("Os dados devem ser do formato correto (string para 'buyer' e número para 'quantity').");
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    } else {
      return res.status(500).send("Ocorreu um erro inesperado.");
    }
  }
});

// Delete User by ID
app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const idToDel = req.params.id;

    // Verifica se o usuário com o ID existe
    const user = await db('users')
      .select('id')
      .where('id', idToDel)
      .first();

    if (!user) {
      res.status(404);
      throw new Error("ID não existe");
    }

    await db('users')
      .where('id', idToDel)
      .del();

    res.status(200).send({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

// Delete Product by ID
app.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const idToDel = req.params.id;

    // Verifica se o produto com o ID existe
    const product = await db('products')
      .select('id')
      .where('id', idToDel)
      .first();

    if (!product) {
      res.status(404);
      throw new Error("ID não existe");
    }

    await db('products')
      .where('id', idToDel)
      .del();

    res.status(200).send({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

// Delete Purchase by ID
app.delete('/purchases/:id', async (req: Request, res: Response) => {
  try {
    const idToDel = req.params.id;

    // Verifica se a compra com o ID existe
    const purchase = await db('purchases')
      .select('id')
      .where('id', idToDel)
      .first();

    if (!purchase) {
      res.status(404);
      throw new Error("ID não existe");
    }

    await db('purchases')
      .where('id', idToDel)
      .del();

    res.status(200).send({ message: 'Pedido cancelado com sucesso' });
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

// Edit Products
app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newName = req.body.name as string;
    const newPrice = req.body.price as number;
    const newDescription = req.body.description as string;
    const newImageUrl = req.body.imageUrl as string;

    // Verifica se o produto com o ID existe
    const product = await db('products')
      .select('id', 'name', 'price', 'description', 'imageUrl')
      .where('id', id)
      .first();

    if (!product) {
      res.status(404);
      throw new Error("ID não encontrado");
    }

    // Atualiza os campos somente se um novo valor for fornecido
    const updateData: { [key: string]: any } = {};

    if (newName) {
      updateData.name = newName;
    }

    if (newPrice !== undefined) {
      updateData.price = newPrice;
    }

    if (newDescription) {
      updateData.description = newDescription;
    }

    if (newImageUrl) {
      updateData.imageUrl = newImageUrl;
    }

    if (Object.keys(updateData).length > 0) {
      await db('products')
        .where('id', id)
        .update(updateData);
    }

    res.status(200).send({ message: "Produto atualizado com sucesso" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    }
  }
});

// Edit Users
app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newName = req.body.name as string;
    const newEmail = req.body.email as string;
    const newPassword = req.body.password as string;

    // Verifica se o usuário com o ID existe
    const user = await db('users')
      .select('id', 'name', 'email', 'password')
      .where('id', id)
      .first();

    if (!user) {
      res.status(404);
      throw new Error("ID não encontrado");
    }

    // Atualiza os campos somente se um novo valor for fornecido
    const updateData: { [key: string]: any } = {};

    if (newName !== undefined) {
      updateData.name = newName;
    }

    if (newEmail !== undefined) {
      updateData.email = newEmail;
    }

    if (newPassword !== undefined) {
      updateData.password = newPassword;
    }

    if (Object.keys(updateData).length > 0) {
      await db('users')
        .where('id', id)
        .update(updateData);
    }

    res.status(200).send({ message: "O usuário foi alterado com sucesso" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    }
  }
});

// Get Purchase by ID
app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const purchaseId = req.params.id;

    const purchase = await db('purchases')
      .select('purchases.id as purchaseId', 'buyer as buyerId', 'total_price as totalPrice', 'created_at as createdAt')
      .where('purchases.id', purchaseId)
      .first();

    if (!purchase) {
      res.status(404).send({ message: "Compra não encontrada" });
      return;
    }

    const buyer = await db('users')
      .select('id as buyerId', 'name as buyerName', 'email as buyerEmail')
      .where('id', purchase.buyerId)
      .first();

    if (!buyer) {
      res.status(404).send({ message: "Comprador não encontrado" });
      return;
    }

    const productsInfo = await db('purchases_products')
      .select('products.id', 'products.name', 'products.price', 'products.description', 'products.imageUrl as imageUrl', 'purchases_products.quantity')
      .join('products', 'products.id', 'purchases_products.product_id')
      .where('purchases_products.purchase_id', purchaseId);

    if (productsInfo.length === 0) {
      res.status(404).send({ message: "Nenhum produto encontrado para esta compra" });
      return;
    }

    const purchaseInfo = {
      ...purchase,
      ...buyer,
      products: productsInfo,
    };

    res.status(200).send(purchaseInfo);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    }
  }
});
