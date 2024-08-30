class projectsManager {
    constructor() {
        this.projects = [{ name: 'All Tasks', tasks: [] }];
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
            this.projects.push({ name, tasks: [] });
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
    }
}

class tasksManager {
    constructor(projectManager) {
        this.projectManager = projectManager;
    }

    getTasks() {
        return this.projectManager.activeProject.tasks;
    }

    addTask(name, description, dueDate) {
        if (name && description && dueDate) {
            this.projectManager.activeProject.tasks.push({ name, description, dueDate });
            if (this.projectManager.activeProject.name !== 'All Tasks') {
                this.projectManager.projects[0].tasks.push({ name, description, dueDate });
            }
            this.triggerUpdate();
        } else {
            alert('Please fill in all fields');
        }
    }

    editTask(localIndex, globalIndex, name, description, dueDate) {
        if (name && description && dueDate) {
            if (localIndex !== undefined) {
                this.projectManager.activeProject.tasks[localIndex] = { name, description, dueDate };
            }
            this.projectManager.projects[0].tasks[globalIndex] = { name, description, dueDate };
            this.triggerUpdate();
        } else {
            alert('Please fill in all fields');
        }
    }

    deleteTask(localIndex, globalIndex) {
        if (localIndex !== undefined) {
            this.projectManager.activeProject.tasks.splice(localIndex, 1);
        }
        this.projectManager.projects[0].tasks.splice(globalIndex, 1);
        this.triggerUpdate();
    }

    /*toggleTaskDone(index) {
        this.projectManager.activeProject.tasks[index].done = !this.projectManager.activeProject.tasks[index].done;
        if (this.projectManager.activeProject.name !== 'All Tasks') {
            this.projectManager.projects[0].tasks[index].done = !this.projectManager.projects[0].tasks[index].done;
        }
        this.triggerUpdate();
    }*/

    onTasksUpdated(callback) {
        this.updateCallback = callback;
    }

    triggerUpdate() {
        if (this.updateCallback) {
            this.updateCallback(this.projectManager.activeProject.tasks);
            this.updateCallback(this.projectManager.projects[0].tasks);
        }
    }
}

const projectManager = new projectsManager();
const taskManager = new tasksManager(projectManager);

export { projectManager, taskManager };