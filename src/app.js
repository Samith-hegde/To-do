import { renderTasks } from './renderTasks';
import { addTask } from './addTask';

const initApp = () => {
    const container = document.getElementById('container');
    const tasks = [];

    const title = document.createElement('h2');
    title.textContent = 'Tasks';

    const addTaskButton = document.createElement('button');
    addTaskButton.textContent = 'Add Task';

    addTaskButton.addEventListener('click', () => {
        addTask(tasks, container);
    })

    container.appendChild(title);
    container.appendChild(addTaskButton);

    renderTasks(tasks, container, addTask);
}

export { initApp };




