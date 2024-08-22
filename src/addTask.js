import { taskForm } from './taskForm.js';

const addTask = (tasks, container) => {
    const task = taskForm();
    const submitButton = task.querySelector('.submit-button');

    container.appendChild(task);

    submitButton.addEventListener('click', () => {
        const taskName = task.querySelector('input[placeholder="Task Name"]').value;
        const taskDescription = task.querySelector('input[placeholder="Task Description"]').value;

        if (taskName && taskDescription) {
            tasks.push({ name: taskName, description: taskDescription });
            container.dispatchEvent(new CustomEvent('tasksUpdated'));
        } else {
            alert('Please fill in all fields');
        }
    })

}

export { addTask };