const taskForm = document.getElementById("taskForm");
const tasktitle = document.getElementById("title");
const taskDescription = document.getElementById("description");
const tasksContainer = document.getElementById("tasksContainer");
let tasks = [];
const createTask = async () => {
  const userId = localStorage.getItem("userId");
  const taskData = new FormData();
  taskData.append("title", tasktitle.value);
  taskData.append("description", taskDescription.value);
  taskData.append("user_id", userId);
  try {
    const response = await axios.post(
      "http://localhost/tasks_system/backend/createTasks.php",
      taskData
    );
    loadTasks();
    showToast("Task created successfully");
  } catch (error) {
    console.log(error);
  }
  tasktitle.value = "";
  taskDescription.value = "";
};
const loadTasks = async () => {
  tasksContainer.innerHTML = "";
  const userId = localStorage.getItem("userId");
  try {
    const response = await axios.get(
      `http://localhost/tasks_system/backend/getTasks.php?user_id=${parseInt(
        userId
      )}`
    );
    tasks = response.data;
    tasks.forEach((task) => {
      tasksContainer.innerHTML += generateTasks(task);
    });
  } catch (error) {
    console.log(error);
  }
};
function generateTasks(task) {
  const { id, title, description, status } = task;
  return `<div class="catchTask ${status === 1 ? "finished" : ""}">
                                    <div class="header">
                                    <h2>${title}</h2></div>
                                    <div class="delete-item">
                                        <p>${description}</p>
                                        <p>${
                                          status === 0 ? "New" : "Finished"
                                        }</p>
                                        <button class="delete-button" data-task-id="${id}">
                                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 blue edit">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="w-6 h-6 red delete-now"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>`;
}
function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toastContainer.removeChild(toast);
    }, 300);
  }, 3000);

  setTimeout(() => {
    toast.classList.add("show");
  }, 10);
}
loadTasks();
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createTask();
});
