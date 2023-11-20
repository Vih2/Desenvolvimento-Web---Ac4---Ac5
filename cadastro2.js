// Adiciona um event listener para o input
document.getElementById('cpfInput').addEventListener('input', function (e) {
    // Remove qualquer caractere que não seja um número
    const inputValue = e.target.value.replace(/\D/g, '');
    // Formata o CPF com pontos e hífen
    if (inputValue.length <= 3) {
        e.target.value = inputValue;
    } else if (inputValue.length <= 6) {
        e.target.value = inputValue.slice(0, 3) + '.' + inputValue.slice(3);
    } else if (inputValue.length <= 9) {
        e.target.value = inputValue.slice(0, 3) + '.' + inputValue.slice(3, 6) + '.' + inputValue.slice(6);
    } else {
        e.target.value = inputValue.slice(0, 3) + '.' + inputValue.slice(3, 6) + '.' + inputValue.slice(6, 9) + '-' + inputValue.slice(9, 11);
    }
});
function validarCPF() {
    const cpfInput = document.getElementById('cpfInput');
    const cpf = cpfInput.value.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11) {
        cpfInput.classList.remove('success');
        cpfInput.classList.add('error');
    } else {
        // Validação do CPF
        let sum = 0;
        let remainder;
        for (let i = 1; i <= 9; i++) {
            sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if ((remainder === 10) || (remainder === 11)) {
            remainder = 0;
        }
        if (remainder !== parseInt(cpf.substring(9, 10))) {
            cpfInput.classList.remove('success');
            cpfInput.classList.add('error');
        }
        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        remainder = (sum * 10) % 11;
        if ((remainder === 10) || (remainder === 11)) {
            remainder = 0;
        }
        if (remainder !== parseInt(cpf.substring(10, 11))) {
            cpfInput.classList.remove('success');
            cpfInput.classList.add('error');
        } else {
            cpfInput.classList.remove('error');
            cpfInput.classList.add('success');
        }
    }
}
const cpfInput = document.getElementById('cpfInput');
const cpfMessage = document.getElementById('cpfMessage');
cpfInput.addEventListener('input', function (e) {
    const inputValue = e.target.value.replace(/\D/g, '');
    // Ocultar a mensagem após 3 segundos
    setTimeout(function () {
        cpfMessage.textContent = '';
    }, 3000);
});
cpfInput.addEventListener('blur', function (e) {
    const inputValue = e.target.value.replace(/\D/g, '');
    if (validarCPF(inputValue)) {
        cpfMessage.textContent = 'CPF válido';
        cpfMessage.style.color = 'green';
    } else {
        cpfMessage.textContent = 'CPF inválido';
        cpfMessage.style.color = 'red';
    }
});