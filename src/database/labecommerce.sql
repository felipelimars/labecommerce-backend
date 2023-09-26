-- Active: 1695750310375@@127.0.0.1@3306

-- CREATE USERS -
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

-- Visualizando dados da tabela users --
SELECT * FROM users;

-- Populando tabela de pessoas usuárias --
INSERT INTO users (id, name, email, password, created_at)
VALUES 
('01', 'Jose', 'jose@email.com', '12123fe', '2023-09-19T20:44:59.346Z'),
('02', 'Maria', 'maria@email.com', 'password123', '2023-09-19T20:44:59.347Z'),
('03', 'Carlos', 'carlos@email.com', 'password123', '2023-09-19T20:44:59.347Z');


-- CREATE PRODUCTS --

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

-- Visualizando dados da tabela products --
SELECT * FROM products;

-- Populando tabela de products --
INSERT INTO products (id, name, price, description, image_url)
VALUES
('01','Tênis',200,'Tênis leve e confortável para o dia a dia','https://secure-static.vans.com.br/medias/sys_master/vans/vans/hef/h9b/h00/h00/11292758540318/1003900220019U-01-BASEIMAGE-Hires.jpg'),
('02','Camiseta Estampada',50,'Camiseta com estampa moderna e design exclusivo','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiH-2CEGTpUemgPf8GpKC2lXZA_IvsHS8hxRAZO1szlOANvm0eZ3MOtbHz2LSswjjGlog&usqp=CAU'),
('03','Calça Jeans Slim',80,'Calça jeans slim com corte moderno e confortável','https://www.tupode.com/uploads/img/catalogo_produtos/359/e5f6c833b8bfeba2ef9906bef612f4fb.jpg'),
('04','Mochila Urbana',120,'Mochila resistente e versátil para uso urbano','https://d1i2p15dhfw94q.cloudfront.net/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/img_1426_5_11.jpg'),
('05','Oculos Rayban', 220,'Oculos para o dia a dia, estilo e conforto','https://d2r9epyceweg5n.cloudfront.net/stores/001/649/283/products/oval-11-0b32aa1ddbf2a48e7016323438355036-1024-1024.png');