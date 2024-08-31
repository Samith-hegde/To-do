import Task from './task.js';
import { loadProjects, saveProjects, loadTasks, saveTasks } from './storage.js';

class ProjectsManager {
    constructor() {
        if (loadProjects()) {
            this.projects = loadProjects();
        } else {
            this.projects = [{ name: 'All Tasks', taskIds: [] }];
        }
        this.activeProject = this.projects[0];
    }

    getProjects() {
        return this.projects;
    }

    setActiveProject(project) {
        this.activeProject = project;
        this.triggerUpdate();
    }

    addProject(name) {
        if (name) {
            this.projects.push({ name, taskIds: [] });
            this.triggerUpdate();
        } else {
            alert('Please fill in project name');
        }
    }

    onProjectsUpdated(callback) {
        this.updateCallback = callback;
    }

    triggerUpdate() {
        if (this.updateCallback) {
            this.updateCallback(this.projects);
        }
        saveProjects(this.projects);
    }
}

class TasksManager {
    constructor(projectManager) {
        this.projectManager = projectManager;
        if (loadTasks()) {
            this.tasks = loadTasks();
        } else {
            this.tasks = [];
        }
    }

    addTaskToProject(newTask) {
        this.projectManager.activeProject.taskIds.push(newTask.id);
        if(this.projectManager.activeProject.name !== 'All Tasks') {
            this.projectManager.projects[0].taskIds.push(newTask.id);
        }
    }

    addTask(name, description, dueDate) {
        if (name && description && dueDate) {
            const newTask = new Task(name, description, dueDate);
            this.tasks.push(newTask);
            this.addTaskToProject(newTask);
            this.triggerUpdate();
        } else {
            alert('Please fill in all fields');
        }
    }

    editTask(taskId, updatedName, updatedDescription, updatedDueDate) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.name = updatedName;
            task.description = updatedDescription;
            task.dueDate = updatedDueDate;
            this.triggerUpdate();
        }
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.projectManager.projects.forEach(project => {
            project.taskIds = project.taskIds.filter(id => id !== taskId);
        });
        this.triggerUpdate();
    }

    getTasksForProject(project) {
        return project.taskIds.map(taskId => this.tasks.find(task => task.id === taskId));
    }

    getAllTasks() {
        return this.tasks;
    }

    onTasksUpdated(callback) {
        this.updateCallback = callback;
    }

    triggerUpdate() {
        if (this.updateCallback) {
            this.updateCallback(this.projectManager.activeProject.taskIds.map(taskId => this.tasks.find(task => task.id === taskId)));
        }
        saveTasks(this.tasks);
    }
}

const projectManager = new ProjectsManager();
const taskManager = new TasksManager(projectManager);

export { projectManager, taskManager };