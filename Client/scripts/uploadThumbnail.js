document.addEventListener("DOMContentLoaded", function () {
  let thumbnailId; // Define thumbnailId variable accessible to both event listeners

  const uploadForm = document.getElementById("uploadForm");

  uploadForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(uploadForm);

    try {
      // Retrieve user data from localStorage
      const userDataString = localStorage.getItem("user");

      if (!userDataString) {
        throw new Error("User data not found in localStorage");
      }

      // Parse user data from JSON string
      const userData = JSON.parse(userDataString);

      // Extract user ID from user data
      const userId = localStorage.getItem("userId");

      if (!userId) {
        throw new Error("User ID not found in user data");
      }

      // Append userId to the formData
      formData.append("userId", userId);

      // Upload thumbnail
      const thumbnailResponse = await fetch(
        "http://localhost:3000/api/v1/media/thumbnail",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!thumbnailResponse.ok) {
        throw new Error("Thumbnail upload failed");
      }

      const thumbnailData = await thumbnailResponse.json();

      console.log("Thumbnail uploaded:", thumbnailData);

      // Set thumbnailId to the received thumbnail ID
      thumbnailId = thumbnailData.thumbnailRecord._id;

      // Redirect to uploadVideo.html with thumbnail ID
      window.location.href = `uploadVideo.html?thumbnailId=${thumbnailId}`;
    } catch (error) {
      console.error("Error:", error.message);
      // Handle errors
    }
  });

  const uploadVideo = document.getElementById("video");

  uploadVideo.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(uploadVideo);

    try {
      if (!thumbnailId) {
        throw new Error("Thumbnail ID not available");
      }

      const videoResponse = await fetch(
        `http://localhost:3000/api/v1/media/video/${thumbnailId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!videoResponse.ok) {
        throw new Error("Video upload failed");
      }

      const videoData = await videoResponse.json();

      console.log("Video uploaded:", videoData);
    } catch (error) {
      console.error("Error:", error.message);
      // Handle errors
    }
  });
});
