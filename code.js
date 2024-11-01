
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
        
    const taskItem = document.createElement('div');
    taskItem.className = "border border-gray-300 shadow-lg rounded-lg bg-white p-4 mb-4 transition-transform transform hover:scale-105 max-w-full break-words";

    
    switch (priority) {
        case 'P1':
            taskItem.classList.add('border-l-8', 'border-red-500');
            break;
        case 'P2':
            taskItem.classList.add('border-l-8', 'border-orange-500');
            break;
        case 'P3':
            taskItem.classList.add('border-l-8', 'border-green-500');
            break;
    }

    
    taskItem.innerHTML = `
        <h3 class="text-xl font-semibold text-teal-500 mb-2">Task: <span class="text-gray-800">${title}</span></h3>
        <!--<p class="text-gray-700 mb-2 break-words">
            <strong>Description:</strong> ${description}
        </p>-->
        <p class="text-gray-600 mb-1">
            <strong>Date:</strong> ${date}
        </p>
        <!--<p class="text-gray-600">
            <strong>Priorité:</strong> <span class="font-bold">${priority}</span>
        </p>-->
        <!--<div class="flex space-x-4">
                <button onclick="editTask()" class="text-sm text-blue-500">Edit</button>
                <button onclick="deleteTask()" class="text-sm text-red-500">Delete</button>
        </div>-->
    `;

    const column = document.getElementById(columnId);
    column.appendChild(taskItem);


    const countElement = document.getElementById(countId);
    let currentCount = parseInt(countElement.textContent.split(": ")[1]); 
    currentCount += 1; 
    countElement.textContent = `${countElement.textContent.split(": ")[0]}: ${currentCount}`; 
    

    
    toggleModal();
}

