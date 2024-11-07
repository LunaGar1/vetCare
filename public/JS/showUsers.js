document.getElementById('home').addEventListener('click', function() {
    window.location.href = '../HTML/landingAdmin.html';
});

document.getElementById('profile').addEventListener('click', function() {
    window.location.href = 'http://localhost:3000/user/profile';
});

document.getElementById('logout').addEventListener('click', function() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '../HTML/login.html';
});




document.getElementById('btnNewUser').addEventListener('click', function() {
    window.location.href = '../HTML/userRegister.html';
});

const modalUsers = new bootstrap.Modal(document.getElementById('modalUsers'));

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => { 
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
};


on(document, 'click', '.btnUpdate', async e => {
    try{
        const row = e.target.closest('tr');
        const ID = row.children[0].innerHTML.trim();

        console.log('ID:', ID);

        const response = await fetch(`/user/getUser/${ID}`);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const userData = await response.json();
        console.log('Fetched user data:', userData);

        IDupdate.value = userData.ID;
        namesUpdate.value = userData.names;
        lastNamesUpdate.value = userData.lastNames;
        typeIDupdate.value = userData.typeID;
        RoleUpdate.value = userData.Role;
        userUpdate.value = userData.user;


        modalUsers.show();
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
    
});

const p=document.getElementById("warnings");
const s=document.getElementById("valid");

document.getElementById('updateUserForm').addEventListener('submit', async function (event) {

    event.preventDefault(); 

    const namesUpdate = document.getElementById('namesUpdate').value;
    const lastNamesUpdate = document.getElementById('lastNamesUpdate').value;
    const typeIDupdate = document.getElementById('typeIDupdate').value;
    const IDupdate = document.getElementById('IDupdate').value;
    const RoleUpdate = document.getElementById('RoleUpdate').value;
    const userUpdate = document.getElementById('userUpdate').value;
    const passwordUpdate = document.getElementById('passwordUpdate').value;

    let warnings = ""
    let send=false
    p.innerHTML = ""

    if(!namesUpdate || !lastNamesUpdate || !typeIDupdate || !IDupdate || !RoleUpdate || !userUpdate){
        warnings+='All fields with * are required <br>';
        send=true
    }else{
    
        if(namesUpdate.length < 3 || namesUpdate.length > 20){
            warnings+='The name must contain between 3 and 20 characters <br>';
            send=true
        }
        if(lastNamesUpdate.length < 3 || lastNamesUpdate.length > 20){
            warnings+='The last names must contain between 3 and 20 characters <br>';
            send=true
        }
    
        const regexID = /^\d+$/;
    
        if (!regexID.test(IDupdate) || IDupdate.length < 8 || IDupdate.length > 12) {
            warnings+='The ID must be only numbers and contain between 8 and 12 digits <br>';
            send=true
        }
        
        let regexUsername = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
        if (!regexUsername.test(userUpdate)) {
            warnings+='The username must be an email address <br>';
            send=true
        }
    
        if(passwordUpdate.length > 0 && passwordUpdate.length < 12){
            warnings+='The password must contain 12 characters <br>';
            send=true
        }
    
    }

    if(send){
        p.innerHTML =warnings
        return;
    }

    await fetch('/user/editUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            namesUpdate,
            lastNamesUpdate,
            typeIDupdate,
            IDupdate,
            RoleUpdate,
            userUpdate,
            passwordUpdate
        })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.error) {
            s.innerHTML = data.message;

            setTimeout(() => {
                s.innerHTML = ""; 
                p.innerHTML = ""; 
                modalUsers.hide();
            }, 3000);

        } else {
            p.innerHTML = data.error; 
        }
    })
    .catch(error => {
        console.error('Error:', error);
        p.innerHTML = 'Error processing your request. Please try again.';
    });








});