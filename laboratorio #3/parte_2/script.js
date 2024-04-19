function contarCaracteres() {
    const cadena = document.getElementById('cadena').value;
    const resultado = contar(cadena);
    mostrarResultado(resultado);
}

function contar(cadena) {
    const contador = {};

    for (let caracter of cadena) {
        if (contador[caracter]) {
            contador[caracter]++;
        } else {
            contador[caracter] = 1;
        }
    }

    return contador;
}

function mostrarResultado(resultado) {
    let mensaje = '';
    for (let caracter in resultado) {
        mensaje += `Hay ${resultado[caracter]} ${caracter}, `;
    }
    mensaje = mensaje.slice(0, -2); // Eliminar la última coma y espacio
    document.getElementById('resultado').textContent = mensaje;
}
