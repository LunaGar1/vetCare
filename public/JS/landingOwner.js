document.getElementById('pets').addEventListener('click', function() {
    window.location.href = '../HTML/pets.html';
})
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