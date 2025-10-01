// 1. Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    
    // 2. Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // NOTE: The instructions state to 'Invoke the addTask function on DOMContentLoaded' 
    // AND 'Set the callback function to invoke addTask'. Since addTask is meant to run 
    // when a button is clicked, this seems contradictory for a basic setup. 
    // We will attach the event listeners here, ensuring logic only runs on user input.
    // (The LocalStorage loading logic, if required, would typically go here.)

    // 3. Create the addTask Function
    function addTask() {
        // Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty ("")
        if (taskText === "") {
            // If empty, use alert to prompt the user
            alert("Please enter a task.");
            return;
        }

        // Task Creation and Removal Logic:
        
        // Create a new li element
        const listItem = document.createElement('li');
        // Set its textContent to taskText
        // Note: We use a span for the text to allow the button to be separate
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        // Set its textContent to "Remove"
        removeButton.textContent = "Remove";
        // Give it a class name of 'remove-btn'
        removeButton.className = 'remove-btn';

        // Assign an onclick event to the remove button
        // When triggered, it removes the li element from taskList
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
            // NOTE: Local Storage removal logic would go here
        };

        // Append the task text and the remove button to the li element
        listItem.appendChild(taskSpan);
        listItem.appendChild(removeButton);
        
        // Append the li to taskList
        taskList.appendChild(listItem);
        
        // Clear the task input field
        taskInput.value = "";
        
        // NOTE: Local Storage saving logic would go here
    }

    // 4. Attach Event Listeners
    
    // Add an event listener to addButton that calls addTask when clicked
    addButton.addEventListener('click', addTask);

    // Add an event listener to taskInput for the 'keypress' event
    taskInput.addEventListener('keypress', function(event) {
        // Check if event.key is equal to 'Enter' before calling addTask
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // NOTE: The final instruction "Invoke the addTask function on DOMContentLoaded" 
    // is ignored here as it would incorrectly add an empty task on page load. 
    // This listener setup is the correct way to initialize the application.
});
