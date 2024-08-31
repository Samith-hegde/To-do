import { projectManager, taskManager } from './taskManager.js';

const renderNavBar = (projects, navBar) => {
    navBar.innerHTML = '';

    const allTasksButton = document.createElement('button');
    allTasksButton.textContent = 'All Tasks';
    allTasksButton.classList.add('all-tasks-button');
    navBar.appendChild(allTasksButton);

    allTasksButton.addEventListener('click', () => {
        projectManager.setActiveProject(projectManager.projects[0]);
        renderTasks(document.getElementById('tasks-container'));
    });

    const projectsDiv = document.createElement('div');
    projectsDiv.classList.add('projects');
    navBar.appendChild(projectsDiv);

    const title = document.createElement('h3');
    title.textContent = 'Projects';
    projectsDiv.appendChild(title);

    projects.forEach((project) => {
        if (project.name !== 'All Tasks') {
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('project');
    
            const projectName = document.createElement('button');
            projectName.textContent = project.name;
            projectDiv.appendChild(projectName);
    
            projectsDiv.appendChild(projectDiv);
    
            projectName.addEventListener('click', () => {
                projectManager.setActiveProject(project);
                renderTasks(document.getElementById('tasks-container'));
            });    
        }
    });

    const newProject = document.createElement('div');

    const projectName = document.createElement('input');
    projectName.setAttribute('placeholder', 'Project Name');
    newProject.appendChild(projectName);

    const plusButton = document.createElement('button');    
    plusButton.textContent = '+';
    newProject.appendChild(plusButton);

    newProject.style.display = 'none';
    projectsDiv.appendChild(newProject);

    plusButton.addEventListener('click', () => {
        newProject.style.display = 'none';
        projectManager.addProject(projectName.value);
    });

    const addProjectButton = document.createElement('button');
    addProjectButton.textContent = 'Add Project';
    addProjectButton.classList.add('add-project-button');
    projectsDiv.appendChild(addProjectButton);

    addProjectButton.addEventListener('click', () => {
        newProject.style.display = 'block';
        addProjectButton.style.display = 'none';
    });
}

const renderTasks = (container) => {
    container.innerHTML = '';

    const title = document.createElement('h2');
    const text = projectManager.activeProject.name;
    title.textContent = text;
    container.appendChild(title);

    const addTaskButton = document.createElement('button');
    addTaskButton.classList.add('add-tasks-button');
    addTaskButton.textContent = 'Add Task';
    container.appendChild(addTaskButton);

    const relevantTasks = projectManager.activeProject.name === 'All Tasks' ?
    taskManager.getAllTasks() : taskManager.getTasksForProject(projectManager.activeProject);

    relevantTasks.forEach((task) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        taskDiv.appendChild(checkbox);

        const taskName = document.createElement('h3');
        taskName.textContent = task.name;
        taskDiv.appendChild(taskName);

        const taskDescription = document.createElement('p');
        taskDescription.textContent = task.description;
        taskDiv.appendChild(taskDescription);

        const dueDate = document.createElement('p');
        dueDate.textContent = task.dueDate;
        taskDiv.appendChild(dueDate);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        taskDiv.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        taskDiv.appendChild(deleteButton);   
        
        container.appendChild(taskDiv);

        editButton.addEventListener('click', () => {
            renderEditTaskForm(container, task);
        });

        deleteButton.addEventListener('click', () => {
            taskManager.deleteTask(task.id);
        });
    });

    addTaskButton.addEventListener('click', () => {
        renderAddTaskForm(container);
    })
}

const renderAddTaskForm = (container) => {
    const form = document.createElement('form');

    const nameInput = document.createElement('input');
    nameInput.setAttribute('placeholder', 'Task Name');
    form.appendChild(nameInput);

    const descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('placeholder', 'Task Description');
    form.appendChild(descriptionInput);

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    form.appendChild(dueDateInput);

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Add Task';
    form.appendChild(submitButton);

    container.appendChild(form);

    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        taskManager.addTask(nameInput.value, descriptionInput.value, dueDateInput.value);
        form.reset();
        renderTasks(document.getElementById('tasks-container'));
    });
}

const renderEditTaskForm = (container, task) => {
    const form = document.createElement('form');

    const nameInput = document.createElement('input');
    nameInput.setAttribute('placeholder', 'Task Name');
    nameInput.value = task.name;
    form.appendChild(nameInput);

    const descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('placeholder', 'Task Description');
    descriptionInput.value = task.description;
    form.appendChild(descriptionInput);

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.value = task.dueDate;
    form.appendChild(dueDateInput);

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Edit Task';
    form.appendChild(submitButton);

    container.appendChild(form);

    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        taskManager.editTask( task.id, nameInput.value, descriptionInput.value, dueDateInput.value );
        form.reset();
        renderTasks(document.getElementById('tasks-container'));
    });
}

export { renderNavBar, renderTasks };