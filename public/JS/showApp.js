const openModalBtn = document.getElementById('newApp'); 
const appModal = document.getElementById('appModal'); 
const cancelButton = document.getElementById('cancelButton'); 
const closeButton = document.querySelector('.close'); 
const appModalUpdate = document.getElementById('appModalUpdate'); 

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


openModalBtn.addEventListener('click', function() {
    appModal.style.display = 'block'; 
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

window.addEventListener('click', function(event) {
    if (event.target === appModalUpdate) {
        appModalUpdate.style.display = 'none';
    }
});

const p = document.getElementById("warnings");
const s = document.getElementById("valid");
const l = document.getElementById("warnings2");
const u = document.getElementById("valid2");
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

            vets.forEach(function(opcion) {
                const option = document.createElement('option');
                option.value = opcion.ID;  
                option.textContent = opcion.names;  
                selectElement.appendChild(option);  
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

            const selectElement = document.getElementById('selectVetsUpdate');

            vets.forEach(function(opcion) {
                const option = document.createElement('option');
                option.value = opcion.ID;  
                option.textContent = opcion.names;  
                selectElement.appendChild(option);  
            });
        }).catch(error => {
            console.error('Error', error);
            l.innerHTML = 'Error procesing your request. Pleasy try again.';
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

            const selectElement = document.getElementById('selectPetsUpdate');

        
            pets.forEach(function(opcion) {
                const option = document.createElement('option');
                option.value = opcion.name;  
                option.textContent = opcion.name;  
                selectElement.appendChild(option);  
            });
        })
        .catch(error => {
            console.error('Error', error);
            l.innerHTML = 'Error procesing your request. Pleasy try again.';
        });



    } catch (error) {
        console.log('error carga datos', error);
    }

});

document.getElementById('appRegister').addEventListener('submit', async function(event) {
    
    event.preventDefault(); 

    try {
        const selectVets = document.getElementById('selectVets');
        const vetName = selectVets.options[selectVets.selectedIndex].textContent;
        const vetID = selectVets.value;
        const petName = document.getElementById('selectPets').value;
        const datetime = document.getElementById('datetime').value;
        const ownerID = localStorage.getItem('ownerID');

    
        let warnings  = ""
        let send = false
        p.innerHTML = ""
        s.innerHTML = ""
    
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
                vetID: vetID,
                petName: petName,
                datetime: datetime,
                ownerID: ownerID,
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
        
              const appActionCell = document.createElement("td");
              appActionCell.className = "text-end"; 

              const editButton = document.createElement("button");
              editButton.className = "btnUpdate btn btn-update btn-sm me-2"; 
              editButton.innerHTML = '<i class="bi bi-pencil"></i>'; 
              editButton.setAttribute('data-id', apps2._id);

                
              const deleteButton = document.createElement("button");
              deleteButton.className = "btnDelete btn btn-danger btn-sm me-2"; 
              deleteButton.innerHTML = '<i class="bi bi-trash"></i>'; 
              deleteButton.setAttribute('data-id', apps2._id);
               
              appActionCell.appendChild(editButton);
              appActionCell.appendChild(deleteButton);  

              appRow.appendChild(vetNameCell);
              appRow.appendChild(petNameCell);
              appRow.appendChild(appDateCell);
              appRow.appendChild(appActionCell);
        
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

document.querySelector('#tableApp').addEventListener('click', async function (event) {
    if (event.target.closest('.btnUpdate')) {
        const editButton = event.target.closest('.btnUpdate');
        const appId = editButton.getAttribute('data-id');
        console.log(appId);
        try {
            const response = await fetch(`/app/getApp/${appId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            const appData = await response.json();
            if (response.ok) {
                document.querySelector('#idUpdate').value = appData._id;
                const selectVetsUp = document.querySelector('#selectVetsUpdate');
                selectVetsUp.value = appData.vetID;
                const selectedOptionVet = Array.from(selectVetsUp.options).find(option => option.value === appData.vetID);
                document.querySelector('#selectPetsUpdate').value = appData.petName;
                document.querySelector('#datetimeUpdate').value = appData.datetime;
                document.querySelector('#appModalUpdate').style.display = 'block';
            } else {
                alert('Error fetching appointment data');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error fetching appointment details. Please try again.');
        }
    }
});

document.querySelector('#appRegisterUpdate').addEventListener('submit', async function (event) {
    event.preventDefault();
    try {
        const appId = document.querySelector('#idUpdate').value;
        const selectVetsUp = document.getElementById('selectVetsUpdate');
        const updatedVetName = selectVetsUp.options[selectVetsUp.selectedIndex].textContent;
        const updatedVetID = selectVetsUp.value;
        const updatedPetName = document.querySelector('#selectPetsUpdate').value;
        const updatedDate = document.querySelector('#datetimeUpdate').value;
        const ownerID = localStorage.getItem('ownerID');

        let warnings  = ""
        let send = false
        l.innerHTML = ""
        u.innerHTML = ""

        if (!updatedVetName || !updatedPetName || !updatedDate){
            warnings+= 'All fields are required <br>';
            send = true
        }

        if(send){
            l.innerHTML = warnings
            return;
        }

        await fetch(`/app/updateApp/${appId}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
            vetName: updatedVetName,
            vetID : updatedVetID,
            petName: updatedPetName,
            datetime: updatedDate,
            ownerID: ownerID
        })
        }).then(async data => {
        console.log(data.status)

        if (data.status == 500) {
            l.innerHTML = 'This hour is already taken, please choose another one.';

        } else if (data.status == 201) {
            u.innerHTML = 'Appointment updated successfully';
            
            setTimeout(() => {
                u.innerHTML = "";
                l.innerHTML = "";
            }, 3000);
            document.getElementById('appRegisterUpdate').reset();
        }
        }).catch(error => { 
            console.error('Error', error);
        });
    } catch (error) {
        console.log(error)  
    }
});    


document.querySelector('#tableApp').addEventListener('click', async function (event) {
    if (event.target.closest('.btnDelete')) { 
        const deleteButton = event.target.closest('.btnDelete');
        const appId = deleteButton.getAttribute('data-id');

        if (confirm('Are you sure you want to delete this appointment?')) {
            try {
                const response = await fetch(`/app/deleteApp/${appId}`, {
                    method: 'DELETE'
                });

                const data = await response.json();
                if (!data.error) {
                    alert('Appointment deleted successfully');
                    location.reload();
                } else {
                    alert(data.error);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error deleting appointment. Please try again.');
            }
        }
    }
});