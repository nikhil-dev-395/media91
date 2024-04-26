console.log("login.js");

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3000/api/v1/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: usernameInput,
          password: passwordInput,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      // set in localStorage
      localStorage.setItem("user", JSON.stringify(data));

      window.location.href = "index.html";
      // Redirect user or perform other actions upon successful login
    } catch (error) {
      console.error("Login error:", error);
      // Display error message to the user, if needed
    }
  });
});
