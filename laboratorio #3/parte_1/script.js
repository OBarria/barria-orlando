function esPalindromo(numero) {
    const strNumero = String(numero);
    const strNumeroReverso = strNumero.split('').reverse().join('');
    return strNumero === strNumeroReverso;
}

function esPalindromoDobleBase(numero) {
    const base10 = numero.toString();
    const base2 = numero.toString(2); // Convertir a representación de cadena en base 2
    return esPalindromo(base10) && esPalindromo(base2);
}

function verificarPalindromo() {
    const numero = document.getElementById('numero').value;
    if (!numero || isNaN(numero)) {
        alert('Por favor, ingrese un número válido.');
        return;
    }

    const esDobleBase = esPalindromoDobleBase(Number(numero));
    const resultado = esDobleBase ? 'Sí' : 'No';
    document.getElementById('resultado').innerText = `¿Es un palíndromo de doble base? ${resultado}`;
}
