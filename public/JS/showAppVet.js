document.getElementById('home').addEventListener('click', function() {
  window.location.href = '../HTML/landingVet.html';
});

document.getElementById('profile').addEventListener('click', function() {
    window.location.href = 'http://localhost:3000/user/profile';
});

document.getElementById('logout').addEventListener('click', function() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '../HTML/login.html';
});

const p = document.getElementById("warnings");
const s = document.getElementById("valid");
let vets = [];
let pets = [];

document.addEventListener("DOMContentLoaded", async () => {

  const vetID = localStorage.getItem('vetID');
  console.log(vetID);

    try {
        await fetch(`/app/getAppsByVet/${vetID}`, {
          method: 'GET', 
          headers: {
           'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          }
        }).then(async app => {
            const apps = await app.json();

            const appsTableBody = document.querySelector('#scheduleApp tbody');
            appsTableBody.innerHTML = ''; 
        
            await apps.forEach(async apps2 => {

              console.log(await apps2)
              const appRow = document.createElement('tr');
        
              const petNameCell = document.createElement('td');
              petNameCell.textContent = await apps2.petName;

              const appDateCell = document.createElement('td');
              appDateCell.textContent = await apps2.datetime;   
        
              const appActionCell = document.createElement("td");
              appActionCell.className = "text-end"; 


              const petProfileButton = document.createElement("button");
              petProfileButton.className = "btnUpdate btn btn-update btn-sm me-2"; 
              petProfileButton.innerHTML = '<i class="bi bi-person-circle"></i>'; 
              petProfileButton.setAttribute('data-id', apps2._id);
                
             
              appActionCell.appendChild(petProfileButton);

              appRow.appendChild(petNameCell);
              appRow.appendChild(appDateCell);
              appRow.appendChild(appActionCell);
        
              appsTableBody.appendChild(appRow);
            });
        }).catch(error => {
            console.log(error)
        })
        
    } catch (error) {
    console.error('Error:', error);
    alert('There was an error getting the appointments');
    }
});