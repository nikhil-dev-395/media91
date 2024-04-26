console.log("watch js");

let params = new URLSearchParams(window.location.search);
let videoId = params.get("videoId");
console.log(videoId);

// Fetch video data and display it
fetch(`http://localhost:3000/api/v1/media/video/${videoId}`)
  .then((data) => {
    return data.json();
  })
  .then((response) => {
    // Display video data
    let video = response;
    const createdAt = new Date(video.createdAt);
    const formattedDateTime = `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`;

    let likeCount = video.likes.length;
    console.log(likeCount);
    let tableData = `
      <video
        src="${video.url}"
        class="main-video"
        controls
        width="660px"
        height="400px"
      ></video>
      <h1>${video.title}</h1>

      <div class="channel-details">
        <img
          class="avatar"
          width="60px"
          height="40px"
          src="${video.avatarUrl}"
          alt=""
        />
        <a href="channel.html?channelId=${video.channelId}">${video.channelName}</a>
    
    <p class="dateTime">  ${formattedDateTime}</p>
    <p class="likeBtn"> like = ${likeCount}</p>
        </div>


      <div class="buttons-on-video">
        <button id="share">share</button>
       <!-- Inside the .buttons-on-video div -->
<button id="likeButton">Like</button>

        <button id="subscribeBtn">subscribe</button>
      </div>

      <details>
        <summary>description</summary>
        <p>${video.description}</p>
      </details>

      <details>
        <summary>comments</summary>
        <p>${video.comments}</p>
      </details>
    `;

    document.querySelector(".video-container").innerHTML = tableData;

    // Add event listener to subscribe button
    document
      .getElementById("subscribeBtn")
      .addEventListener("click", async () => {
        try {
          // Fetch user ID from localStorage
          let userId = localStorage.getItem("userId");

          if (!userId) {
            throw new Error("User ID not found in localStorage.");
          }

          // Fetch channel ID from video data
          let channelId = video.channelId;

          // Subscribe to the channel
          let subscribeData = { UserId: userId, channelId: channelId };
          let subscribeResponse = await fetch(
            "http://localhost:3000/api/v1/subscribe/subscribe",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(subscribeData),
            }
          );

          if (!subscribeResponse.ok) {
            throw new Error("Failed to subscribe to the channel.");
          }

          alert("Subscribed successfully!");
        } catch (error) {
          console.error("An error occurred while subscribing:", error);
          // Handle error, e.g., display a message to the user
          alert("Failed to subscribe to the channel. Please try again later.");
        }
      });

    // Select the like button
    const likeButton = document.getElementById("likeButton");

    // Add event listener to the like button
    likeButton.addEventListener("click", async function () {
      alert("like");
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
          `http://localhost:3000/api/v1/like/videos/like/${videoId}`,
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

    // share
    let pageUrl = location.href;
    let whatsappApi = `http://wa.me/?text=${pageUrl}`;

    let shareBtn = document.getElementById("share");
    shareBtn.addEventListener("click", function () {
      window.open((url = whatsappApi), (target = "blank"));
    });
  })
  .catch((error) => {
    console.error(
      "An error occurred while fetching or processing data:",
      error
    );
    // Handle error, e.g., display a message to the user
    alert("Failed to load video. Please try again later.");
  });

// Fetch and display suggested videos
const fetchAndDisplaySuggestedVideos = async () => {
  console.log("get all videos");

  const myContent = document.querySelector(".suggested-videos");

  try {
    let data = await fetch("http://localhost:3000/api/v1/media/video");
    let response = await data.json();

    let videos = response.videos;

    const showHtml = videos.map((video, index) => {
      return `
        <div class="vid-list">
          <a href="watch.html?videoId=${video._id}">
            <img src="${video.thumbnail}" class="video-thumbnail" />
          </a>

          <h1 class="video-title">${video.title}</h1>

          <div class="channel-details">
            <img
              class="avatar"
              width="30px"
              height="30px"
              src="${video.avatarUrl}"
              alt=""
            />
            <a href="channel.html?channelId=${video.channelId}" class="channelName">${video.channelName}</a>
          </div>
        </div> 
      `;
    });

    myContent.innerHTML = showHtml;
  } catch (error) {
    console.error(
      "An error occurred while fetching or processing data:",
      error
    );
    // Handle error, e.g., display a message to the user
    alert("Failed to load suggested videos. Please try again later.");
  }
};

window.onload = function () {
  fetchAndDisplaySuggestedVideos();
};
