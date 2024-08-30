import { projectManager, taskManager } from './taskManager.js';

const renderNavBar = (projects, navBar) => {
    navBar.innerHTML = '';

    const allTasksButton = document.createElement('button');
    allTasksButton.textContent = 'All Tasks';

    allTasksButton.addEventListener('click', () => {
        projectManager.setActiveProject(projectManager.projects[0]);
        renderTasks(projectManager.projects[0].tasks, document.getElementById('tasks-container'));
    });

    const projectsDiv = document.createElement('h3');
    projectsDiv.textContent = 'Projects';
    navBar.appendChild(projectsDiv);

    const newProject = document.createElement('div');

    const projectName = document.createElement('input');
    projectName.setAttribute('placeholder', 'Project Name');
    newProject.appendChild(projectName);

    const plusButton = document.createElement('button');    
    plusButton.textContent = '+';
    newProject.appendChild(plusButton);

    newProject.style.display = 'none';
    projectsDiv.appendChild(newProject);

    const addProjectButton = document.createElement('button');
    addProjectButton.textContent = 'Add Project';
    projectsDiv.appendChild(addProjectButton);

    addProjectButton.addEventListener('click', () => {
        newProject.style.display = 'block';
    });

    plusButton.addEventListener('click', () => {
        newProject.style.display = 'none';
        projectManager.addProject(projectName.value);
    });

    projects.forEach((project) => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');

        const projectName = document.createElement('button');
        projectName.textContent = project.name;
        projectDiv.appendChild(projectName);

        projectsDiv.appendChild(projectDiv);

        projectName.addEventListener('click', () => {
            projectManager.setActiveProject(project);
            renderTasks(project.tasks, document.getElementById('tasks-container'));
        });
    });
}

const identifyIndices = (task) => {
    let localIndex;
    let globalIndex;
    let relevantTask;
    if (taskManager.projectManager.activeProject.name === 'All Tasks') {
        globalIndex = taskManager.projectManager.projects[0].tasks.indexOf(task);
        for (let i=1; i<taskManager.projectManager.projects.length; i++) {
            relevantTask = taskManager.projectManager.projects[i].tasks.find((t) => t.name === task.name)
            if (relevantTask) {
                const relevantProject = taskManager.projectManager.projects[i];
                localIndex = relevantProject.tasks.indexOf(relevantTask);
                taskManager.projectManager.setActiveProject(relevantProject);
                break;
            }
        }
    } else {
        localIndex = taskManager.projectManager.activeProject.tasks.indexOf(task); 
        relevantTask = taskManager.projectManager.projects[0].tasks.find((t) => t.name === task.name);
        globalIndex = taskManager.projectManager.projects[0].tasks.indexOf(relevantTask);    
    }         
    return { localIndex, globalIndex };
}

const renderTasks = (tasks, container) => {
    container.innerHTML = '';

    const title = document.createElement('h2');
    const text = projectManager.activeProject.name;
    title.textContent = text;
    container.appendChild(title);

    const addTaskButton = document.createElement('button');
    addTaskButton.textContent = 'Add Task';
    container.appendChild(addTaskButton);

    tasks.forEach((task) => {
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
            const { localIndex, globalIndex } = identifyIndices(task);
            renderEditTaskForm(localIndex, globalIndex, container, task);
        });

        deleteButton.addEventListener('click', () => {
            const { localIndex, globalIndex } = identifyIndices(task);
            taskManager.deleteTask(localIndex, globalIndex);
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
        renderTasks(taskManager.getTasks(), document.getElementById('tasks-container'));
    });
}

const renderEditTaskForm = (localIndex, globalIndex, container, task) => {
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
        taskManager.editTask( localIndex, globalIndex, nameInput.value, descriptionInput.value, dueDateInput.value );
        form.reset();
        renderTasks(taskManager.getTasks(), document.getElementById('tasks-container'));
    });
}

export { renderNavBar, renderTasks };