let currentTask = null;

function toggleModal(action, task = null) {
    const formContainer = document.getElementById('taskForm');
    const formTitle = document.getElementById('formTitle');
    const formContent = document.getElementById('taskFormContent');

    if (action === 'edit') {
        currentTask = task;
        formTitle.textContent = "Edit Task";

        document.getElementById('taskTitle').value = task.querySelector('.task-title span').textContent;
        document.getElementById('taskDescription').value = task.querySelector('.task-description span').textContent;
        document.getElementById('taskStatus').value = task.dataset.status;
        document.getElementById('taskStartDate').value = task.querySelector('.task-start-date').textContent.replace("Start Date: ", "").trim();
        document.getElementById('taskDueDate').value = task.querySelector('.task-due-date').textContent.replace("Due Date: ", "").trim();
        document.getElementById('taskPriority').value = task.dataset.priority;

    } else if (action === 'new') {
        currentTask = null;
        formTitle.textContent = "New Task";
        formContent.reset();
    }

    formContainer.classList.toggle('hidden');
}

document.getElementById('taskFormContent').addEventListener('submit', saveTask);

function saveTask(event) {
    event.preventDefault();

    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const status = document.getElementById('taskStatus').value;
    const startDate = document.getElementById('taskStartDate').value;
    const dueDate = document.getElementById('taskDueDate').value;
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

    if (currentTask) {
        const previousStatus = currentTask.dataset.status; 
        currentTask.remove(); 
        updateCount(getCountId(previousStatus), -1); 
    }

    const taskItem = document.createElement('div');
    taskItem.className = "border border-gray-300 shadow-lg rounded-lg bg-white p-4 mb-4 transition-transform transform hover:scale-105 max-w-full break-words";
    taskItem.dataset.status = status;
    taskItem.dataset.priority = priority;

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
        <h3 class="text-xl font-semibold text-teal-500 mb-2 task-title">Task: <span class="text-gray-800">${title}</span></h3>
        <p class="hidden text-gray-700 mb-2 task-description">
            <strong>Description:</strong> <span>${description}</span>
        </p>
        <p class="text-gray-600 mb-2 task-start-date">
            <strong>Start Date:</strong> ${startDate}
        </p>
        <p class="text-gray-600 mb-2 task-due-date">
            <strong>Due Date:</strong> ${dueDate}
        </p>
        <div class="flex justify-end">
            <button onclick="toggleModal('edit', this.parentElement.parentElement)" class="mr-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Edit</button>
            <button onclick="deleteTask(this.parentElement.parentElement)" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Delete</button>
        </div>
    `;

    document.getElementById(columnId).appendChild(taskItem);
    updateCount(countId, 1);
    toggleModal('cancel');
}

function deleteTask(task) {
    const status = task.dataset.status;
    updateCount(getCountId(status), -1);
    task.remove();
}

function updateCount(countId, delta) {
    const countElem = document.getElementById(countId);
    countElem.textContent = countElem.textContent.split(":")[0] + ": " + (parseInt(countElem.textContent.split(": ")[1]) + delta);
}

function getCountId(status) {
    switch (status) {
        case "todo":
            return "todoCount";
        case "doing":
            return "doingCount";
        case "done":
            return "doneCount";
        default:
            return null;
    }
}
