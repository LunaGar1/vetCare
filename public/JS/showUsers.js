document.getElementById('home').addEventListener('click', function() {
    window.location.href = '../HTML/landingAdmin.html';
});

document.getElementById('profile').addEventListener('click', function() {
    window.location.href = 'http://localhost:3000/user/profile';
});

document.getElementById('medicines').addEventListener('click', function() {
    window.location.href = 'http://localhost:3000/medicines/showMedicines';
});


document.getElementById('logout').addEventListener('click', function() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '../HTML/login.html';
});

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => { 
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
};


const modalRegisterUsers = new bootstrap.Modal(document.getElementById('modalRegisterUsers'));

 on(document, 'click', '.btnNewUser', e => {
    modalRegisterUsers.show();
});


document.getElementById('userRegister').addEventListener('submit', async function(event) {
    
    event.preventDefault(); 

    const names = document.getElementById('names').value;
    const lastNames = document.getElementById('lastNames').value;
    const typeID = document.getElementById('typeID').value;
    const ID = document.getElementById('ID').value;
    const Role = document.getElementById('Role').value;
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    const p=document.getElementById("warnings");
    const s=document.getElementById("valid");

    let warnings = ""
    let send=false
    p.innerHTML = ""

    if(!names || !lastNames || !typeID || !ID || !Role || !user || !password ){
        warnings+='All fields are required <br>';
        send=true
    }else{
    
        if(names.length < 3 || names.length > 20){
            warnings+='The name must contain between 3 and 20 characters <br>';
            send=true
        }
        if(lastNames.length < 3 || lastNames.length > 20){
            warnings+='The last names must contain between 3 and 20 characters <br>';
            send=true
        }
    
        const regexID = /^\d+$/;
    
        if (!regexID.test(ID) || ID.length < 8 || ID.length > 12) {
            warnings+='The ID must be only numbers and contain between 8 and 12 digits <br>';
            send=true
        }
        
        let regexUsername = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
        if (!regexUsername.test(user)) {
            warnings+='The username must be an email address <br>';
            send=true
        }
    
        if(password.length < 12){
            warnings+='The password must contain 12 characters <br>';
            send=true
        }
    
    
    }

    if(send){
        p.innerHTML =warnings
        return;
    }

    await fetch('/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            names,
            lastNames,
            typeID,
            ID,
            Role,
            user,
            password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.error) {
            s.innerHTML = data.message;

            setTimeout(() => {
                s.innerHTML = ""; 
                p.innerHTML = ""; 
                modalUpdateUsers.hide();
                location.reload();
            }, 3000);
            document.getElementById('userRegister').reset();
        } else {
            p.innerHTML = data.error; 
        }
    })
    .catch(error => {
        console.error('Error:', error);
        p.innerHTML = 'Error processing your request. Please try again.';
    });

});


const modalUpdateUsers = new bootstrap.Modal(document.getElementById('modalUpdateUsers'));


    


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


        modalUpdateUsers.show();
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
    
});



document.getElementById('updateUserForm').addEventListener('submit', async function (event) {

    event.preventDefault(); 

    const namesUpdate = document.getElementById('namesUpdate').value;
    const lastNamesUpdate = document.getElementById('lastNamesUpdate').value;
    const typeIDupdate = document.getElementById('typeIDupdate').value;
    const IDupdate = document.getElementById('IDupdate').value;
    const RoleUpdate = document.getElementById('RoleUpdate').value;
    const userUpdate = document.getElementById('userUpdate').value;
    const passwordUpdate = document.getElementById('passwordUpdate').value;

    const p=document.getElementById("warnings2");
    const s=document.getElementById("valid2");

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
                modalUpdateUsers.hide();
                location.reload();
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


document.querySelectorAll('.btnDelete').forEach(button => {
    button.addEventListener('click', async function () {
        const userId = this.getAttribute('data-id');

        if (confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch(`/user/deleteUser/${userId}`, {
                    method: 'DELETE'
                });

                const data = await response.json();
                if (!data.error) {
                    alert('User deleted successfully');
                    location.reload();
                } else {
                    alert(data.error);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error deleting user. Please try again.');
            }
        }
    });
});
