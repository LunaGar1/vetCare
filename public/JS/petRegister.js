document.getElementById('home').addEventListener('click', function() {
    window.location.href = '../HTML/landingOwner.html';
});

document.getElementById('profile').addEventListener('click', function() {
    window.location.href = 'http://localhost:3000/user/profile';
});

document.getElementById('logout').addEventListener('click', function() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '../HTML/login.html';
});




const p=document.getElementById("warnings");
const s=document.getElementById("valid");

document.getElementById('petRegister').addEventListener('submit', async function(event) {

    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const sex = document.getElementById('sex').value;
    const breed = document.getElementById('breed').value;
    const type = document.getElementById('type').value;

    let warnings  = ""
    let send = false
    p.innerHTML = ""

    if (!name || !date || !sex || !breed || !type){
        warnings+= 'All fields are required <br>';
        send = true
    }
    else{
        if(name.length < 3 || name.length > 20){
            warnings+= 'The name must contain between 3 and 20 characters <br>';
            send = true
        }

        if(breed.length < 3 || breed.length > 20){
            warnings+= 'The breed must contain between 3 and 20 characters <br>';
            send = true
        }
    }

    if(send){
        p.innerHTML = warnings
        return;
    }

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
    .then(response => response.json())
    .then(data => {
        if(!data.error){
            s.innerHTML = data.message;

            setTimeout(() => {
                s.innerHTML = "";
                p.innerHTML = "";
            }, 3000);
            document.getElementById('petRegister').reset();
        }
        else{
            p.innerHTML = data.error;
        } 
    })
    .catch(error => {
        console.error('Error', error);
        p.innerHTML = 'Error procesing your request. Pleasy try again.';
    });
});

// document.addEventListener('DOMContentLoaded', async () => {
//     try {
//         const response = await fetch('/pet/getAllPets'); 
//         const pets = await response.json();

//         const tableBody = document.querySelector('.tabla-primary tbody'); 

//         pets.forEach(pet => {
//             const row = document.createElement('tr');
//             row.innerHTML = `
//                 <td>${pet.name}</td>
//                 <td>${pet.age}</td>
//             `;
//             tableBody.appendChild(row);
//         });
//     } catch (error) {
//         console.error('Error al cargar las mascotas:', error);
//     }
// });

document.getElementById('cancelButton').addEventListener('click', function() {
    window.location.href = '../HTML/landingOwner.html';
});
