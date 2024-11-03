const modalUsers = new bootstrap.Modal(document.getElementById('modalUsers'));

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => { // Asegúrate de que esto esté bien escrito
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
};


on(document, 'click' , '.btnUpdate', e =>{
    const row = e.target.closest('tr');
    IDupdate.value = row.children[0].innerHTML;
    namesUpdate.value = row.children[1].innerHTML;
    lastNamesUpdate.value = row.children[2].innerHTML;
    
    modalUsers.show()
});