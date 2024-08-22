import { renderTasks } from './renderTasks';
import { addTask } from './addTask';

const initApp = () => {
    const container = document.getElementById('container');
    const tasks = [];

    renderTasks(tasks, container, addTask);
}

initApp();