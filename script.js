let display = document.getElementById('display');
let pendingOperation = ''; // Correção da nomenclatura
let currentValue = '';
let previousValue = '';

function addNumber(number) {
    currentValue += number;
    display.value = currentValue;
}

function addPoint() {
    if (!currentValue.includes('.')) {
        currentValue += '.';
        display.value = currentValue;
    }
}

function operation(operator) {
    if (currentValue === '') return; // Evita operação sem número
    if (previousValue !== '') {
        result(); // Realiza o cálculo se já houver uma operação pendente
    }
    pendingOperation = operator;
    previousValue = currentValue;
    currentValue = '';
}

function result() {
    if (pendingOperation === '' || currentValue === '') return; // Verifica se há operação a ser realizada

    let resultado;
    let numAnterior = parseFloat(previousValue); // Usar variáveis locais diferentes dos valores globais
    let numAtual = parseFloat(currentValue);

    switch (pendingOperation) {
        case '+':
            resultado = numAnterior + numAtual;
            break;
        case '-':
            resultado = numAnterior - numAtual;
            break;
        case '*':
            resultado = numAnterior * numAtual;
            break;
        case '/':
            resultado = numAnterior / numAtual;
            break;
        default:
            return;
    }

    display.value = resultado;
    previousValue = ''; // Limpa a operação após o cálculo
    currentValue = '';
    pendingOperation = '';
}

function clean() {
    currentValue = '';
    previousValue = '';
    pendingOperation = '';
    display.value = '';
}

function calcularJurosCompostos() {
    // Solicitar entradas ao usuário
    let saldoInicial = parseFloat(prompt("Digite o saldo inicial (se houver) (P):")) || 0;
    let contribuicaoMensal = parseFloat(prompt("Digite o valor da contribuição mensal (C):"));
    let taxaJurosAnual = parseFloat(prompt("Digite a taxa de juros anual (em %):")) / 100;
    let anos = parseInt(prompt("Digite o número de anos (t):"));

    // Verifica se as entradas são válidas
    if (isNaN(saldoInicial) || isNaN(contribuicaoMensal) || isNaN(taxaJurosAnual) || isNaN(anos)) {
        alert("Por favor, insira valores válidos.");
        return;
    }

    let n = 12; // Número de períodos por ano (mensal)

    // Fórmula dos juros compostos com contribuições mensais
    let montante = saldoInicial * Math.pow((1 + taxaJurosAnual / n), n * anos) +
        (contribuicaoMensal * ((Math.pow(1 + taxaJurosAnual / n, n * anos) - 1) / (taxaJurosAnual / n)));

    // Exibe o resultado no display
    display.value = montante.toFixed(2); // Exibir resultado com duas casas decimais
}

