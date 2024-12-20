document.getElementById('users').addEventListener('click', function() {
    window.location.href = 'http://localhost:3000/user/showUsers';
});

document.getElementById('profile').addEventListener('click', function() {
    window.location.href = 'http://localhost:3000/user/profile';
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

const newMedicineModal = new bootstrap.Modal(document.getElementById('newMedicineModal'));

 on(document, 'click', '.btnNewMedicine', e => {
    newMedicineModal.show();
});


document.getElementById('medicineRegister').addEventListener('submit', async function(event) {
    
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;

    const p=document.getElementById("warnings");
    const s=document.getElementById("valid");

    let warnings = ""
    let send=false
    p.innerHTML = ""

    if(!name || !price || !stock ){
        warnings+='All fields are required <br>';
        send=true
    }else{
    
        if(name.length < 3 || name.length > 20){
            warnings+='The name must contain between 3 and 20 characters <br>';
            send=true
        }

        const priceRegex = /^(\d{1,3}(\.\d{3}))$/;

        if(!priceRegex.test(price)){
            warnings+='Enter a valid price (With a point of a thousand) <br>';
            send=true
        }
    
        if (stock < 0) {
            warnings+='The stock must be greater than or equal to 0 <br>';
            send=true
        }
    
    
    }

    if(send){
        p.innerHTML =warnings
        return;
    }

    await fetch('/medicines/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            price,
            stock
        })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.error) {
            s.innerHTML = data.message;

            setTimeout(() => {
                s.innerHTML = ""; 
                p.innerHTML = ""; 
                newMedicineModal.hide();
                location.reload();
            }, 3000);
            document.getElementById('medicineRegister').reset();
        } else {
            p.innerHTML = data.error; 
        }
    })
    .catch(error => {
        console.error('Error:', error);
        p.innerHTML = 'Error processing your request. Please try again.';
    });

});

const updateMedicineModal = new bootstrap.Modal(document.getElementById('updateMedicineModal'));

document.addEventListener('click', async function (e) {
    if (e.target && e.target.classList.contains('btnUpdate')) {
        const row = e.target.closest('tr');
        const medicineId = row.getAttribute('data-id');

        const response = await fetch(`/medicines/getMedicine/${medicineId}`);
        if (!response.ok) {
            alert('Error fetching medicine data');
            return;
        }

        const medicineData = await response.json();
        console.log('Fetched medicine data:', medicineData);

        document.getElementById('idUpdate').value = medicineData._id;
        document.getElementById('nameUpdate').value = medicineData.name;
        document.getElementById('priceUpdate').value = medicineData.price;
        document.getElementById('stockUpdate').value = medicineData.stock;

        
        updateMedicineModal.show();
    }
});


document.getElementById('updateMedicineForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const idUpdate = document.getElementById('idUpdate').value;
    const nameUpdate = document.getElementById('nameUpdate').value;
    const priceUpdate = document.getElementById('priceUpdate').value;
    const stockUpdate = document.getElementById('stockUpdate').value;

    
    const p=document.getElementById("warnings2");
    const s=document.getElementById("valid2");

    let warnings = ""
    let send=false
    p.innerHTML = ""
    
    if (!nameUpdate || !priceUpdate || !stockUpdate) {
        warnings += 'All fields are required.';
        send=true
    }else{
    
        if(nameUpdate.length < 3 || nameUpdate.length > 20){
            warnings+='The name must contain between 3 and 20 characters <br>';
            send=true
        }

        const priceRegex = /^(\d{1,3}(\.\d{3}))$/;

        if(!priceRegex.test(priceUpdate)){
            warnings+='Enter a valid price (With a point of a thousand) <br>';
            send=true
        }
    
        if (stockUpdate < 0) {
            warnings+='The stock must be greater than or equal to 0 <br>';
            send=true
        }
    
    
    }

    if(send){
        p.innerHTML =warnings
        return;
    }

    await fetch('/medicines/editMedicine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idUpdate,
            nameUpdate,
            priceUpdate,
            stockUpdate
        })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.error) {
            s.innerHTML = data.message;

            setTimeout(() => {
                s.innerHTML = ""; 
                p.innerHTML = ""; 
                updateMedicineModal.hide();
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




document.querySelector('#tableMedicines').addEventListener('click', async function (event) {
    if (event.target.closest('.btnDelete')) { 
        const deleteButton = event.target.closest('.btnDelete');
        const medicineId = deleteButton.getAttribute('data-id');

        if (confirm('Are you sure you want to delete this medicine?')) {
            try {
                const response = await fetch(`/medicines/deleteMedicine/${medicineId}`, {
                    method: 'DELETE'
                });

                const data = await response.json();
                if (!data.error) {
                    alert('Product deleted successfully');
                    location.reload();
                } else {
                    alert(data.error);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error deleting product. Please try again.');
            }
        }
    }
});