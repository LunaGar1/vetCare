document.getElementById('users').addEventListener('click', function() {
    window.location.href = '/user/showUsers';
});

document.getElementById('profile').addEventListener('click', function() {
    window.location.href = '/user/profile';
});

document.getElementById('medicines').addEventListener('click', function() {
    window.location.href = '/medicines/showMedicines';
});

document.getElementById('logout').addEventListener('click', function() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '../HTML/login.html';
});
