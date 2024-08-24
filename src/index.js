import { renderTasks } from './renderTasks';
import { taskManager } from './taskManager';
import './styles/styles.css';

const container = document.getElementById('tasks-container');

renderTasks(taskManager.getTasks(), container);

taskManager.onTasksUpdated((updatedTasks) => {
    renderTasks(updatedTasks, container);
})