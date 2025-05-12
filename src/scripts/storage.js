const TASKS_KEY = 'task-manager-tasks';

export function saveTasks(tasks) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export function loadTasks() {
    const tasksJson = localStorage.getItem(TASKS_KEY);
    return tasksJson ? JSON.parse(tasksJson) : [];
}