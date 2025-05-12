import { saveTasks, loadTasks } from './storage.js';

export function initTasksPage() {
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskDialog = document.getElementById('task-dialog');
    const taskForm = document.getElementById('task-form');
    const cancelBtn = document.getElementById('cancel-btn');
    const todoTasks = document.getElementById('todo-tasks');
    const inProgressTasks = document.getElementById('in-progress-tasks');
    const doneTasks = document.getElementById('done-tasks');
    
    let tasks = loadTasks();
    
    // Открытие диалогового окна
    addTaskBtn.addEventListener('click', () => {
        taskDialog.showModal();
    });
    
    // Закрытие диалогового окна
    cancelBtn.addEventListener('click', () => {
        taskDialog.close();
        taskForm.reset();
    });
    
    // Клик вне диалогового окна
    taskDialog.addEventListener('click', (e) => {
        const dialogDimensions = taskDialog.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            taskDialog.close();
            taskForm.reset();
        }
    });
    
    // Добавление новой задачи
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = document.getElementById('task-text').value;
        
        if (taskText.trim()) {
            const newTask = {
                id: Date.now(),
                text: taskText,
                status: 'todo',
                createdAt: new Date().toISOString()
            };
            
            tasks.push(newTask);
            saveTasks(tasks);
            renderTasks();
            
            taskDialog.close();
            taskForm.reset();
        }
    });
    
    // Рендеринг задач
    function renderTasks() {
        todoTasks.innerHTML = '';
        inProgressTasks.innerHTML = '';
        doneTasks.innerHTML = '';
        
        tasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = `task-card ${task.status}`;
            taskCard.dataset.id = task.id;
            
            const taskText = document.createElement('p');
            taskText.className = 'task-text';
            taskText.textContent = task.text;
            
            const taskActions = document.createElement('div');
            taskActions.className = 'task-actions';
            
            const statusCheckbox = document.createElement('input');
            statusCheckbox.type = 'checkbox';
            statusCheckbox.className = 'status-checkbox';
            statusCheckbox.checked = task.status === 'done';
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Удалить';
            
            taskActions.appendChild(statusCheckbox);
            taskActions.appendChild(deleteBtn);
            
            taskCard.appendChild(taskText);
            taskCard.appendChild(taskActions);
            
            // Обработчики событий
            statusCheckbox.addEventListener('change', () => {
                updateTaskStatus(task.id);
            });
            
            deleteBtn.addEventListener('click', () => {
                deleteTask(task.id);
            });
            
            // Размещение задачи в соответствующей колонке
            if (task.status === 'todo') {
                todoTasks.appendChild(taskCard);
            } else if (task.status === 'in-progress') {
                inProgressTasks.appendChild(taskCard);
            } else {
                doneTasks.appendChild(taskCard);
            }
        });
    }
    
    // Обновление статуса задачи
    function updateTaskStatus(taskId) {
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                if (task.status === 'todo') {
                    task.status = 'in-progress';
                } else if (task.status === 'in-progress') {
                    task.status = 'done';
                } else {
                    task.status = 'todo';
                }
            }
            return task;
        });
        
        saveTasks(tasks);
        renderTasks();
    }
    
    // Удаление задачи
    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks(tasks);
        renderTasks();
    }
    
    // Первоначальный рендеринг
    renderTasks();
}