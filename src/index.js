import { renderNavBar, renderTasks } from './renderTasks';
import { projectManager, taskManager } from './taskManager';
import './styles/styles.css';

const container = document.getElementById('tasks-container');
const navBar = document.querySelector('.nav-bar');

renderNavBar(projectManager.getProjects(), navBar);
renderTasks(taskManager.getTasks(), container);

projectManager.onProjectsUpdated((updatedProjects) => {
    renderNavBar(updatedProjects, navBar);
})

taskManager.onTasksUpdated((updatedTasks) => {
    renderTasks(updatedTasks, container);
})