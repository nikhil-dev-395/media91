document.addEventListener("DOMContentLoaded", function () {
  // Select the like button
  const likeButton = document.getElementById("likeButton");

  // Add event listener to the like button
    likeButton.addEventListener("click", async function () {
      alert("like")
    try {
      // Get the video ID from the URL
      const params = new URLSearchParams(window.location.search);
      const videoId = params.get("videoId");

      // Get the user ID from local storage
      const userId = localStorage.getItem("userId");

      if (!videoId || !userId) {
        throw new Error("Video ID or user ID is missing");
      }

      // Send a POST request to the server to like the video
      const response = await fetch(
        `http://localhost:3000/api/v1/videos/like/${videoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }), // Pass the user ID in the body
        }
      );

      if (!response.ok) {
        throw new Error("Failed to like the video");
      }

      // Parse the JSON response
      const data = await response.json();

      // Display a success message or handle the response data as needed
      console.log(data.message);
    } catch (error) {
      // Handle errors, such as displaying an error message to the user
      console.error("Error liking the video:", error.message);
    }
  });
});
