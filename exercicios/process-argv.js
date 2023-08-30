// console.log("here is the process-argv.js archive");

// Obtém os argumentos passados via linha de comando
const meuArgumento1 = process.argv[2];
const meuArgumento2 = process.argv[3];

// Verifica se os argumentos foram passados
if (meuArgumento1 && meuArgumento2) {
    console.log(meuArgumento1, "e", meuArgumento2);
}