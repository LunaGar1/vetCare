const openModalBtn = document.getElementById('newPet'); 
const petModal = document.getElementById('petModal'); 
const cancelButton = document.getElementById('cancelButton'); 
const closeButton = document.querySelector('.close'); 

openModalBtn.addEventListener('click', function() {
    petModal.style.display = 'block'; 
});


cancelButton.addEventListener('click', function() {
    petModal.style.display = 'none'; 
});

window.addEventListener('click', function(event) {
    if (event.target === petModal) {
        petModal.style.display = 'none';
    }
});


document.addEventListener("DOMContentLoaded", async () => {

    const userId = localStorage.getItem('ownerID');

    try {
        await fetch(`/pet/pets?ownerId=${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          }
        }).then(async pet => {
            const pets = await pet.json();

            const petsTableBody = document.querySelector('#tablePets tbody');
            petsTableBody.innerHTML = ''; 
        
            await pets.forEach(async pet2 => {
              const petRow = document.createElement('tr');
              
              const petNameCell = document.createElement('td');
              petNameCell.textContent = await pet2.name;
        
              const petAgeCell = document.createElement('td');
              petAgeCell.textContent = await pet2.age;

              const petActionCell = document.createElement("td");
              petActionCell.textContent = 'Editar';   
        
              // Añade la fila al cuerpo de la tabla
              
              petRow.appendChild(petNameCell);
              petRow.appendChild(petAgeCell);
              petRow.appendChild(petActionCell);
        
              petsTableBody.appendChild(petRow);
            });
        }).catch(error => {
            console.log(error)
        })
        
    } catch (error) {
    console.error('Error:', error);
    alert('There was an error getting the pets');
    }
});
    
    const p=document.getElementById("warnings");
    const s=document.getElementById("valid");
    
    document.getElementById('petRegister').addEventListener('submit', async function(event) {
    
        event.preventDefault(); 
    
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const sex = document.getElementById('sex').value;
        const breed = document.getElementById('breed').value;
        const type = document.getElementById('type').value;
        const ownerID = localStorage.getItem('ownerID');
    
        let warnings  = ""
        let send = false
        p.innerHTML = ""
    
        if (!name || !age || !sex || !breed || !type){
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
    
            if(age < 0 || age > 30){
                warnings+= 'The age must be between 0 and 30 years <br>';
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
                age: age,
                sex: sex,
                type: type,
                breed: breed, 
                ownerID: ownerID
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
    

