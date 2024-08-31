import { renderNavBar, renderTasks } from './renderTasks';
import { projectManager, taskManager } from './taskManager';
import './styles/styles.css';

const container = document.getElementById('tasks-container');
const navBar = document.querySelector('.nav-bar');

renderTasks(container);
renderNavBar(projectManager.getProjects(), navBar);

projectManager.onProjectsUpdated((updatedProjects) => {
    renderNavBar(updatedProjects, navBar);
})

taskManager.onTasksUpdated(() => {
    renderTasks(container);
})