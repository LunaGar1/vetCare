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