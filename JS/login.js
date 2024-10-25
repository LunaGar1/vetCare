document.getElementById('loginForm').addEventListener('submit', function(event) {
    const emailInput = this.querySelector('input[type="email"]');
    const passwordInput = this.querySelector('input[type="password"]');

    if (!emailInput.checkValidity()) {
        alert('Please enter a valid email.');
        emailInput.focus();
        event.preventDefault();
        return;
    }

    if (passwordInput.value.trim() === '') {
        alert('Password cant be empty.');
        passwordInput.focus();
        event.preventDefault();
    }
});