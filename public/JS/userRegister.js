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



const p=document.getElementById("warnings");
const s=document.getElementById("valid");


document.getElementById('userRegister').addEventListener('submit', async function(event) {
    
    event.preventDefault(); 

    const names = document.getElementById('names').value;
    const lastNames = document.getElementById('lastNames').value;
    const typeID = document.getElementById('typeID').value;
    const ID = document.getElementById('ID').value;
    const Role = document.getElementById('Role').value;
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;

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

document.getElementById('cancelButton').addEventListener('click', function() {
    window.location.href = 'http://localhost:3000/user/showUsers';
});