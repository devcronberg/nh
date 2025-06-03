/**
 * UI modul - Remember App
 * 
 * Håndterer brugergrænsefladen og interaktioner.
 * Opretter DOM elementer, håndterer modals og events.
 */

import { getTasks, addTask, updateTask, deleteTask } from './db.js';

const tasksContainer = document.getElementById("tasks-container");

// Initialiser applikationen ved at vise eksisterende opgaver
let tasks = getTasks();
tasksContainer.innerHTML = "";

// Generér DOM-elementer for hver opgave og tilføj til containeren
tasks.forEach(task => {
    const taskElement = createTaskElement(task);
    tasksContainer.appendChild(taskElement);

    // Tilføj long press listener til sletning
    addLongPressListener(taskElement, () => {
        showDeleteTaskModal(task.id);
    });
});

/**
 * Viser modal til tilføjelse af ny opgave
 */
function showAddTaskModal() {
    const input = document.getElementById('addTaskInput');
    if (input) input.value = '';
    const modalEl = document.getElementById('addTaskModal');
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
    modalEl.addEventListener('shown.bs.modal', function handler() {
        if (input) input.focus();
        modalEl.removeEventListener('shown.bs.modal', handler);
    });
}

/**
 * Event listeners for knapper og modals
 */
document.addEventListener('DOMContentLoaded', () => {
    // Bekræft sletning af opgave
    const confirmBtn = document.getElementById('confirmDeleteTaskBtn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            if (taskIdToDelete) {
                deleteTask(taskIdToDelete);
                taskIdToDelete = null;
                const modal = bootstrap.Modal.getInstance(document.getElementById('deleteTaskModal'));
                modal.hide();
                location.reload();
            }
        });
    }

    // Bekræft tilføjelse af opgave
    const addBtn = document.getElementById('confirmAddTaskBtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const input = document.getElementById('addTaskInput');
            if (input && input.value.trim() !== '') {
                addTask(input.value.trim(), false);
                const modal = bootstrap.Modal.getInstance(document.getElementById('addTaskModal'));
                modal.hide();
                location.reload();
            } else {
                input.classList.add('is-invalid');
            }
        });
    }

    // Åbn tilføj opgave modal
    const addButton = document.querySelector('.knaptilføj');
    if (addButton) {
        addButton.addEventListener('click', (e) => {
            e.preventDefault();
            showAddTaskModal();
        });
    }
});

// Global variabel til at holde styr på hvilken opgave der skal slettes
let taskIdToDelete = null;

/**
 * Viser bekræftelsesdialog for sletning af opgave
 * @param {string} taskId - ID på opgaven der skal slettes
 */
export function showDeleteTaskModal(taskId) {
    taskIdToDelete = taskId;
    const modal = new bootstrap.Modal(document.getElementById('deleteTaskModal'));
    modal.show();
}

/**
 * Opretter et komplet DOM element for en opgave
 * @param {Object} task - Opgave objekt med id, text og completed
 * @returns {HTMLElement} Færdigt DOM element til at indsætte i siden
 */
export function createTaskElement(task) {
    // Opret container-div
    const container = document.createElement("div");
    container.className = `nanna-5 ${task.completed ? "nanna-aktiv" : "nanna-inaktiv"} d-flex justify-content-between align-items-center px-3 py-2`;
    container.id = `task-${task.id}`;

    // Opgave-tekst
    const span = document.createElement("span");
    span.className = "nanna-tekst";
    span.textContent = task.text;

    // Toggle-switch
    const label = document.createElement("label");
    label.className = "nanna-toggle-switch";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = !!task.completed;
    input.addEventListener("change", function () {
        // Opdater visuel stil og gem til localStorage
        if (input.checked) {
            container.classList.remove("nanna-inaktiv");
            container.classList.add("nanna-aktiv");
        } else {
            container.classList.remove("nanna-aktiv");
            container.classList.add("nanna-inaktiv");
        }
        updateTask(task.id, { completed: input.checked });
    });

    const slider = document.createElement("span");
    slider.className = "nanna-slider";

    label.appendChild(input);
    label.appendChild(slider);

    container.appendChild(span);
    container.appendChild(label);

    return container;
}

/**
 * Tilføjer long-press funktionalitet til et element (til mobile og desktop)
 * @param {HTMLElement} element - Element der skal have long-press
 * @param {Function} callback - Funktion der kaldes ved long-press
 * @param {number} duration - Tid i ms før long-press udløses (default: 500)
 */
export function addLongPressListener(element, callback, duration = 500) {
    let timer = null;

    element.addEventListener('mousedown', start);
    element.addEventListener('touchstart', start);

    element.addEventListener('mouseup', cancel);
    element.addEventListener('mouseleave', cancel);
    element.addEventListener('touchend', cancel);
    element.addEventListener('touchcancel', cancel);

    function start(e) {
        timer = setTimeout(() => {
            callback(e);
        }, duration);
    }

    function cancel() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }
}