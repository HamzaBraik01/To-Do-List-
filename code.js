
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

document.getElementById('taskFormContent').addEventListener('submit', saveTask);

function saveTask(event) {
    event.preventDefault(); 

    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const status = document.getElementById('taskStatus').value; 
    const date = document.getElementById('taskDate').value;
    const priority = document.getElementById('taskPriority').value;

    const taskHtml = `
        <div class="border border-gray-300 shadow-lg rounded-lg bg-white p-4 mb-4 transition-transform transform hover:scale-105">
            <h3 class="text-xl font-semibold text-teal-500 mb-2">Task: <span class="text-gray-800">${title}</span></h3>
            <p class="text-gray-700 mb-2">
                <strong>Description:</strong> ${description}
            </p>
            <p class="text-gray-600 mb-1">
                <strong>Date:</strong> ${date}
            </p>
            <p class="text-gray-600">
                <strong>Priorité:</strong> <span class="font-bold text-orange-500">${priority}</span>
            </p>
        </div>
    `;

    let columnId;
    let countId;
    if (status === "todo") {
        columnId = "todoColumn";
        countId = "todoCount";
    } else if (status === "doing") {
        columnId = "doingColumn";
        countId = "doingCount";
    } else if (status === "done") {
        columnId = "doneColumn";
        countId = "doneCount";
    }

    
    const column = document.getElementById(columnId);
    column.innerHTML += taskHtml; 

    
    

    
    toggleModal();
}
