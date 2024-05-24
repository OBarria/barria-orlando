
// Función para mostrar la página de inicio de sesión y ocultar la de registro
function showLogin() {
    document.getElementById('registerPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'block';
}

// Función para mostrar la página de registro y ocultar la de inicio de sesión
function showRegister() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('registerPage').style.display = 'block';
}

// Función para simular el registro de usuario
function register() {
    const username = document.getElementById('registerUsername').value;
    const name = document.getElementById('registerName').value;
    const password = document.getElementById('registerPassword').value;

    // Aquí deberías implementar la lógica para almacenar los datos del usuario
    // En este ejemplo, utilizaremos localStorage para guardar los datos
    localStorage.setItem('username', username);
    localStorage.setItem('name', name);
    localStorage.setItem('password', hashCode(password));
    // Redireccionar al usuario a la vista de tabla de datos después del registro
    window.location.href = "table_chart.html";
    // Después de registrarse, volver a la página de inicio de sesión
    //showLogin();
}

// Función para simular el inicio de sesión de usuario
function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Aquí deberías implementar la lógica para verificar las credenciales del usuario
    // En este ejemplo, verificamos las credenciales almacenadas en localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && hashCode(password) === storedPassword) {
        // Si las credenciales son válidas, redireccionar al usuario a la página de perfil
        window.location.href = "table_chart.html"; // Redirigir a la página de perfil
    } else {
        alert("Credenciales incorrectas");
    }
}

// Función para generar el HASH de una cadena de texto
function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convertir a 32 bits
    }
    return hash;
}

/// Función para cargar los datos de la tabla
function loadTableData() {
    // Aquí deberías cargar los datos de la tabla desde algún origen (p. ej., una base de datos)
    // En este ejemplo, simplemente generamos datos de prueba
    const tableData = [
        { fecha: '2024-05-01', concepto: 'Ingreso', tipo: 'Entrada', monto: 1000 },
        { fecha: '2024-05-05', concepto: 'Compra', tipo: 'Salida', monto: 500 },
        { fecha: '2024-05-10', concepto: 'Pago de factura', tipo: 'Salida', monto: 200 },
        // Agrega más datos según sea necesario
    ];

    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = ''; // Limpiar tabla antes de agregar nuevos datos

    tableData.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.fecha}</td>
            <td>${entry.concepto}</td>
            <td>${entry.tipo}</td>
            <td>${entry.monto}</td>
        `;
        tableBody.appendChild(row);
    });

    // Llamar a loadChart después de cargar los datos de la tabla
    loadChart();
}


// Función para cargar y mostrar la gráfica con porcentajes de entradas y salidas
function loadChart() {
    // Cálculo de porcentajes de entradas y salidas
    const tableData = getTableData();
    const totalEntradas = tableData.reduce((acc, entry) => entry.tipo === 'Entrada' ? acc + entry.monto : acc, 0);
    const totalSalidas = tableData.reduce((acc, entry) => entry.tipo === 'Salida' ? acc + entry.monto : acc, 0);
    const total = totalEntradas + totalSalidas;
    const porcentajeEntradas = (totalEntradas / total) * 100;
    const porcentajeSalidas = (totalSalidas / total) * 100;

    // Configuración del gráfico con los porcentajes calculados
    const data = {
        labels: ['Entradas', 'Salidas'],
        datasets: [{
            label: 'Porcentaje de Entradas y Salidas',
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
            data: [porcentajeEntradas, porcentajeSalidas]
        }]
    };

    // Configuración del gráfico
    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    };

    // Obtener el elemento canvas
    const canvas = document.getElementById('myChart');
    const context = canvas.getContext('2d');

    // Crear el gráfico
  //  new Chart(context, config);
}


// Función para obtener los datos de la tabla
function getTableData() {
    const table = document.getElementById('dataTable');
    const tableData = [];
    for (let i = 1; i < table.rows.length; i++) {
        const rowData = {
            fecha: table.rows[i].cells[0].innerText,
            concepto: table.rows[i].cells[1].innerText,
            tipo: table.rows[i].cells[2].innerText,
            monto: parseFloat(table.rows[i].cells[3].innerText)
        };
        tableData.push(rowData);
    }
    return tableData;
}

// Función para cargar los datos del perfil del usuario
function loadUserProfile() {
    const name = localStorage.getItem('name');
    const profileNameInput = document.getElementById('profileName');
    profileNameInput.value = name; // Actualizar el valor del input con el nombre del usuario
    document.getElementById('loggedInUsername').textContent = name;
}


// Función para cerrar sesión
function logout() {
    localStorage.removeItem('username'); // Eliminar solo la sesión activa
    window.location.href = "login.html"; // Redireccionar al usuario a la página de inicio de sesión
}

// Función para actualizar el perfil del usuario
function updateProfile() {
    const newName = document.getElementById('profileName').value;
    const newPassword = document.getElementById('profilePassword').value;

    // Actualizar el nombre en el almacenamiento local
    localStorage.setItem('name', newName);

    if (newPassword) {
        // Si se proporcionó una nueva contraseña, aplicar el HASH y actualizarla
        localStorage.setItem('password', hashCode(newPassword));
    }

    alert('Perfil actualizado correctamente');
}
