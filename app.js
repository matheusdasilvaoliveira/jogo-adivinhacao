let listaDeNumerosSorteados = [];
let numeroSorteado = geraNumeroAleatorio();
let tentativas = 1;

function exibeTelaInicial() {
    exibeTextoNaTela("h1", "Jogo da Adivinhação");
    exibeTextoNaTela("p", "Escolha um número de 1 a 10");
}

exibeTelaInicial();

function geraNumeroAleatorio () {
    numeroLimite = 10;
    if (listaDeNumerosSorteados.length == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return geraNumeroAleatorio();
    }
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
}

function limparEspaco() {
    let chute = document.querySelector("input");
    chute.value = "";
}

function exibeTextoNaTela(tag, texto) {
    let espaco = document.querySelector(tag);
    espaco.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2})
}

function verificarChute() {
    let chute = document.querySelector("input").value;
    let palavraTentativas = tentativas > 1 ? "tentativas" : "tentativa";
    if (chute == numeroSorteado) {
        exibeTextoNaTela("h1", "ACERTOU!!!");
        msgTentativas = `Parabéns, você adivinhou o número secreto em ${tentativas} ${palavraTentativas}. Clique em Novo jogo para jogar novamente`;
        exibeTextoNaTela("p", msgTentativas);
        document.getElementById("campoNumero").setAttribute("disabled", true);
        document.getElementById("chutar").setAttribute("disabled", true);
        document.getElementById("reiniciar").removeAttribute("disabled");
        
    } else {
        menorOuMaior = chute > numeroSorteado ? "menor" : "maior";
        exibeTextoNaTela("p", `O número é ${menorOuMaior}. Tente novamente!`);
        limparEspaco();
    }
    tentativas++;
}

function reiniciaJogo() {
    limparEspaco();
    exibeTelaInicial();
    numeroSorteado = geraNumeroAleatorio();
    tentativas = 1;
    document.getElementById("reiniciar").setAttribute("disabled", true);
    document.getElementById("chutar").removeAttribute("disabled");
    document.getElementById("campoNumero").removeAttribute("disabled");
}