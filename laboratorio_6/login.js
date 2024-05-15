const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulamos la autenticación (puedes personalizar esto)
    if (username === 'miusuario' && password === 'micontraseña') {
        localStorage.setItem('loggedIn', true);
        window.location.href = 'perfil.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});
