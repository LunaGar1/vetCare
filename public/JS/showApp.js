const openModalBtn = document.getElementById('newApp');
const appModal = document.getElementById('appModal');
const appModalUpdate = document.getElementById('appModalUpdate');

document.getElementById('home').addEventListener('click', function() {
    window.location.href = '../HTML/landingOwner.html';
});

document.getElementById('profile').addEventListener('click', function() {
    window.location.href = '/user/profile';
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


function formatDateTimeLocal(dateValue) {
    const date = new Date(dateValue);

    if (isNaN(date.getTime())) {
        return '';
    }

    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Bogota',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23'
    }).formatToParts(date);

    const getPart = (type) => parts.find(part => part.type === type).value;

    return `${getPart('year')}-${getPart('month')}-${getPart('day')}T${getPart('hour')}:${getPart('minute')}`;
}


function formatDateTimeColombia(dateValue) {
    const date = new Date(dateValue);

    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }

    return date.toLocaleString('es-CO', {
        timeZone: 'America/Bogota',
        dateStyle: 'short',
        timeStyle: 'short'
    });
}


document.querySelectorAll('.cancelButton').forEach(button => {
    button.addEventListener('click', function() {
        const modal = this.closest('.modal');
        modal.style.display = 'none';
    });
});


openModalBtn.addEventListener('click', function() {
    appModal.style.display = 'block';
});


window.addEventListener('click', function(event) {
    if (event.target === appModal) {
        appModal.style.display = 'none';
    }

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
        const vetsResponse = await fetch('/user/getAllVets', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!vetsResponse.ok) {
            throw new Error('Error loading veterinarians');
        }

        vets = await vetsResponse.json();

        const selectElement = document.getElementById('selectVets');

        vets.forEach(function(opcion) {
            const option = document.createElement('option');
            option.value = opcion.ID;
            option.textContent = opcion.names;
            selectElement.appendChild(option);
        });


        const userId = localStorage.getItem('ownerID');

        const petsResponse = await fetch(`/pet/pets?ownerId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!petsResponse.ok) {
            throw new Error('Error loading pets');
        }

        pets = await petsResponse.json();

        const selectPets = document.getElementById('selectPets');

        pets.forEach(function(opcion) {
            const option = document.createElement('option');
            option.value = opcion.name;
            option.textContent = opcion.name;
            selectPets.appendChild(option);
        });

    } catch (error) {
        console.error('Error loading registration data:', error);
        p.innerHTML = 'Error processing your request. Please try again.';
    }
});


document.addEventListener("DOMContentLoaded", async () => {
    try {
        const vetsResponse = await fetch('/user/getAllVets', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!vetsResponse.ok) {
            throw new Error('Error loading veterinarians');
        }

        vets = await vetsResponse.json();

        const selectElement = document.getElementById('selectVetsUpdate');

        vets.forEach(function(opcion) {
            const option = document.createElement('option');
            option.value = opcion.ID;
            option.textContent = opcion.names;
            selectElement.appendChild(option);
        });


        const userId = localStorage.getItem('ownerID');

        const petsResponse = await fetch(`/pet/pets?ownerId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!petsResponse.ok) {
            throw new Error('Error loading pets');
        }

        pets = await petsResponse.json();

        const selectPets = document.getElementById('selectPetsUpdate');

        pets.forEach(function(opcion) {
            const option = document.createElement('option');
            option.value = opcion.name;
            option.textContent = opcion.name;
            selectPets.appendChild(option);
        });

    } catch (error) {
        console.error('Error loading update data:', error);
        l.innerHTML = 'Error processing your request. Please try again.';
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

        p.innerHTML = '';
        s.innerHTML = '';

        if (!vetID || !petName || !datetime) {
            p.innerHTML = 'All fields are required';
            return;
        }

        const appointmentDate = new Date(datetime);

        if (isNaN(appointmentDate.getTime())) {
            p.innerHTML = 'Please enter a valid date and time.';
            return;
        }

        const response = await fetch('/app/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                vetName: vetName,
                vetID: vetID,
                petName: petName,
                datetime: appointmentDate.toISOString(),
                ownerID: ownerID
            })
        });

        const data = await response.json();

        if (response.status === 409) {
            p.innerHTML = 'This hour is already taken, please choose another one.';

        } else if (response.status === 201) {
            appModal.style.display = 'none';
            document.getElementById('appRegister').reset();

            setTimeout(() => {
                location.reload();
            }, 300);

        } else {
            p.innerHTML = data.message || 'Error scheduling appointment.';
        }

    } catch (error) {
        console.error('Error registering appointment:', error);
        p.innerHTML = 'There was an error processing your request.';
    }
});


