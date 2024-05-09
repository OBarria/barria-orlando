// Definir el módulo para el manejo de candidatos
const CandidatesModule = (function() {
    // Lista de candidatos
    let candidates = [];

    // Función para agregar un nuevo candidato
    function addCandidate(name, color) {
        // Verificar si el nombre no está vacío
        if (name.trim() === '') {
            alert('Por favor, ingresa un nombre para el candidato.');
            return;
        }

        // Verificar si ya existe un candidato con el mismo nombre
        if (candidates.some(candidate => candidate.name === name)) {
            alert('Ya existe un candidato con ese nombre.');
            return;
        }
// Verificar si el color ya está siendo utilizado por otro candidato
    if (candidates.some(candidate => candidate.color === color)) {
        alert('Ese color ya está siendo utilizado por otro candidato.');
        return;
    }
        

        // Agregar el nuevo candidato
        candidates.push({ name, color, points: 0 });
        renderCandidates();
        renderPieChart();
    }

    // Función para eliminar un candidato
    function deleteCandidate(index) {
        candidates.splice(index, 1);
        renderCandidates();
        renderPieChart();
    }

    // Función para agregar puntos a un candidato
    function addPoints(index) {
        candidates[index].points++;
        renderCandidates();
        renderPieChart();
    }

    // Función para renderizar la lista de candidatos
    function renderCandidates() {
        const candidatesContainer = document.getElementById('candidates-container');
        candidatesContainer.innerHTML = '';

        candidates.forEach((candidate, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${candidate.name}</h3>
                <p>Votos: ${candidate.points}</p>
                <button onclick="CandidatesModule.addPoints(${index})">Agregar voto</button>
                <button onclick="CandidatesModule.deleteCandidate(${index})">Eliminar</button>
            `;
            card.style.backgroundColor = candidate.color;
            candidatesContainer.appendChild(card);
        });
    }

    // Función para renderizar el gráfico de pastel con porcentajes y mensajes emergentes
function renderPieChart() {
    const canvas = document.getElementById('pie-chart');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Calcular el total de puntos
    const totalPoints = candidates.reduce((acc, curr) => acc + curr.points, 0);

    let startAngle = -Math.PI / 2; // Empezamos desde la parte superior del círculo

    candidates.forEach(candidate => {
        const percentage = (candidate.points / totalPoints) * 100;
        const sliceAngle = (candidate.points / totalPoints) * 2 * Math.PI;

        ctx.fillStyle = candidate.color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();

        // Calcular la posición del texto
        const midAngle = startAngle + sliceAngle / 2;
        const textX = centerX + Math.cos(midAngle) * (radius / 2);
        const textY = centerY + Math.sin(midAngle) * (radius / 2);

        // Configurar el estilo del texto
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle'; // Alineación vertical al centro

        // Mostrar el nombre del candidato y el porcentaje
        const text = `${candidate.name} (${percentage.toFixed(1)}%)`;
        ctx.fillText(text, textX, textY, radius); // Ajustamos el ancho del texto al radio del círculo

        startAngle += sliceAngle;
    });

    // Agregar evento de mousemove para mostrar el mensaje emergente
    canvas.addEventListener('mousemove', function(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left - centerX;
        const mouseY = event.clientY - rect.top - centerY;
        const distanceToCenter = Math.sqrt(mouseX * mouseX + mouseY * mouseY);

        if (distanceToCenter <= radius) {
            const angle = Math.atan2(mouseY, mouseX); // Calcular el ángulo del mouse respecto al centro del círculo

            if (angle < 0) {
                angle += 2 * Math.PI; // Ajustar el ángulo para que esté en el rango [0, 2*PI]
            }

            let cumulativeAngle = -Math.PI / 2; // Empezamos desde la parte superior del círculo

            candidates.forEach(candidate => {
                const sliceAngle = (candidate.points / totalPoints) * 2 * Math.PI;

                // Verificar si el ángulo del mouse está dentro del sector circular correspondiente al candidato
                if (angle >= cumulativeAngle && angle <= cumulativeAngle + sliceAngle) {
                    // Mostrar mensaje emergente
                    canvas.title = `${candidate.name} (${((candidate.points / totalPoints) * 100).toFixed(1)}%) - Votos: ${candidate.points}`;
                }

                cumulativeAngle += sliceAngle;
            });
        } else {
            canvas.title = '';
        }
    });

    // Limpiar el mensaje emergente al salir del área del gráfico de pastel
    canvas.addEventListener('mouseout', function() {
        canvas.title = '';
    });
}




    // Retorna las funciones que queremos hacer públicas
    return {
        addCandidate,
        deleteCandidate,
        addPoints
    };
})();

// Función para agregar un candidato desde el input
function addCandidate() {
    const nameInput = document.getElementById('candidate-name');
    const colorInput = document.getElementById('candidate-color');
    CandidatesModule.addCandidate(nameInput.value, colorInput.value);
    nameInput.value = '';
}
