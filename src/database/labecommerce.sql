-- Active: 1696357142518@@127.0.0.1@3306

-- CREATE USERS -
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL
);

-- Visualizando dados da tabela users --
SELECT * FROM users;

-- Populando tabela de pessoas usuárias --
INSERT INTO users (id, name, email, password)
VALUES 
('01', 'Jose', 'jose@email.com', '12123fe' ),
('02', 'Maria', 'maria@email.com', 'password123'),
('03', 'Carlos', 'carlos@email.com', 'password123');


-- CREATE PRODUCTS --
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL
);

-- Visualizando dados da tabela products --
SELECT * FROM products;

-- Populando tabela de products --
INSERT INTO products (id, name, price, description, imageUrl)
VALUES
('01','Tênis',200,'Tênis leve e confortável para o dia a dia','https://secure-static.vans.com.br/medias/sys_master/vans/vans/hef/h9b/h00/h00/11292758540318/1003900220019U-01-BASEIMAGE-Hires.jpg'),
('02','Camiseta Estampada',50,'Camiseta com estampa moderna e design exclusivo','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiH-2CEGTpUemgPf8GpKC2lXZA_IvsHS8hxRAZO1szlOANvm0eZ3MOtbHz2LSswjjGlog&usqp=CAU'),
('03','Calça Jeans Slim',80,'Calça jeans slim com corte moderno e confortável','https://www.tupode.com/uploads/img/catalogo_produtos/359/e5f6c833b8bfeba2ef9906bef612f4fb.jpg'),
('04','Mochila Urbana',120,'Mochila resistente e versátil para uso urbano','https://d1i2p15dhfw94q.cloudfront.net/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/img_1426_5_11.jpg'),
('05','Oculos Rayban', 220,'Oculos para o dia a dia, estilo e conforto','https://d2r9epyceweg5n.cloudfront.net/stores/001/649/283/products/oval-11-0b32aa1ddbf2a48e7016323438355036-1024-1024.png');


-- ENDPOINTS --

-- Get All Users --
SELECT * FROM users;

-- Get All Products --
SELECT * FROM products;

SELECT * FROM purchases;

-- Get All Products + Filtro de busca por nome --
SELECT * FROM products WHERE name LIKE '%Camiseta%';

-- Create user --
INSERT INTO users (id, name, email, password)
VALUES 
('05', 'Messi', 'messi@email.com', '1234ab' );

-- Create products -- 
INSERT INTO products (id, name, price, description, imageUrl)
VALUES
('06','Tesla Cybertruck', 200000, 'Carro igual um tanque de guerra, indestrutivel','https://image.com/produto.png');

-- Delete User by id --
DELETE FROM users
WHERE id = '04';

-- Delete Produtcs by id --
DELETE FROM products
WHERE id = '05';

-- Edit Products by id -- 
UPDATE products
SET 
    id = '01',
    name = 'exemploo', 
    price = 100,
    description = 'descricao do produto', 
    image_url = 'imagem.com/exemplo.png'
WHERE id = '02';

-- Criação da tabela de pedidos --
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users(id)
ON UPDATE CASCADE -- efeito cascata ao atualizar id na tabela users
ON DELETE CASCADE -- efeito cascata ao atualizar id na tabela users
);

SELECT * FROM purchases;

-- Criar pedidos --
INSERT INTO purchases (id, buyer, total_price)
VALUES
('01', '01', 200),
('02', '02', 400),
('03', '03', 150);


UPDATE purchases SET total_price = 80 WHERE id = '03';

-- visualizacao tabela purchases e users
SELECT
    purchases.id,
    purchases.buyer,
    users.name,
    users.email,
    purchases.total_price,
    purchases.created_at FROM purchases INNER JOIN users ON users.id = purchases.buyer;




-- Criação de tabela de pedidos de produtos --
CREATE TABLE purchases_products (
  purchase_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (purchase_id) REFERENCES purchases (id) ON UPDATE CASCADE ON DELETE CASCADE
  FOREIGN KEY (product_id) REFERENCES products (id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Inserção de dados na tabela purchases_products para 3 compras de clientes --
INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
  ('01', '01', 2),
  ('02', '03', 2),
  ('03', '03', 1);


-- Consulta com INNER JOIN para mostrar todas as colunas das tabelas relacionadas
SELECT
    purchases.id AS purchase_id,
    purchases.buyer AS buyer_id,    
    users.name,
    purchases_products.quantity AS product_quantity, 
    products.price AS product_price,
    purchases.total_price,
    purchases.created_at,
    products.name AS product_name,
    products.description AS product_description,
    products.imageUrl AS product_imageUrl
FROM purchases
INNER JOIN purchases_products ON purchases.id = purchases_products.purchase_id
INNER JOIN products ON purchases_products.product_id = products.id
INNER JOIN users ON users.id = purchases.buyer;
