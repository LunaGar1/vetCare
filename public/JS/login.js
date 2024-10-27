document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const emailInput = this.querySelector('input[type="email"]').value;
    const passwordInput = this.querySelector('input[type="password"]').value;
    console.log(emailInput, passwordInput)

    if (passwordInput.trim() === '') {
        alert('Password cant be empty.');
        passwordInput.focus();
        event.preventDefault();
    }

    await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: emailInput,
            password: passwordInput
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
        console.log('Usuario logueado: ', data);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
    })
    .catch(error => {
        console.error('Error:', error);
        // Aquí puedes mostrar un mensaje de error al usuario
    });
});