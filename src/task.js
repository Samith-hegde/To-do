class Task {
    constructor(name, description, dueDate) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.id = Date.now();
    }
}

export default Task;