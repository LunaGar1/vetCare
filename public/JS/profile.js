const modalUsers = new bootstrap.Modal(document.getElementById('modalUsers'));

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => { 
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
};

on(document, 'click', '.btnUpdate', async e => {
    try {
        const response = await fetch('/user/getOneUser');

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const userData = await response.json();
        console.log('Fetched user data:', userData);

        
        document.getElementById('namesUpdate').value = userData.names;
        document.getElementById('lastNamesUpdate').value = userData.lastNames;
        document.getElementById('typeIDupdate').value = userData.typeID;
        document.getElementById('IDupdate').value = userData.ID;
        document.getElementById('RoleUpdate').value = userData.Role;
        document.getElementById('userUpdate').value = userData.user;

        // Mostrar el modal o hacer alguna acción
        modalUsers.show();
    } catch (error) {

        console.error('Error fetching user data:', error);
    }
});



const p=document.getElementById("warnings");
const s=document.getElementById("valid");
document.getElementById('updateUserForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

    const newPassword = document.getElementById('passwordUpdate').value;

    try {
        const response = await fetch('/user/updatePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newPassword })
        });

        const result = await response.json();

        if (response.ok) {
            s.innerHTML = result.message;

            setTimeout(() => {
                s.innerHTML = ""; 
                p.innerHTML = ""; 
                modalUsers.hide();
                location.reload();
            }, 3000);
        } else {
            p.innerHTML = result.error; // Muestra el error si no fue exitoso
        }
    } catch (error) {
        console.error('Error:', error);
        p.innerHTML ='There was an error updating your password. Please try again.';
    }
});






document.getElementById('backButton').addEventListener('click', function() {

    const user = JSON.parse(sessionStorage.getItem('user'));

    if (user.Role === 'Admin'){
        window.location.href = 'http://localhost:3000/HTML/landingAdmin.html'
        
    } else if (user.Role === 'Vet'){
        window.location.href = 'http://localhost:3000/HTML/landingVet.html'

    } else if (user.Role === 'Pet owner'){
        window.location.href = 'http://localhost:3000/HTML/landingOwner.html'
    }
});