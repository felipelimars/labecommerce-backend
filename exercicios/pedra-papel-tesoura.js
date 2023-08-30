function SorteioDeEscolha() {
    const escolhas = ["pedra", "papel", "tesoura"];
    const randomIndex = Math.floor(Math.random() * escolhas.length);
    return escolhas[randomIndex];
}

function DeterminaVencedor(escolhaJogador, escolhaComputador) {
    if (escolhaComputador === "pedra" && escolhaJogador === "pedra") {
        console.log("O computador escolheu pedra e você também. Resultado: empate!");
    } else if (escolhaComputador === "pedra" && escolhaJogador === "papel") {
        console.log("O computador escolheu pedra e você escolheu papel. Resultado: você venceu!");
    } else if (escolhaComputador === "pedra" && escolhaJogador === "tesoura") {
        console.log("O computador escolheu pedra e você escolheu tesoura. Resultado: vitória do computador!");
    } else if (escolhaComputador === "papel" && escolhaJogador === "pedra") {
        console.log("O computador escolheu papel e você escolheu pedra. Resultado: vitória do computador!");
    } else if (escolhaComputador === "papel" && escolhaJogador === "papel") {
        console.log("O computador escolheu papel e você também. Resultado: empate!");
    } else if (escolhaComputador === "papel" && escolhaJogador === "tesoura") {
        console.log("O computador escolheu papel e você escolheu tesoura. Resultado: você venceu!");
    } else if (escolhaComputador === "tesoura" && escolhaJogador === "pedra") {
        console.log("O computador escolheu tesoura e você escolheu pedra. Resultado: você venceu!");
    } else if (escolhaComputador === "tesoura" && escolhaJogador === "papel") {
        console.log("O computador escolheu tesoura e você escolheu papel. Resultado: vitória do computador!");
    } else if (escolhaComputador === "tesoura" && escolhaJogador === "tesoura") {
        console.log("O computador escolheu tesoura e você também. Resultado: empate!");
    }
}

const escolhaJogador = process.argv[2];
if (!escolhaJogador || !["pedra", "papel", "tesoura"].includes(escolhaJogador)) {
    console.log("Por favor, escolha pedra, papel ou tesoura.");
} else {
    const escolhaComputador = SorteioDeEscolha();
    console.log(`Sua escolha: ${escolhaJogador}`);
    console.log(`Escolha do computador: ${escolhaComputador}`);
    DeterminaVencedor(escolhaJogador, escolhaComputador);
}