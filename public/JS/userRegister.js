// app.js

document.getElementById('userRegister').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    const names = document.getElementById('names').value;
    const lastNames = document.getElementById('lastNames').value;
    const typeID = document.getElementById('typeID').value;
    const ID = document.getElementById('ID').value;
    const Role = document.getElementById('Role').value;
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    await fetch('/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            names:names,
            lastNames: lastNames,
            typeID: typeID,
            ID: ID,
            Role: Role,
            user: user,
            password: password
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
        console.log('Usuario guardado:', data);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
    })
    .catch(error => {
        console.error('Error:', error);
        // Aquí puedes mostrar un mensaje de error al usuario
    });
});