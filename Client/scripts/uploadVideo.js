// Assuming you have the user's ID stored in localStorage
const userId = localStorage.getItem("userId");
const userDataString = localStorage.getItem("user");
const userData = JSON.parse(userDataString);
let avatar = userData.avatar;

// const avatar = JSON.parse(localStorage.getItem("user")).avatar;
// const avatar = JSON.parse(localStorage.getItem("user")).avatar;

console.log(userId, avatar);
// console.log("avatar", avatar);
async function uploadVideo() {
  const fileInput = document.getElementById("videoInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file.");
    return;
  }

  const formData = new FormData();
  formData.append("video", file);
  formData.append("userId", userId); // Include the user's ID in the request
  formData.append("avatarUrl", "avatar"); // Include the user's ID in the request

  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/media/video/${thumbnailId}`,
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload video.");
    }

    const data = await response.json();
    console.log("Video uploaded:", data);
  } catch (error) {
    console.error("Error uploading video:", error);
  }
}
