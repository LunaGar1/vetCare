const p=document.getElementById("warnings");
const s=document.getElementById("valid")

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email').value;
    const passwordInput = this.querySelector('input[type="password"]').value;

    let warnings = ""
    let send=false
    p.innerHTML = ""

    if(!emailInput || !passwordInput ){
        warnings+='All fields are required <br>';
        send=true
    }   
    else{

        let regexUsername = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
        if (!regexUsername.test(emailInput)) {
            warnings+='The username must be an email address <br>';
            send=true
        }
    
        if(passwordInput.length < 8 || passwordInput.length > 15){
            warnings+='The password must contain between 8 and 15 characters <br>';
            send=true
        }
    }

    if(send){
        p.innerHTML =warnings
        return;
    }

    await fetch('/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: emailInput,
            password: passwordInput
        })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.error) {
            s.innerHTML = data.message;
            if (data.Role === 'Admin'){
                window.location.href = 'http://localhost:3000/HTML/landingAdmin.html'
                
            } else if (data.Role === 'Vet'){
                window.location.href = 'http://localhost:3000/HTML/landingVet.html'
    
            } else if (data.Role === 'Pet owner'){
                window.location.href = 'http://localhost:3000/HTML/landingOwner.html'
                // localStorage.setItem('ID', data.ID);
            }
            setTimeout(() => {
                s.innerHTML = ""; 
                p.innerHTML = ""; 
            }, 3000);
            document.getElementById('loginForm').reset();
        } else {
            p.innerHTML = data.error; 
        }
    })
        
    .catch(error => {
        console.error('Error:', error);
        p.innerHTML = 'Error processing your request. Please try again.';
    });

});