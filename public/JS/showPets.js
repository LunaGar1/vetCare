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

cancelBtn.addEventListener('click', function() {
    petModalUpdate.style.display = 'none';
});

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
    window.location.href = '../HTML/appointments.html';
});

document.getElementById('logout').addEventListener('click', function() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '../HTML/login.html';
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


                // const petActionCell = document.createElement("td");
                // petActionCell.className = "text-end"; 
        
                const editButton = document.createElement("button");
                editButton.className = "btnUpdate btn btn-primary btn-sm me-2"; 
                editButton.innerHTML = '<i class="bi bi-pencil"></i>'; 
                editButton.setAttribute('data-id', pet2._id);

                
                const deleteButton = document.createElement("button");
                deleteButton.className = "btnDelete btn btn-danger btn-sm me-2"; 
                deleteButton.innerHTML = '<i class="bi bi-trash"></i>'; 
                deleteButton.setAttribute('data-id', pet2._id);
               
                petActionCell.appendChild(editButton);
                petActionCell.appendChild(deleteButton);

        
              const petActionCell = document.createElement("td");
              petActionCell.textContent = 'Editar';   
        
            
              
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


    


document.getElementById('petRegister').addEventListener('submit', async function(event) {

    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const sex = document.getElementById('sex').value;
    const breed = document.getElementById('breed').value;
    const type = document.getElementById('type').value;
    const ownerID = localStorage.getItem('ownerID');

    const p=document.getElementById("warnings");
    const s=document.getElementById("valid");

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
                location.reload();
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


document.querySelector('#tablePets').addEventListener('click', async function (event) {
    if (event.target.closest('.btnUpdate')) {
        const editButton = event.target.closest('.btnUpdate');
        const petId = editButton.getAttribute('data-id');

        try {
            const response = await fetch(`/pet/getPet/${petId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            const petData = await response.json();
            if (response.ok) {
                document.querySelector('#idUpdate').value = petData._id;
                document.querySelector('#nameUpdate').value = petData.name;
                document.querySelector('#ageUpdate').value = petData.age;
                document.querySelector('#sexUpdate').value = petData.sex;
                document.querySelector('#typeUpdate').value = petData.type;
                document.querySelector('#breedUpdate').value = petData.breed;

                document.querySelector('#petModalUpdate').style.display = 'block';
            } else {
                alert('Error fetching pet data');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error fetching pet details. Please try again.');
        }
    }
});


document.querySelector('#updatePetform').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

    const petId = document.querySelector('#idUpdate').value;
    const updatedName = document.querySelector('#nameUpdate').value;
    const updatedAge = document.querySelector('#ageUpdate').value;
    const updatedSex = document.querySelector('#sexUpdate').value;
    const updatedType = document.querySelector('#typeUpdate').value;
    const updatedBreed = document.querySelector('#breedUpdate').value;

    const p=document.getElementById("warnings");
    const s=document.getElementById("valid");

    let warnings  = ""
    let send = false
    p.innerHTML = ""
    s.innerHTML = ""

    if (!updatedName || !updatedAge || !updatedSex || !updatedBreed || !updatedType){
        warnings+= 'All fields are required <br>';
        send = true
    }
    else{
        if(updatedName.length < 3 || updatedName.length > 20){
            warnings+= 'The name must contain between 3 and 20 characters <br>';
            send = true
        }

        if(updatedBreed.length < 3 || updatedBreed.length > 20){
            warnings+= 'The breed must contain between 3 and 20 characters <br>';
            send = true
        }

        if(updatedAge < 0 || updatedAge > 30){
            warnings+= 'The age must be between 0 and 30 years <br>';
            send = true
        }
    }

    if(send){
        p.innerHTML = warnings
        return;
    }

    
    try {
        const response = await fetch(`/pet/updatePet/${petId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({
                name: updatedName,
                age: updatedAge,
                sex: updatedSex,
                type: updatedType,
                breed: updatedBreed
            })
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
            s.innerHTML = 'Pet updated successfully';

            setTimeout(() => {
                s.innerHTML = "";
                p.innerHTML = "";
                //location.reload();
            }, 3000);
        } else {
            p.innerHTML = data.message;
        }
    } catch (error) {
        console.error('Error updating pet:', error);
        p.innerHTML='Error updating pet. Please try again.';
    }
});





document.querySelector('#tablePets').addEventListener('click', async function (event) {
    if (event.target.closest('.btnDelete')) { 
        const deleteButton = event.target.closest('.btnDelete');
        const petId = deleteButton.getAttribute('data-id');

        if (confirm('Are you sure you want to delete this pet?')) {
            try {
                const response = await fetch(`/pet/deletePet/${petId}`, {
                    method: 'DELETE'
                });

                const data = await response.json();
                if (!data.error) {
                    alert('Pet deleted successfully');
                    location.reload();
                } else {
                    alert(data.error);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error deleting pet. Please try again.');
            }
        }
    }
});

    

