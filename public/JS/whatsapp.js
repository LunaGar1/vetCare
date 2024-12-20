window.onload = function() {
    var btn = document.createElement('a');
 
    var phoneNumber = '573508523401'; 
    var message = 'Hello, I want to communicate with the VetCare team.';
    
    var encodedMessage = encodeURIComponent(message);

    console.log('Mensaje codificado:', encodedMessage);
 
    btn.href = 'https://wa.me/' + phoneNumber + '?text=' + encodedMessage;
    btn.classList.add('whatsapp-btn');
    btn.target = '_blank';

    var icon = document.createElement('i');
    icon.classList.add('bi', 'bi-whatsapp');
    btn.appendChild(icon);

    btn.style.position = 'fixed';
    btn.style.bottom = '20px';
    btn.style.right = '20px';
    btn.style.backgroundColor = '#25D366';
    btn.style.borderRadius = '50%';
    btn.style.padding = '20px';  
    btn.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.3)';
    btn.style.color = 'white';
    btn.style.fontSize = '24px';
    btn.style.textAlign = 'center';
    btn.style.zIndex = '9999';
    btn.style.transition = 'background-color 0.3s';

    btn.onmouseover = function() {
        btn.style.backgroundColor = '#128C7E';
    };
    btn.onmouseout = function() {
        btn.style.backgroundColor = '#25D366';
    };

    document.body.appendChild(btn);
};
