/**
 * Database modul - Remember App
 * 
 * Håndterer alle data operationer via localStorage.
 * Opgaver gemmes som JSON array i browserens localStorage.
 */

/**
 * Genererer en unik GUID til opgaver
 * @returns {string} Unik identifier
 */
export function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Henter alle opgaver fra localStorage
 * @returns {Array} Array af opgave objekter, eller tom array hvis ingen data
 */
export function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

/**
 * Gemmer opgaver til localStorage
 * @param {Array} tasks - Array af opgave objekter
 */
export function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Tilføjer en ny opgave til listen
 * @param {string} text - Opgavens tekst
 * @param {boolean} completed - Om opgaven er færdig (default: false)
 * @returns {Object} Det nye opgave objekt
 */
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

/**
 * Opdaterer en eksisterende opgave
 * @param {string} id - Opgavens ID
 * @param {Object} updates - Objekt med felter der skal opdateres
 * @returns {Object|null} Opdateret opgave eller null hvis ikke fundet
 */
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

/**
 * Sletter en opgave baseret på ID
 * @param {string} id - ID på opgaven der skal slettes
 */
export function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
}