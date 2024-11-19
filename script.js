// Acessar elementos do DOM
const buttons = document.querySelectorAll('.buttons button');
const countSection = document.querySelector('.count');

// Variáveis para armazenar valores
let currentInput = '';   // Armazena o valor atual sendo digitado
let previousInput = '';  // Armazena o valor anterior (caso o usuário esteja fazendo uma operação)
let operator = '';       // Armazena o operador atual

// Função para atualizar o visor
function updateDisplay(value) {
    countSection.textContent = value;
}

// Função para limpar tudo
function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay('0');
}

// Função para calcular o resultado
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (operator === '+') {
        result = prev + curr;
    } else if (operator === '-') {
        result = prev - curr;
    } else if (operator === 'x') {
        result = prev * curr;
    } else if (operator === '÷') {
        result = prev / curr;
    } else if (operator === '%') {
        result = (prev * curr) / 100;
    } else {
        return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay(currentInput);
}

// Adicionar eventos de clique nos botões
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const buttonValue = event.target.textContent;

        if (buttonValue === 'C') {
            // Limpar a calculadora
            clearCalculator();
        } else if (buttonValue === '=' || buttonValue === 'Enter') {
            // Calcular o resultado
            calculate();
        } else if (buttonValue === '+' || buttonValue === '-' || buttonValue === 'x' || buttonValue === '÷' || buttonValue === '%') {
            // Definir o operador e preparar para o próximo número
            if (currentInput !== '') {
                if (previousInput === '') {
                    previousInput = currentInput;
                } else if (operator !== '') {
                    calculate();
                }
                operator = buttonValue;
                currentInput = '';
            }
        } else {
            // Caso o usuário tenha pressionado um número ou ponto
            currentInput += buttonValue;
            updateDisplay(currentInput);
        }
    });
});

// Inicializar a calculadora
updateDisplay('0');
