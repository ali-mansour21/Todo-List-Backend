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
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
const loadTasks = async () => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await axios.get(
      `http://localhost/tasks_system/backend/getTasks.php?user_id=${parseInt(
        userId
      )}`
    );
    tasks.append(response.data);
  } catch (error) {
    console.log(error);
  }
};
loadTasks();
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createTask();
});
