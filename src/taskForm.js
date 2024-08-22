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

export { taskForm };