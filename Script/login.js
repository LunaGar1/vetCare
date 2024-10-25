document.getElementById('loginForm').addEventListener('submit', function(event) {
    const emailInput = this.querySelector('input[type="email"]');
    const passwordInput = this.querySelector('input[type="password"]');

    if (!emailInput.checkValidity()) {
        alert('Por favor, introduce un correo electrónico válido.');
        emailInput.focus();
        event.preventDefault();
        return;
    }

    if (passwordInput.value.trim() === '') {
        alert('La contraseña no puede estar vacía.');
        passwordInput.focus();
        event.preventDefault();
    }
});