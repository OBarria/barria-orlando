function esPrimo(numero) {
    // Un número primo es aquel que es divisible solo por 1 y por sí mismo.
    if (numero <= 1) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(numero); i++) {
        if (numero % i === 0) {
            return false;
        }
    }
    return true;
}

function calcularSumatoriaPrimos() {
    const numero = document.getElementById('numero').value;
    if (!numero || isNaN(numero) || numero <= 1 || numero >= 1000000) {
        alert('Por favor, ingrese un número válido entre 1 y 999999.');
        return;
    }

    let sumatoria = 0;
    for (let i = 2; i < numero; i++) {
        if (esPrimo(i)) {
            sumatoria += i;
        }
    }

    document.getElementById('resultado').innerText = `La sumatoria de los números primos debajo de ${numero} es: ${sumatoria}`;
}
