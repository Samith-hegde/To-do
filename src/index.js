const container = document.getElementById('container');

const tasks = [];

const taskForm = () => {
    const task = document.createElement('div');
    const taskName = document.createElement('input');
    taskName.placeholder = 'Task Name';
    const taskDescription = document.createElement('input');
    taskDescription.placeholder = 'Task Description';
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.classList.add('submit-button');
    task.appendChild(taskName);
    task.appendChild(taskDescription);
    task.appendChild(submitButton);
    return task;
}

const addTask = () => {
    const task = taskForm();
    tasks.push(task);
    const submitButton = task.querySelector('.submit-button');
    submitButton.addEventListener('click', () => {
        renderTasks();
    })
    container.appendChild(task);
}

const renderTasks = () => {
    container.innerHTML = '';
    container.appendChild(title);
    container.appendChild(addTaskButton);
    tasks.forEach(task => {
        container.appendChild(task);
    });
}

const title = document.createElement('h2');
title.textContent = 'Tasks';

const addTaskButton = document.createElement('button');
addTaskButton.textContent = 'Add Task';

addTaskButton.addEventListener('click', () => {
    addTask();
})

container.appendChild(title);
container.appendChild(addTaskButton);