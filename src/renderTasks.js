const renderTasks = (tasks, container, onAddTask) => {

    container.innerHTML = '';

    const title = document.createElement('h2');
    title.textContent = 'Tasks';
    container.appendChild(title);

    const addTaskButton = document.createElement('button');
    addTaskButton.textContent = 'Add Task';
    container.appendChild(addTaskButton);

    addTaskButton.addEventListener('click', () => {
        if(onAddTask) onAddTask(tasks, container);
    })

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

    container.addEventListener('tasksUpdated', () => renderTasks(tasks, container, onAddTask));
}

export { renderTasks };