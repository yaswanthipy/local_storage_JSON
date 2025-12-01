
// Load tasks from localStorage on page load

window.addEventListener("load", () => {
    loadTasks();
});


// Add Task Button

document.getElementById("addTaskBtn").addEventListener("click", addTask);


// Real-time Search

document.getElementById("searchInput").addEventListener("input", filterTasks);



// Add New Task
function addTask() {
    const taskText = document.getElementById("taskInput").value.trim();
    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    const tasks = getTasksFromStorage();

    const newTask = {
        id: Date.now(),         // unique ID
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("taskInput").value = "";
    loadTasks();
}



// Load & Display Tasks

function loadTasks() {
    const tasks = getTasksFromStorage();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        // Visual completed style
        if (task.completed) {
            li.classList.add("completed");
        }

        li.textContent = task.text;

        // Toggle Complete Button
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "✔";
        toggleBtn.addEventListener("click", () => toggleTask(task.id));

        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✖";
        deleteBtn.addEventListener("click", () => removeTask(task.id));

        li.appendChild(toggleBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}


// Toggle Task Completion
function toggleTask(taskId) {
    const tasks = getTasksFromStorage();

    const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    loadTasks();
}



// Remove Task

function removeTask(taskId) {
    const tasks = getTasksFromStorage();
    const updatedTasks = tasks.filter(task => task.id !== taskId);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    loadTasks();
}



// Search / Filter Tasks

function filterTasks() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const listItems = document.querySelectorAll("#taskList li");

    listItems.forEach(li => {
        if (li.firstChild.textContent.toLowerCase().includes(searchValue)) {
            li.style.display = "";
        } else {
            li.style.display = "none";
        }
    });
}



// Helper - Get tasks from localStorage

function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}
