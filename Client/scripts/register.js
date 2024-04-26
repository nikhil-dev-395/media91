document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    handleFormSubmit();
  });

  function handleFormSubmit() {
    const avatarInput = document.getElementById("avatar");
    const channelInput = document.getElementById("channel");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const mobileInput = document.getElementById("mobile");
    const genderInput = document.getElementById("gender");

    const formData = new FormData();
    formData.append("avatar", avatarInput.files[0]);
    formData.append("channelName", channelInput.value);
    formData.append("name", nameInput.value);
    formData.append("email", emailInput.value);
    formData.append("password", passwordInput.value);
    formData.append("mobile", mobileInput.value);
    formData.append("gender", genderInput.value);

    fetch("http://localhost:3000/api/v1/user/signup", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response from server:", data);
        // Store userId in localStorage
        localStorage.setItem("userId", data.user._id);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("channelId", data.user.channelName);
        localStorage.setItem("avatar", data.user.avatar);
        window.location.href = "index.html";
        // You can handle the response from the server here, like showing a success message to the user
      })
      .catch((error) => {
        console.error("Error:", error);
        // You can handle errors here, like showing an error message to the user
      });
  }
});
