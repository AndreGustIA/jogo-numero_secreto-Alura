// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número do secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10.';

let listaDeNumerosSorteados = []; // Criando uma lista vazia para armazenar os numeros que ja foram sorteados.

let numeroLimite = 4; // Variável de limite para colocar um limite na hora de gerar um número aleátorio

let numeroAleatorio = gerarNumeroAleatorio(); // Amarzenado o número aleatório em uma variavel.
let tentativa = 1; // variável para ver quantas tentativas o usuário precisou usar para acerta o número secreto.

function exibirTextoNaTag(tag,texto) {
    let qualTag = document.querySelector(tag); // Seleciona a tag que você passou no parâmetro
    qualTag.innerHTML = texto; // Escreve no html o texto que você quer que apareça na tag

    // Colocando uma narração do que está acontecendo na tela.
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {reat: 1.2});

}

function frasesInicialDoJogo() {
    exibirTextoNaTag('h1', 'Jogo do número secreto.'); // Chamando a função para exibir no HTML e passando os parâmetro nele.
    exibirTextoNaTag('p', 'Escolha um número entre 1 e 10.');
}

frasesInicialDoJogo();


function verificarChute() {
    let chute = document.querySelector('input').value; // Pegando e armazenando o valor que foi  inserido no input 
    
    let pluralTentativa = tentativa > 1? 'tentativas' : 'tentativa'; 

    // Variável para exibir a msg na tag <p> -- MOTIVO: o html não entende templateString, O JS entende.
    let acertoComTentativa = `🥳 Você acertou o número secreto com ${tentativa} ${pluralTentativa}.`;

    if (chute == numeroAleatorio) {
        exibirTextoNaTag('h1', 'Acertou!');
        exibirTextoNaTag('p', acertoComTentativa);

        // Removendo o atributo disabled do botão e deixando ele ativado para uso.
        document.getElementById('reiniciar').removeAttribute('disabled');
    } 
    else{
        if (chute > numeroAleatorio) {
            exibirTextoNaTag('h1', 'Errouuu!')
            exibirTextoNaTag('p', '⚠️ O número secreto é menor.')
        }
        else{
            exibirTextoNaTag('h1', 'Errouuu!')
            exibirTextoNaTag('p', '⚠️ O número secreto é maior.')
        }
        tentativa++ // fazemdo o incremento ex: tentativa + 1
        limparCampoDoInput(); // Limpar o campo do input quando erra um chute de um numero
    }
    console.log(numeroAleatorio); // Chamando o número aleatório numa funçào para aparece no console.
}

function gerarNumeroAleatorio() {
    let numeroEscolhido =  parseInt(Math.random() * numeroLimite + 1); // Isso retorna o número aleatório.
    
    // Armazenado na variável a quantidade de elemenstos que tem dentro da lista.
    let quantidadesDeElementosNaLista = listaDeNumerosSorteados.length;

    // Verificando se atingiu o limite da lista. Se sim, ela será limpada.
    if (quantidadesDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }



    // verificando se em lista de numeros sorteados já tem o números escolhido, se tiver ele gera um novo número.
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    }
    // Se não, pegar a listaDeNumerosSorteados e adicionar na lista o numnero escolhido/que já foi sorteado no jogo passado.
    else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampoDoInput() {
    chute = document.querySelector('input'); // armazenando o valor que foi digitado numa variável
    chute.value = ''; // Deixando a variável vazia.
}

// Função colocar no onclick do html
function iniciaNovoJogo() {
    numeroAleatorio = gerarNumeroAleatorio();
    limparCampoDoInput();
    tentativa = 1
    frasesInicialDoJogo();
    // Quando o jogo for reiniciado o botão "novo jogo" vai ficar desabilitado .
    document.getElementById('reiniciar').setAttribute('disabled', true);
}