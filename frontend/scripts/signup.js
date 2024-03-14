const createForm = document.getElementById("signupForm");
const userName = document.getElementById("username");
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("password");

const createNewUser = async () => {
  const data = new FormData();
  data.append("username", userName.value);
  data.append("email", userEmail.value);
  data.append("password", userPassword.value);
  try {
    const response = await axios.post(
      "http://localhost/tasks_system/backend/createUser.php",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Set the Content-Type header
        },
      }
    );
    if (response.status === 200) {
      window.location.href = "http://127.0.0.1:5500/index.html";
    }
  } catch (error) {
    console.log(error);
  }
};
createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createNewUser();
});
