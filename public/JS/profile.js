document.getElementById('backButton').addEventListener('click', function() {
    if (data.Role === 'Admin'){
        window.location.href = 'http://localhost:3000/HTML/landingAdmin.html'
        
    } else if (data.Role === 'Vet'){
        window.location.href = 'http://localhost:3000/HTML/landingVet.html'

    } else if (data.Role === 'Pet owner'){
        window.location.href = 'http://localhost:3000/HTML/landingOwner.html'
    }
});