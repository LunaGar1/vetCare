
const openModalBtn = document.getElementById('newPet');
const petModal = document.getElementById('petModal');
const petModalU = document.getElementById('petModalUpdate');

const p = document.getElementById('warnings');
const s = document.getElementById('valid');
const l = document.getElementById('warnings2');
const u = document.getElementById('valid2');


// ========================================
// NAVEGACIÓN
// ========================================

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


// ========================================
// ABRIR Y CERRAR MODALES
// ========================================

// Abrir formulario de registro.
openModalBtn.addEventListener('click', function() {
    petModal.style.display = 'block';
});

// Cerrar ambos formularios con Cancel.
document.querySelectorAll('.cancelButton').forEach(button => {
    button.addEventListener('click', function() {
        const modal = this.closest('.modal');
        modal.style.display = 'none';
    });
});

// Cerrar al hacer clic fuera del formulario.
window.addEventListener('click', function(event) {
    if (event.target === petModal) {
        petModal.style.display = 'none';
    }

    if (event.target === petModalU) {
        petModalU.style.display = 'none';
    }
});


// ========================================
// CARGAR Y MOSTRAR MASCOTAS EN LA TABLA
// ========================================

async function loadPets() {
    try {
        const userId = localStorage.getItem('ownerID');

        const response = await fetch(`/pet/pets?ownerId=${encodeURIComponent(userId)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });

        if (!response.ok) {
            throw new Error('Error getting pets');
        }

        const pets = await response.json();

        const petsTableBody = document.querySelector('#tablePets tbody');

        // Limpiar la tabla antes de cargar los datos.
        petsTableBody.innerHTML = '';

        pets.forEach(pet => {
            const petRow = document.createElement('tr');

            const petNameCell = document.createElement('td');
            petNameCell.textContent = pet.name;

            const petAgeCell = document.createElement('td');
            petAgeCell.textContent = pet.age;

            const petActionCell = document.createElement('td');
            petActionCell.className = 'text-end';

            // Botón editar.
            const editButton = document.createElement('button');
            editButton.className = 'btnUpdate btn btn-update btn-sm me-2';
            editButton.innerHTML = '<i class="bi bi-pencil"></i>';
            editButton.setAttribute('data-id', pet._id);
            editButton.title = 'Edit pet';

            // Botón perfil.
            const petProfileButton = document.createElement('button');
            petProfileButton.className = 'btnProfile btn btn-update btn-sm me-2';
            petProfileButton.innerHTML = '<i class="bi bi-person-circle"></i>';
            petProfileButton.setAttribute('data-id', pet._id);
            petProfileButton.title = 'Pet profile';

            // Botón eliminar.
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btnDelete btn btn-danger btn-sm me-2';
            deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
            deleteButton.setAttribute('data-id', pet._id);
            deleteButton.title = 'Delete pet';

            petActionCell.appendChild(editButton);
            petActionCell.appendChild(petProfileButton);
            petActionCell.appendChild(deleteButton);

            petRow.appendChild(petNameCell);
            petRow.appendChild(petAgeCell);
            petRow.appendChild(petActionCell);

            petsTableBody.appendChild(petRow);
        });

    } catch (error) {
        console.error('Error loading pets:', error);
        alert('There was an error getting the pets');
    }
}


// Cargar la tabla cuando se abre la página.
document.addEventListener('DOMContentLoaded', loadPets);


// ========================================
// REGISTRAR MASCOTA
// ========================================

document.getElementById('petRegister').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value;
    const sex = document.getElementById('sex').value;
    const breed = document.getElementById('breed').value.trim();
    const type = document.getElementById('type').value;
    const ownerID = localStorage.getItem('ownerID');

    p.innerHTML = '';
    s.innerHTML = '';

    const numericAge = Number(age);

    let warnings = '';

    if (!name || !age || !sex || !breed || !type) {
        warnings += 'All fields are required.<br>';
    } else {
        if (name.length < 3 || name.length > 20) {
            warnings += 'The name must contain between 3 and 20 characters.<br>';
        }

        if (breed.length < 3 || breed.length > 20) {
            warnings += 'The breed must contain between 3 and 20 characters.<br>';
        }

        if (!Number.isFinite(numericAge) || numericAge < 0 || numericAge > 30) {
            warnings += 'The age must be between 0 and 30 years.<br>';
        }
    }

    if (warnings) {
        p.innerHTML = warnings;
        return;
    }

    try {
        const response = await fetch('/pet/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                age: numericAge,
                sex,
                type,
                breed,
                ownerID
            })
        });

        const data = await response.json();

        if (response.status === 201) {
            // Cerrar el formulario.
            petModal.style.display = 'none';

            // Limpiar los campos.
            document.getElementById('petRegister').reset();

            // Actualizar la tabla sin recargar la página.
            await loadPets();

        } else {
            p.innerHTML = data.message || 'Error registering pet. Please try again.';
        }

    } catch (error) {
        console.error('Error registering pet:', error);
        p.innerHTML = 'Error processing your request. Please try again.';
    }
});


// ========================================
// ABRIR FORMULARIO PARA ACTUALIZAR
// ========================================

document.querySelector('#tablePets').addEventListener('click', async function(event) {

    const editButton = event.target.closest('.btnUpdate');

    if (!editButton) {
        return;
    }

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

            l.innerHTML = '';
            u.innerHTML = '';

            petModalU.style.display = 'block';

        } else {
            alert(data.message || 'Error fetching pet data');
        }

    } catch (error) {
        console.error('Error fetching pet:', error);
        alert('Error fetching pet details. Please try again.');
    }
});


// ========================================
// ACTUALIZAR MASCOTA
// ========================================

document.getElementById('updatePetform').addEventListener('submit', async function(event) {
    event.preventDefault();

    const petId = document.querySelector('#idUpdate').value;
    const updatedName = document.querySelector('#nameUpdate').value.trim();
    const updatedAge = document.querySelector('#ageUpdate').value;
    const updatedSex = document.querySelector('#sexUpdate').value;
    const updatedType = document.querySelector('#typeUpdate').value;
    const updatedBreed = document.querySelector('#breedUpdate').value.trim();

    l.innerHTML = '';
    u.innerHTML = '';

    const numericAge = Number(updatedAge);

    let warnings = '';

    if (!updatedName || !updatedAge || !updatedSex || !updatedBreed || !updatedType) {
        warnings += 'All fields are required.<br>';
    } else {
        if (updatedName.length < 3 || updatedName.length > 20) {
            warnings += 'The name must contain between 3 and 20 characters.<br>';
        }

        if (updatedBreed.length < 3 || updatedBreed.length > 20) {
            warnings += 'The breed must contain between 3 and 20 characters.<br>';
        }

        if (!Number.isFinite(numericAge) || numericAge < 0 || numericAge > 30) {
            warnings += 'The age must be between 0 and 30 years.<br>';
        }
    }

    if (warnings) {
        l.innerHTML = warnings;
        return;
    }

    try {
        const response = await fetch(`/pet/updatePet/${petId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({
                name: updatedName,
                age: numericAge,
                sex: updatedSex,
                type: updatedType,
                breed: updatedBreed
            })
        });

        const data = await response.json();

        if (response.status === 200) {
            // Cerrar el formulario.
            petModalU.style.display = 'none';

            // Limpiar los campos.
            document.getElementById('updatePetform').reset();

            // Actualizar la tabla sin recargar la página.
            await loadPets();

        } else if (response.status === 404) {
            l.innerHTML = 'Pet not found.';
        } else {
            l.innerHTML = data.message || 'Error updating pet. Please try again.';
        }

    } catch (error) {
        console.error('Error updating pet:', error);
        l.innerHTML = 'Error processing your request. Please try again.';
    }
});


// ========================================
// ELIMINAR MASCOTA
// ========================================

document.querySelector('#tablePets').addEventListener('click', async function(event) {

    const deleteButton = event.target.closest('.btnDelete');

    if (!deleteButton) {
        return;
    }

    const petId = deleteButton.getAttribute('data-id');

    if (confirm('Are you sure you want to delete this pet?')) {
        try {
            const response = await fetch(`/pet/deletePet/${petId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                alert('Pet deleted successfully');

                // Actualizar la tabla sin recargar la página.
                await loadPets();

            } else {
                alert(data.message || 'Error deleting pet.');
            }

        } catch (error) {
            console.error('Error deleting pet:', error);
            alert('Error deleting pet. Please try again.');
        }
    }
});


    

