document.addEventListener('DOMContentLoaded', function() {
    
    fetch('/user/getVets')
        .then(response => response.json())
        .then(data => {
            const vetSelect = document.getElementById('vets');
            data.forEach(vet => {
                const option = document.createElement('option');
                option.value = vet._id;
                option.textContent = vet.name; // Assuming 'name' is a field in your User model
                vetSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching veterinarians:', error));

    fetch('/pet/showPets')
        .then(response => response.json())
        .then(data => {
            const petSelect = document.getElementById('pet');
            data.forEach(pet => {
                const option = document.createElement('option');
                option.value = pet._id;
                option.textContent = pet.name;
                petSelect.appendChild(option);
            });
        });
});


   