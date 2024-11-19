const openModalBtn = document.getElementById('newApp'); 
const petModal = document.getElementById('petModal'); 
const cancelButton = document.getElementById('cancelButton'); 
const closeButton = document.querySelector('.close'); 

document.getElementById('home').addEventListener('click', function() {
    window.location.href = '../HTML/landingOwner.html';
});

document.getElementById('profile').addEventListener('click', function() {
    window.location.href = 'http://localhost:3000/user/profile';
});

document.getElementById('Users').addEventListener('click', function() {
    window.location.href = '../HTML/pets.html';
});

document.getElementById('app').addEventListener('click', function() {
    window.location.href = '../HTML/appointments.hmtl';
});

document.getElementById('logout').addEventListener('click', function() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '../HTML/login.html';
});


openModalBtn.addEventListener('click', function() {
    appModal.style.display = 'block'; 
});


cancelButton.addEventListener('click', function() {
    appModal.style.display = 'none'; 
});

window.addEventListener('click', function(event) {
    if (event.target === appModal) {
        appModal.style.display = 'none';
    }
});

const p = document.getElementById("warnings");
const s = document.getElementById("valid");
let vets = [];
let pets = [];

document.addEventListener("DOMContentLoaded", async () => {

    try {
        await fetch('/user/getAllVets', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async data => {
            vetsJson = await data.json();
            console.log(vetsJson)
            vets = vetsJson;

            const selectElement = document.getElementById('selectVets');

            // Recorrer el arreglo de opciones y crear un <option> para cada una
            vets.forEach(function(opcion) {
                const option = document.createElement('option');
                option.value = opcion.names;  // El valor que se enviará cuando se envíe el formulario
                option.textContent = opcion.names;  // El texto visible en la opción
                selectElement.appendChild(option);  // Añadir la opción al select
            });
        }).catch(error => {
            console.error('Error', error);
            p.innerHTML = 'Error procesing your request. Pleasy try again.';
        });

        const userId = localStorage.getItem('ownerID');

        await fetch(`/pet/pets?ownerId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async data => {
            petsJson = await data.json();
            console.log(petsJson)
            pets = petsJson;

            const selectElement = document.getElementById('selectPets');

        
            pets.forEach(function(opcion) {
                const option = document.createElement('option');
                option.value = opcion.name;  
                option.textContent = opcion.name;  
                selectElement.appendChild(option);  
            });
        })
        .catch(error => {
            console.error('Error', error);
            p.innerHTML = 'Error procesing your request. Pleasy try again.';
        });



    } catch (error) {
        console.log('error carga datos', error);
    }

});

document.getElementById('appRegister').addEventListener('submit', async function(event) {
    
    event.preventDefault(); 

    try {
        const vetName = document.getElementById('selectVets').value;
        const petName = document.getElementById('selectPets').value;
        const datetime = document.getElementById('datetime').value;
        const ownerID = localStorage.getItem('ownerID');
    
        let warnings  = ""
        let send = false
        p.innerHTML = ""
    
        if (!vetName || !petName || !datetime){
            warnings+= 'All fields are required <br>';
            send = true
        }

        if(send){
            p.innerHTML = warnings
            return;
        }

        await fetch('/app/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                vetName: vetName,
                petName: petName,
                datetime: datetime,
                ownerID: ownerID
            })
        }).then(async data => {
            console.log(data.status)

            if (data.status == 500) {
                p.innerHTML = 'This hour is already taken, please choose another one.';

            } else if (data.status == 201) {
                s.innerHTML = 'Appointment scheduled successfully';
                
                setTimeout(() => {
                    s.innerHTML = "";
                    p.innerHTML = "";
                    appModal.hide();
                    location.reload();
                }, 3000);
                document.getElementById('appRegister').reset();
            }
        })
        .catch(error => { 
            console.error('Error', error);
        });
    } catch (error) {
        console.log(error)  
    }
});
    
document.addEventListener("DOMContentLoaded", async () => {

    const userId = localStorage.getItem('ownerID');

    try {
        await fetch(`/app/apps?ownerId=${userId}`, {
          method: 'GET', 
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          }
        }).then(async app => {
            const apps = await app.json();

            const appsTableBody = document.querySelector('#tableApp tbody');
            appsTableBody.innerHTML = ''; 
        
            await apps.forEach(async apps2 => {

                console.log(await apps2)
              const appRow = document.createElement('tr');
              
              const vetNameCell = document.createElement('td');
              vetNameCell.textContent = await apps2.vetName;
        
              const petNameCell = document.createElement('td');
              petNameCell.textContent = await apps2.petName;

              const appDateCell = document.createElement('td');
              appDateCell.textContent = await apps2.datetime;   
        
              appRow.appendChild(vetNameCell);
              appRow.appendChild(petNameCell);
              appRow.appendChild(appDateCell);
        
              appsTableBody.appendChild(appRow);
            });
        }).catch(error => {
            console.log(error)
        })
        
    } catch (error) {
    console.error('Error:', error);
    alert('There was an error getting the appointments');
    }
});

