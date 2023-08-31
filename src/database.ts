import { TProduct, Tusers } from "./types";

/* Feito os exercicios types.ts e o database.ts do projeto junto com suas tipagens */

export const users: Tusers[] = [

    {
        id: "01",
        name: "Jose",
        email: "jose@email.com",
        password: "12123fe",
        createdAt: new Date(). toISOString()
    },
    {
        id: "02",
        name: "Maria",
        email: "maria@email.com",
        password: "abc123",
        createdAt: new Date(). toISOString()
    },
    {
        id: "03",
        name: "Carlos",
        email: "carlos@email.com",
        password: "password123",
        createdAt: new Date(). toISOString()
    },
    {
        id: "04",
        name: "Ana",
        email: "ana@email.com",
        password: "secure456",
        createdAt: new Date(). toISOString()
    }
];

export const products: TProduct[] = [

    {
        id: "01",
        name: "Tênis",
        price: 200,
        description: "Tênis leve e confortável para o dia a dia",
        imageUrl: "https://secure-static.vans.com.br/medias/sys_master/vans/vans/hef/h9b/h00/h00/11292758540318/1003900220019U-01-BASEIMAGE-Hires.jpg"
    },
    {
        id: "02",
        name: "Camiseta Estampada",
        price: 50,
        description: "Camiseta com estampa moderna e design exclusivo",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiH-2CEGTpUemgPf8GpKC2lXZA_IvsHS8hxRAZO1szlOANvm0eZ3MOtbHz2LSswjjGlog&usqp=CAU"
    },
    {
        id: "03",
        name: "Calça Jeans Slim",
        price: 80,
        description: "Calça jeans slim com corte moderno e confortável",
        imageUrl: "https://www.tupode.com/uploads/img/catalogo_produtos/359/e5f6c833b8bfeba2ef9906bef612f4fb.jpg"
    },
    {
        id: "04",
        name: "Mochila Urbana",
        price: 120,
        description: "Mochila resistente e versátil para uso urbano",
        imageUrl: "https://d1i2p15dhfw94q.cloudfront.net/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/img_1426_5_11.jpg"
    }
    
];

