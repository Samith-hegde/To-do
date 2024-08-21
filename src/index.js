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
    const submitButton = task.querySelector('.submit-button');
    submitButton.addEventListener('click', () => {
        const taskName = task.querySelector('input[placeholder="Task Name"]').value;
        const taskDescription = task.querySelector('input[placeholder="Task Description"]').value;

        if (taskName && taskDescription) {
            tasks.push({ name: taskName, description: taskDescription });
            renderTasks();
        } else {
            alert('Please fill in all fields');
        }
    })
    container.appendChild(task);
}

const renderTasks = () => {
    container.innerHTML = '';
    container.appendChild(title);
    container.appendChild(addTaskButton);
    tasks.forEach((task) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        const taskName = document.createElement('h3');
        taskName.textContent = task.name;

        const taskDescription = document.createElement('p');
        taskDescription.textContent = task.description;

        taskDiv.appendChild(taskName);
        taskDiv.appendChild(taskDescription);
        container.appendChild(taskDiv);
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

renderTasks();