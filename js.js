document.addEventListener("DOMContentLoaded", function () {
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
            if (confirm("Vil du slette denne opgave?")) {
                deleteTask(task.id);
                location.reload();
            }
        });
    });

    // Tilføj click event til plus-knappen for at tilføje opgave
    const addButton = document.querySelector(".knaptilføj");
    if (addButton) {
        addButton.addEventListener("click", () => {
            const newTaskText = prompt("Indtast ny opgave:");
            if (newTaskText && newTaskText.trim() !== "") {
                addTask(newTaskText.trim(), false);
                location.reload();
            }
        });
    }


    document.querySelector('.dropdown-toggle').onclick = function (e) {
        e.stopPropagation();
        document.querySelector('.dropdown').classList.toggle('open');
    };

    // --- Opgave-håndtering i localStorage ---

    // Generér et GUID (universelt unikt id)
    function generateGUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Hent alle opgaver fra localStorage
    function getTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    // Gem alle opgaver til localStorage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Tilføj en ny opgave
    function addTask(text, completed = false) {
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
    function updateTask(id, updates) {
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
    function deleteTask(id) {
        let tasks = getTasks();
        tasks = tasks.filter(task => task.id !== id);
        saveTasks(tasks);
    }


    /**
     * Opretter et DOM-element for en opgave baseret på task-objektet.
     * Returnerer et <div> element med samme struktur som de eksisterende opgaver.
     */
    function createTaskElement(task) {
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

    function addLongPressListener(element, callback, duration = 500) {
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

    async function loadTemplate() {
        try {
            const template = document.getElementById('omremember-template');
            const container = document.getElementById('tasks-container');
            if (template && container) {
                container.innerHTML = '';
                container.appendChild(template.content.cloneNode(true));
            } else {
                console.error('Template or container not found');
            }
        } catch (error) {
            console.error('Error loading template:', error);
        }
    }

    const menuLinks = document.querySelectorAll('.dropdown-menu a');
    const footerButton = document.querySelector('.knaptilføj');
    const plusIconSrc = 'plus-svgrepo-com.svg';

    menuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const href = event.target.getAttribute('href');
            if (href === 'omremember.html') {
                loadTemplate();
                if (footerButton) {
                    footerButton.style.display = 'none';
                }
                const returnLink = document.getElementById('return-to-tasks');
                if (returnLink) {
                    returnLink.style.display = 'inline';
                    returnLink.addEventListener('click', (e) => {
                        e.preventDefault();
                        location.reload();
                        if (footerButton) {
                            footerButton.style.display = 'inline-block';
                        }
                    });
                }
            } else if (href === 'index.html') {
                location.reload();
                if (footerButton) {
                    footerButton.style.display = 'inline-block';
                }
                const returnLink = document.getElementById('return-to-tasks');
                if (returnLink) {
                    returnLink.style.display = 'none';
                }
            }
        });
    });

    // Kald funktionen for at swappe indholdet ind i main container
    // loadTemplate();

});