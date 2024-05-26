// Implementación del hash
function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convertir a entero de 32 bits
    }
    return hash;
}

// Objeto para gestionar usuarios
const UserModule = (function() {
    let currentUser = null;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    function login(username, password) {
        const hashedPassword = hashCode(password);
        const user = users.find(u => u.username === username && u.password === hashedPassword);
        if (user) {
            currentUser = user;
            renderProfileView();
            renderDataTableView();
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    }

    function register(username, name, password) {
        const hashedPassword = hashCode(password);
        users.push({ username, name, password: hashedPassword });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Usuario registrado correctamente');
    }

   
    
    function getCurrentUser() {
        return currentUser;
    }

    function updateProfile(name, password) {
        if (name) currentUser.name = name;
        if (password) currentUser.password = hashCode(password);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Perfil actualizado correctamente');
    }

    return {
        login,
        register,
        logout,
        getCurrentUser,
        updateProfile
    };
})();

function logout() {
    currentUser = null;
    window.location.href = 'index.html'; // Redirigir al usuario al formulario de inicio de sesión
}

// Funciones para renderizar las vistas
function renderLoginView() {
    const container = document.getElementById('container');
    container.innerHTML = `
        <h1>Usuario y Contraseña</h1>
        <input type="text" id="username" placeholder="Nombre de usuario"><br>
        <input type="password" id="password" placeholder="Contraseña"><br>
        <button onclick="login()">Iniciar sesión</button>
        <button onclick="renderRegisterView()">Registrarse</button>
    `;
}

function renderRegisterView() {
    const container = document.getElementById('container');
    container.innerHTML = `
        <h1>Registro</h1>
        <input type="text" id="newUsername" placeholder="Nombre de usuario"><br>
        <input type="text" id="name" placeholder="Nombre"><br>
        <input type="password" id="newPassword" placeholder="Contraseña"><br>
        <button onclick="register()">Registrarse</button>
    `;
}

function renderProfileView() {
    const container = document.getElementById('container');
    const currentUser = UserModule.getCurrentUser();
    container.innerHTML = `
        <h1>Bienvenido, ${currentUser.name}</h1>
        <p>Tu nombre: ${currentUser.name}</p>
        <p>Tu nombre de usuario: ${currentUser.username}</p>
        <input type="text" id="newName" placeholder="Nuevo nombre"><br>
        <input type="password" id="newPassword" placeholder="Nueva contraseña"><br>
        <button onclick="updateProfile()">Guardar cambios</button>
        <button onclick="logout()">Cerrar sesión</button>
    `;
}

// Función para renderizar la vista de tabla de transacciones
function renderDataTableView() {
    const tableContainer = document.getElementById('table-container');
    const chartContainer = document.getElementById('chart-container');
    const currentUser = UserModule.getCurrentUser();

    if (currentUser) {
        // Simplemente un ejemplo de datos
        const data = [
            { tipo: 'Entrada', cantidad: 100, fecha: '2024-05-01' },
            { tipo: 'Salida', cantidad: 50, fecha: '2024-05-03' },
            { tipo: 'Entrada', cantidad: 200, fecha: '2024-05-05' },
            { tipo: 'Salida', cantidad: 150, fecha: '2024-05-07' },
            { tipo: 'Entrada', cantidad: 300, fecha: '2024-05-09' },
            { tipo: 'Salida', cantidad: 100, fecha: '2024-05-11' }
        ];

        // Construir tabla
        let tableHtml = '<table>';
        tableHtml += '<tr><th>Tipo</th><th>Cantidad</th><th>Fecha</th></tr>';
        data.forEach(item => {
            tableHtml += `<tr><td>${item.tipo}</td><td>${item.cantidad}</td><td>${item.fecha}</td></tr>`;
        });
        tableHtml += '</table>';

        // Mostrar tabla
        tableContainer.innerHTML = tableHtml;

        // Mostrar gráfico
        renderChart(data, chartContainer);
    }
}

// Función para renderizar la gráfica con barras
function renderChart(data, container) {
    container.innerHTML = ''; // Limpiar el contenedor antes de renderizar la gráfica

    const maxCantidad = Math.max(...data.map(item => item.cantidad));

    data.forEach(item => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        const percentage = (item.cantidad / maxCantidad) * 100;
        bar.style.height = percentage + '%';
        container.appendChild(bar);
    });
}

