document.getElementById('petRegister').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const sex = document.getElementById('sex').value;
    const breed = document.getElementById('breed').value;
    const type = document.getElementById('type').value;


    console.log(name, date, sex, breed, type)
    await fetch('/pet/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            date: date,
            sex: sex,
            type: type,
            breed: breed 
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then(data => {
        console.log('Pet saved:', data);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
    })
    .catch(error => {
        console.error('Error:', error);
        // Aquí puedes mostrar un mensaje de error al usuario
    });
});