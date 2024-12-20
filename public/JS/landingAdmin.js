document.getElementById('users').addEventListener('click', function() {
    window.location.href = 'http://localhost:3000/user/showUsers';
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
