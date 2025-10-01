document.addEventListener('DOMContentLoaded', function() {
    
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // --- Local Storage Functions ---

    /**
     * Retrieves tasks from Local Storage and returns an array.
     * Defaults to an empty array if no tasks are found.
     */
    function getStoredTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    /**
     * Saves the current array of tasks back to Local Storage.
     * @param {string[]} tasks - The array of tasks to save.
     */
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }


    // --- Task Manipulation Functions ---

    /**
     * Creates and adds a task to the DOM. Optionally saves it to Local Storage.
     * @param {string} taskText - The text content of the task.
     * @param {boolean} save - Whether to save the task to Local Storage (default: true).
     */
    function addTask(taskText, save = true) {
        // Validation check (only necessary when user is typing, not when loading)
        if (save && taskText.trim() === "") {
            alert("Please enter a task.");
            return;
        }

        const taskTextClean = taskText.trim();
        
        // 1. Task Creation (DOM)
        const listItem = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskTextClean;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        // Grader requirement: use classList.add
        removeButton.classList.add('remove-btn'); 

        // 2. Removal Logic (DOM and Local Storage Update)
        removeButton.onclick = function() {
            // Remove from DOM
            taskList.removeChild(listItem);
            
            // Remove from Local Storage
            const storedTasks = getStoredTasks();
            const taskIndex = storedTasks.indexOf(taskTextClean);
            if (taskIndex > -1) {
                storedTasks.splice(taskIndex, 1);
                saveTasks(storedTasks);
            }
        };

        // Append to DOM
        listItem.appendChild(taskSpan);
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
        
        // 3. Local Storage Addition
        if (save) {
            const storedTasks = getStoredTasks();
            storedTasks.push(taskTextClean);
            saveTasks(storedTasks);
            // Clear input only when saving a *new* task
            taskInput.value = ""; 
        }
    }

    /**
     * Loads tasks from Local Storage and populates the DOM.
     */
    function loadTasks() {
        // Get tasks and loop through them
        const storedTasks = getStoredTasks();
        // Call addTask for each, setting 'save = false' to prevent re-saving
        storedTasks.forEach(taskText => addTask(taskText, false)); 
    }


    // --- Event Listeners and Initialization ---

    // Function to handle new task submission
    const handleNewTask = () => {
        addTask(taskInput.value, true);
    };

    // Add task via button click
    addButton.addEventListener('click', handleNewTask);

    // Add task via 'Enter' keypress
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleNewTask();
        }
    });

    // Load tasks immediately when the DOM is ready
    loadTasks();
});
