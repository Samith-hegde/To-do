const saveProjects = (projects) => {
    localStorage.setItem('projects', JSON.stringify(projects));
}

const loadProjects = () => {
    const savedProjects = JSON.parse(localStorage.getItem('projects'));
    if (savedProjects) {
        const projects = savedProjects;
        return projects;
    }
}

const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const loadTasks = () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        const tasks = savedTasks;
        return tasks;
    }
}

export { saveProjects, loadProjects, saveTasks, loadTasks };