// Iniciar la aplicación mostrando la vista de tabla de transacciones
renderDataTableView();



// Funciones para la interacción del usuario
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    UserModule.login(username, password);
}

function register() {
    const username = document.getElementById('newUsername').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('newPassword').value;
    UserModule.register(username, name, password);
}

function updateProfile() {
    const name = document.getElementById('newName').value;
    const password = document.getElementById('newPassword').value;
    UserModule.updateProfile(name, password);
}

// Iniciar la aplicación mostrando la vista de login
renderLoginView();

/////////////////////////////////

// Función para renderizar la vista de perfil
function renderProfileView() {
    const container = document.getElementById('container');
    const currentUser = UserModule.getCurrentUser();
    container.innerHTML = `
        <h1>Bienvenido, ${currentUser.name}</h1>
        <p>Tu nombre: ${currentUser.name}</p>
        <p>Tu nombre de usuario: ${currentUser.username}</p>
        <input type="text" id="newName" placeholder="Nuevo nombre"><br>
        <input type="password" id="newPassword" placeholder="Nueva contraseña"><br>
        <button onclick="updateProfile()">Guardar cambios</button>
        <button onclick="logout()">Cerrar sesión</button>
    `;
    document.getElementById('newName').value = currentUser.name;
}

// Función para actualizar el perfil del usuario
function updateProfile() {
    const newName = document.getElementById('newName').value;
    const newPassword = document.getElementById('newPassword').value;
    UserModule.updateProfile(newName, newPassword);
    renderProfileView(); // Actualizar la vista después de guardar cambios
}

////////////////////////

// Función para renderizar la vista de tabla de transacciones
function renderDataTableView() {
    const container = document.getElementById('container');
    const currentUser = UserModule.getCurrentUser();
    if (currentUser) {
        // Simplemente un ejemplo de datos
        const data = [
            { tipo: 'Entrada 1', cantidad: 100, fecha: '2024-05-01' },
            { tipo: 'Salida 1', cantidad: 50, fecha: '2024-05-03' },
            { tipo: 'Entrada 2', cantidad: 200, fecha: '2024-05-05' },
            { tipo: 'Salida 2', cantidad: 150, fecha: '2024-05-07' },
            { tipo: 'Entrada 3', cantidad: 300, fecha: '2024-05-09' },
            { tipo: 'Salida 3', cantidad: 100, fecha: '2024-05-11' }
        ];

        // Construir tabla
        let tableHtml = '<h2>Transacciones</h2>';
        tableHtml += '<table>';
        tableHtml += '<tr><th>Tipo</th><th>Cantidad</th><th>Fecha</th></tr>';
        data.forEach(item => {
            tableHtml += `<tr><td>${item.tipo}</td><td>${item.cantidad}</td><td>${item.fecha}</td></tr>`;
        });
        tableHtml += '</table>';
        // Mostrar tabla
        container.innerHTML += tableHtml;

        // Mostrar gráfico
        renderChart(data);
    }
}

//////////////////////////////////

// Función para renderizar la gráfica con porcentaje
function renderChart(data) {
    const container = document.getElementById('container');
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "chart");
    const totalCantidad = data.reduce((total, item) => total + item.cantidad, 0);

    svg.setAttribute("width", "400");
    svg.setAttribute("height", 100 + data.length * 30);

    let yOffset = 20;
    data.forEach((item, index) => {
        const percentage = (item.cantidad / totalCantidad) * 100;

        const bar = document.createElementNS(svgNS, "rect");
        const label = document.createElementNS(svgNS, "text");

        bar.setAttribute("x", 0);
        bar.setAttribute("y", yOffset);
        bar.setAttribute("width", percentage * 4);
        bar.setAttribute("height", 20);
        bar.setAttribute("fill", index % 2 === 0 ? "#36a2eb" : "#ff6384");

        label.setAttribute("x", percentage * 4 + 10);
        label.setAttribute("y", yOffset + 15);
        label.setAttribute("fill", "black");
        label.textContent = `${item.tipo}: ${percentage.toFixed(2)}%`;

        svg.appendChild(bar);
        svg.appendChild(label);

        yOffset += 30;
    });

    container.appendChild(svg);
}

