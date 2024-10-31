
function toggleModal() { 
    const h1 = document.getElementById('taskForm');
    const f1 = document.getElementById('taskFormContent');

    if (h1.classList.contains('hidden')) {
        h1.classList.remove('hidden'); 
    } else {
        h1.classList.add('hidden');    
        f1.reset();                     
    }
}

