class tasksManager {
    constructor() {
        this.tasks = [];
    }

    getTasks() {
        return this.tasks;
    }

    addTask(name, description, dueDate) {
        if (name && description && dueDate) {
            this.tasks.push({ name, description, dueDate });
            this.triggerUpdate();
        } else {
            alert('Please fill in all fields');
        }
    }

    editTask(index, name, description, dueDate) {
        if (name && description && dueDate) {
            this.tasks[index] = { name, description, dueDate };
            this.triggerUpdate();
        } else {
            alert('Please fill in all fields');
        }
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.triggerUpdate();
    }

    onTasksUpdated(callback) {
        this.updateCallback = callback;
    }

    triggerUpdate() {
        if (this.updateCallback) {
            this.updateCallback(this.tasks);
        }
    }
}

export const taskManager = new tasksManager();