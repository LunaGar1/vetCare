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

    await fetch('/login/', {
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
        console.log(data.Role)
        if (data.Role === 'Admin'){
            window.location.href = 'http://localhost:3000/HTML/landingAdmin.html'
            
        } else if (data.Role === 'Vet'){
            window.location.href = 'http://localhost:3000/HTML/landingVet.html'

        } else if (data.Role === 'Pet owner'){
            window.location.href = 'http://localhost:3000/HTML/landingOwner.html'
        }
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
    })
    .catch(error => {
        console.error('Error:', error);
        // Aquí puedes mostrar un mensaje de error al usuario
    });
});