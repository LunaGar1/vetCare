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

