// Configuración del gráfico
const data = {
    labels: ['Entradas', 'Salidas'],
    datasets: [{
        label: 'Entradas vs Salidas',
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
        data: [1000, 500] // Deberías reemplazar esto con los datos reales del usuario
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

// Crear el gráfico
var myChart = new Chart(
    document.getElementById('myChart'),
    config
);
