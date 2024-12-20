document.getElementById('profile').addEventListener('click', function() {
    window.location.href = 'http://localhost:3000/user/profile';
});

document.getElementById('logout').addEventListener('click', function() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '../HTML/login.html';
});

document.getElementById('schedule').addEventListener('click', function() {
    window.location.href = '../HTML/appointmentsVet.html';
});