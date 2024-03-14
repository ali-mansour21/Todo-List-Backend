const data = document.getElementById("data");
const password = document.getElementById("password");
const loginForm = document.getElementById("loginForm");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let userId;
const validateUser = async () => {
  const inputValue = data.value.trim();
  const userData = new FormData();
  if (emailRegex.test(inputValue)) {
    userData.append("email", inputValue);
  } else {
    userData.append("username", inputValue);
  }
  userData.append("password", password.value);
  try {
    const response = await axios.post(
      "http://localhost/tasks_system/backend/login.php",
      userData
    );
    userId = response.data.id;
    localStorage.setItem("userId", userId);
    if (response.data.status === "logged in") {
      window.location.href = "http://127.0.0.1:5500/frontend/pages/home.html";
    }
  } catch (error) {
    console.log(error);
  }
};
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateUser();
});
