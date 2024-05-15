document.addEventListener('DOMContentLoaded', function() {
    const profileInfo = document.getElementById('profileInfo');
    const logoutBtn = document.getElementById('logoutBtn');

    // Verificar si el usuario está autenticado al cargar la página
    if (localStorage.getItem('loggedIn')) {
        // Mostrar información del perfil (puedes personalizar esto)
        profileInfo.innerHTML = `
            <p>Nombre: Pedro Malware</p>
            <p>Edad: 35 años</p>
            <p>Descripción:  Programador apasionado de JavaScript y Html</p>
            <img src="foto.jpg" alt="Perfil de Usuario">
        `;
    } else {
        // Redirigir al usuario al login si no está autenticado
        window.location.href = 'inicio.html';
    }

    // Evento para cerrar sesión
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('loggedIn');
        window.location.href = 'inicio.html';
    });
});
