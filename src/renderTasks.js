import { taskManager } from './taskManager.js';

const renderTasks = (tasks, container) => {
    container.innerHTML = '';

    const title = document.createElement('h2');
    title.textContent = 'Tasks';
    container.appendChild(title);

    const addTaskButton = document.createElement('button');
    addTaskButton.textContent = 'Add Task';
    container.appendChild(addTaskButton);

    tasks.forEach((task) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        taskDiv.appendChild(checkbox);

        const taskName = document.createElement('h3');
        taskName.textContent = task.name;
        taskDiv.appendChild(taskName);

        const taskDescription = document.createElement('p');
        taskDescription.textContent = task.description;
        taskDiv.appendChild(taskDescription);

        const dueDate = document.createElement('p');
        dueDate.textContent = task.dueDate;
        taskDiv.appendChild(dueDate);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        taskDiv.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        taskDiv.appendChild(deleteButton);   
        
        container.appendChild(taskDiv);

        checkbox.addEventListener('change', () => {
            taskDiv.classList.toggle('done');
        });

        editButton.addEventListener('click', () => {
            renderEditTaskForm(container, task);
        });

        deleteButton.addEventListener('click', () => {
            const index = taskManager.getTasks().indexOf(task);
            taskManager.deleteTask(index);
        });
    });

    addTaskButton.addEventListener('click', () => {
        renderAddTaskForm(container);
    })
}

const renderAddTaskForm = (container) => {
    const form = document.createElement('form');

    const nameInput = document.createElement('input');
    nameInput.setAttribute('placeholder', 'Task Name');
    form.appendChild(nameInput);

    const descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('placeholder', 'Task Description');
    form.appendChild(descriptionInput);

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    form.appendChild(dueDateInput);

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Add Task';
    form.appendChild(submitButton);

    container.appendChild(form);

    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        taskManager.addTask(nameInput.value, descriptionInput.value, dueDateInput.value);
        form.reset();
    });
}

const renderEditTaskForm = (container, task) => {
    const form = document.createElement('form');

    const nameInput = document.createElement('input');
    nameInput.setAttribute('placeholder', 'Task Name');
    nameInput.value = task.name;
    form.appendChild(nameInput);

    const descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('placeholder', 'Task Description');
    descriptionInput.value = task.description;
    form.appendChild(descriptionInput);

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.value = task.dueDate;
    form.appendChild(dueDateInput);

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Edit Task';
    form.appendChild(submitButton);

    container.appendChild(form);

    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        const index = taskManager.getTasks().indexOf(task);
        taskManager.editTask(index, nameInput.value, descriptionInput.value, dueDateInput.value);
        form.reset();
    });
}

export { renderTasks };