const emptyMessage = document.getElementById("emptyMessage");


const taskInput = document.getElementById("taskInput");

const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");

const clearBtn = document.getElementById("clearBtn");


const filterButtons = document.querySelectorAll(".filter");


let tasks = [];

clearBtn.addEventListener("click", function () {

    tasks = [];

    localStorage.removeItem("tasks");

    taskList.innerHTML = "";

    checkEmptyMessage();

}); 

taskInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        addBtn.click();

    }

});
const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
    tasks = JSON.parse(savedTasks);
}

function checkEmptyMessage() {

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    }

    else {
        emptyMessage.style.display = "none";
    }

}

function createTask(task) {

    

    const li = document.createElement("li");

  const span = document.createElement("span");

span.textContent = task.text;

if (task.completed) {
    span.classList.add("completed");
}

li.appendChild(span); 

    const completeBtn = document.createElement("button");

completeBtn.textContent = "Complete";

completeBtn.addEventListener("click", function () {

    span.classList.toggle("completed");

    task.completed = span.classList.contains("completed");

    localStorage.setItem("tasks", JSON.stringify(tasks));


});

const editBtn = document.createElement("button");

editBtn.textContent = "Edit";

editBtn.addEventListener("click", function () {

    const newTask = prompt("Edit your task:", span.textContent);

    if (newTask !== null && newTask.trim() !== "") {

       task.text = newTask;

span.textContent = newTask;

localStorage.setItem("tasks", JSON.stringify(tasks));

        span.textContent = newTask;

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

});

    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {

        li.remove();

        const index = tasks.indexOf(task);

        tasks.splice(index, 1);

        localStorage.setItem("tasks", JSON.stringify(tasks));

    });

    checkEmptyMessage();

    li.appendChild(completeBtn);

    li.appendChild(editBtn);

    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    checkEmptyMessage();
}

tasks.forEach(function (task) {
    createTask(task);
});

addBtn.addEventListener("click", function () {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
    text: taskText,
    completed: false
};

tasks.push(newTask);

localStorage.setItem("tasks", JSON.stringify(tasks));

createTask(newTask);

taskInput.value = "";

checkEmptyMessage();

});

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const filter = button.dataset.filter;

        const allTasks = document.querySelectorAll("#taskList li");

        allTasks.forEach(function (task) {

            const isCompleted = task.querySelector("span").classList.contains("completed");

            if (filter === "all") {
                task.style.display = "flex";
            }

            else if (filter === "active") {

                if (isCompleted) {
                    task.style.display = "none";
                }

                else {
                    task.style.display = "flex";
                }
            }

            else if (filter === "completed") {

                if (isCompleted) {
                    task.style.display = "flex";
                }

                else {
                    task.style.display = "none";
                }
            }

        });

    });

});

checkEmptyMessage();