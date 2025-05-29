export function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Hent alle opgaver fra localStorage
export function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Gem alle opgaver til localStorage
export function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Tilføj en ny opgave
export function addTask(text, completed = false) {
    const tasks = getTasks();
    const newTask = {
        id: generateGUID(),
        text,
        completed
    };
    tasks.push(newTask);
    saveTasks(tasks);
    return newTask;
}

// Opdatér/redigér en opgave
export function updateTask(id, updates) {
    const tasks = getTasks();
    const idx = tasks.findIndex(task => task.id === id);
    if (idx !== -1) {
        tasks[idx] = { ...tasks[idx], ...updates };
        saveTasks(tasks);
        return tasks[idx];
    }
    return null;
}

// Slet en opgave
export function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
}