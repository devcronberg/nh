import { getTasks, addTask, updateTask, deleteTask } from './db.js';

const tasksContainer = document.getElementById("tasks-container");

// Hent opgaver fra localStorage
let tasks = getTasks();

// Ryd containeren først (hvis der er noget)
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


// Udskift prompt med Bootstrap modal til tilføj opgave
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

document.addEventListener('DOMContentLoaded', () => {
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

    const addButton = document.querySelector('.knaptilføj');
    if (addButton) {
        addButton.addEventListener('click', (e) => {
            e.preventDefault();
            showAddTaskModal();
        });
    }
});


// Udskift prompt med Bootstrap modal til sletning af opgave
let taskIdToDelete = null;

export function showDeleteTaskModal(taskId) {
    taskIdToDelete = taskId;
    const modal = new bootstrap.Modal(document.getElementById('deleteTaskModal'));
    modal.show();
}

/**
 * Opretter et DOM-element for en opgave baseret på task-objektet.
 * Returnerer et <div> element med samme struktur som de eksisterende opgaver.
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