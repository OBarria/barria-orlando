function esBisiesto(anio) {
    // Un año es bisiesto si es divisible por 4, pero no por 100,
    // a menos que también sea divisible por 400.
    return (anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0;
}

function verificarBisiesto() {
    const anio = document.getElementById('anio').value;
    if (!anio || isNaN(anio)) {
        alert('Por favor, ingrese un año válido.');
        return;
    }

    const resultado = esBisiesto(Number(anio)) ? 'Sí' : 'No';
    document.getElementById('resultado').innerText = `¿Es bisiesto? ${resultado}`;
}
