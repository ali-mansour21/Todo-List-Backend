const taskForm = document.getElementById("taskForm");
const tasktitle = document.getElementById("title");
const taskDescription = document.getElementById("description");
const tasksContainer = document.getElementById("tasksContainer");
const closePopUp = document.getElementById("close-edit");
const editPop = document.getElementById("editPopup");
const editTaskForm = document.getElementById("editTaskForm");
const userScore = document.getElementById("score-data");
let score = 0;
userScore.innerHTML = score;
let tasks = [];
let editedTask;
let editTaskId;
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
  } catch (error) {}
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
    tasks = response.data.allTasks;
    if (Object.keys(tasks).length > 0) {
      for (let i = 0; i < tasks.length; i++) {
        tasksContainer.innerHTML += generateTasks(tasks[i]);
      }
    } else {
      tasksContainer.innerHTML = `<div class="no-tasks">No tasks found</div>`;
    }
    userScore.innerHTML = response.data.score.score;
  } catch (error) {}
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
                                        <button class="delete-button">
                                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
                                                data-edit-id="${id}"
                                          viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 blue edit">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="w-6 h-6 red delete-now"
                                                data-delete-id="${id}"
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
const showToast = (message, type = "info") => {
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
};
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createTask();
});
const handleEditTask = (id) => {
  const userId = localStorage.getItem("userId");
  const editTitle = document.getElementById("editTitle");
  const editDescription = document.getElementById("editDescription");
  const editStatus = document.getElementById("status");
  const task = tasks.find((task) => task.id === parseInt(id));

  if (task) {
    const { title, description, status } = task;
    editTitle.value = title;
    editDescription.value = description;
    editStatus.value = status;
    const editTask = new FormData();
    editTask.append("title", editTitle.value.trim());
    editTask.append("description", editDescription.value.trim());
    editTask.append("status", parseInt(editStatus.value));
    editTask.append("user_id", parseInt(userId));
    editTask.append("id", parseInt(id));
  }
};
const handleDeleteTask = async (id) => {
  const userId = localStorage.getItem("userId");
  const deleteForm = new FormData();
  deleteForm.append("id", parseInt(id));
  deleteForm.append("user_id", parseInt(userId));
  try {
    const response = await axios.post(
      "http://localhost/tasks_system/backend/deleteTasks.php",
      deleteForm
    );
    await loadTasks();
    showToast("Task deleted successfully");
  } catch (error) {}
};
document.addEventListener("click", async (e) => {
  const deleteButton = e.target.closest(".delete-now");
  if (deleteButton) {
    const taskId = deleteButton.getAttribute("data-delete-id");
    handleDeleteTask(taskId);
  }

  const editButton = e.target.closest(".edit");
  if (editButton) {
    editPop.classList.remove("hide-popup");
    const taskId = editButton.getAttribute("data-edit-id");
    editTaskId = taskId;
    handleEditTask(taskId);
  }
});
closePopUp.addEventListener("click", () => {
  editPop.classList.add("hide-popup");
});
editTaskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const editTitle = document.getElementById("editTitle").value.trim();
  const editDescription = document
    .getElementById("editDescription")
    .value.trim();
  const editStatus = parseInt(document.getElementById("status").value);
  const userId = parseInt(localStorage.getItem("userId"));
  const taskId = parseInt(editTaskId);
  const editTask = new FormData();
  editTask.append("title", editTitle);
  editTask.append("description", editDescription);
  editTask.append("status", editStatus);
  editTask.append("user_id", userId);
  editTask.append("id", taskId);
  try {
    const result = await axios.post(
      "http://localhost/tasks_system/backend/editTasks.php",
      editTask
    );
    if (result.data.score) {
      score = result.data.score.score;
    }
    userScore.innerText = score;
    await loadTasks();
    showToast("Task edited successfully");
    editPop.classList.add("hide-popup");
  } catch (error) {}
});
loadTasks();
