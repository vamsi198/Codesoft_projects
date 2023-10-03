// Get elements from the DOM
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add a task
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const task = createTaskElement(taskText);
        taskList.appendChild(task);
        saveTask(taskText);
        taskInput.value = '';
    }
});

// Create a task element
function createTaskElement(text) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${text}</span>
        <button class="delete-button">Delete</button>
    `;
    const deleteButton = li.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        li.remove();
        removeTask(text);
    });
    return li;
}

// Save a task to local storage
function saveTask(taskText) {
    const tasks = getTasks();
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove a task from local storage
function removeTask(taskText) {
    const tasks = getTasks();
    const index = tasks.indexOf(taskText);
    if (index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Load tasks from local storage
function loadTasks() {
    const tasks = getTasks();
    tasks.forEach((task) => {
        const taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
    });
}

// Get tasks from local storage
function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}
