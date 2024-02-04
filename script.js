document.addEventListener("DOMContentLoaded", function () {
    function newElement() {
        const inputElement = document.getElementById("task");
        const taskListElement = document.getElementById("list");

        if (inputElement.value.trim() !== "") {
            const newTask = document.createElement("li");
            newTask.innerHTML = `<i class="fas fa-trash-alt"></i> ${inputElement.value}`;
            newTask.innerHTML = `<i class="fa-regular fa-square-check"></i> ${inputElement.value}`;

            newTask.addEventListener("click", function (event) {
                if (event.target.tagName === "I") {
                    newTask.remove();
                    saveTasks();
                } else {
                    newTask.classList.toggle("done");
                }
            });

            taskListElement.appendChild(newTask);

            showToast("Success", "Added to list!");

            inputElement.value = "";
        } else {
            showToast("error", "Empty elements cannot be added to the list");
        }
    }

    const ekleButton = document.getElementById("liveToastBtn");

    ekleButton.addEventListener("click", newElement);

    function showToast(type, message) {
        const toastElement = document.getElementById(`liveToast-${type}`);
        const toastInstance = new bootstrap.Toast(toastElement);
        toastInstance.show();
    }

    loadTasks();

    document.getElementById("list").addEventListener("change", saveTasks);

    function saveTasks() {
        const taskListElement = document.getElementById("list");
        const tasks = [];

        taskListElement.childNodes.forEach(function (task) {
            if (task.nodeName == "LI") {
                tasks.push(task.textContent);
            }
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const taskListElement = document.getElementById("list");
        const savedTasks = localStorage.getItem("tasks");

        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);

            // Add tasks to the list
            tasks.forEach(function (taskText) {
                const taskElement = document.createElement("li");
                taskElement.innerHTML = `<i class="fas fa-trash-alt"></i> ${taskText}`;

                taskElement.addEventListener("click", function (event) {
                    if (event.target.tagName === "I") {
                        taskElement.remove();
                        saveTasks();
                    } else {
                        taskElement.classList.toggle("done");
                        saveTasks();
                    }
                });

                taskListElement.appendChild(taskElement);
            });
        }
    }
});