document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem('ownerID');

    try {
        const response = await fetch(`/app/apps?ownerId=${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });

        if (!response.ok) {
            throw new Error('Error getting appointments');
        }

        const apps = await response.json();

        const appsTableBody = document.querySelector('#tableApp tbody');
        appsTableBody.innerHTML = '';

        apps.forEach(app => {
            const appRow = document.createElement('tr');

            const vetNameCell = document.createElement('td');
            vetNameCell.textContent = app.vetName;

            const petNameCell = document.createElement('td');
            petNameCell.textContent = app.petName;

            // Mostrar la fecha y hora convertidas a la zona horaria de Colombia.
            const appDateCell = document.createElement('td');
            appDateCell.textContent = formatDateTimeColombia(app.datetime);

            const appActionCell = document.createElement('td');
            appActionCell.className = 'text-end';

            const editButton = document.createElement('button');
            editButton.className = 'btnUpdate btn btn-update btn-sm me-2';
            editButton.innerHTML = '<i class="bi bi-pencil"></i>';
            editButton.setAttribute('data-id', app._id);

            const deleteButton = document.createElement('button');
            deleteButton.className = 'btnDelete btn btn-danger btn-sm me-2';
            deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
            deleteButton.setAttribute('data-id', app._id);

            appActionCell.appendChild(editButton);
            appActionCell.appendChild(deleteButton);

            appRow.appendChild(vetNameCell);
            appRow.appendChild(petNameCell);
            appRow.appendChild(appDateCell);
            appRow.appendChild(appActionCell);

            appsTableBody.appendChild(appRow);
        });

    } catch (error) {
        console.error('Error getting appointments:', error);
        alert('There was an error getting the appointments');
    }
});


document.querySelector('#tableApp').addEventListener('click', async function(event) {
    if (event.target.closest('.btnUpdate')) {
        const editButton = event.target.closest('.btnUpdate');
        const appId = editButton.getAttribute('data-id');

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

                document.querySelector('#selectPetsUpdate').value = appData.petName;

                document.querySelector('#datetimeUpdate').value =
                    formatDateTimeLocal(appData.datetime);

                appModalUpdate.style.display = 'block';

            } else {
                alert('Error fetching appointment data');
            }

        } catch (error) {
            console.error('Error fetching appointment:', error);
            alert('Error fetching appointment details. Please try again.');
        }
    }
});


document.querySelector('#appRegisterUpdate').addEventListener('submit', async function(event) {
    event.preventDefault();

    try {
        const appId = document.querySelector('#idUpdate').value;

        const selectVetsUp = document.getElementById('selectVetsUpdate');

        const updatedVetName =
            selectVetsUp.options[selectVetsUp.selectedIndex].textContent;

        const updatedVetID = selectVetsUp.value;

        const updatedPetName = document.querySelector('#selectPetsUpdate').value;
        const updatedDate = document.querySelector('#datetimeUpdate').value;

        const ownerID = localStorage.getItem('ownerID');

        l.innerHTML = '';
        u.innerHTML = '';

        if (!updatedVetID || !updatedPetName || !updatedDate) {
            l.innerHTML = 'All fields are required';
            return;
        }


        const appointmentDate = new Date(updatedDate);

        if (isNaN(appointmentDate.getTime())) {
            l.innerHTML = 'Please enter a valid date and time.';
            return;
        }

        const response = await fetch(`/app/updateApp/${appId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({
                vetName: updatedVetName,
                vetID: updatedVetID,
                petName: updatedPetName,
                datetime: appointmentDate.toISOString(),
                ownerID: ownerID
            })
        });

        const data = await response.json();

        if (response.status === 409) {
            l.innerHTML = 'This hour is already taken, please choose another one.';

        } else if (response.status === 200) {
            document.getElementById('appRegisterUpdate').reset();

            appModalUpdate.style.display = 'none';

            setTimeout(() => {
                location.reload();
            }, 300);

        } else if (response.status === 404) {
            l.innerHTML = 'Appointment not found';

        } else {
            l.innerHTML = data.message || 'Error updating appointment. Please try again.';
        }

    } catch (error) {
        console.error('Error updating appointment:', error);
        l.innerHTML = 'There was an error processing your request.';
    }
});


// ELIMINAR CITA
document.querySelector('#tableApp').addEventListener('click', async function(event) {
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
                console.error('Error deleting appointment:', error);
                alert('Error deleting appointment. Please try again.');
            }
        }
    }
});