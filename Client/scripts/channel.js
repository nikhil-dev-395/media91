const myContent = document.querySelector(".item-2");

const getVideoData = async (videoId) => {
  try {
    let response = await fetch(
      `http://localhost:3000/api/v1/media/video/${videoId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch video ${videoId}.`);
    }

    let videoData = await response.json();
    return videoData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getChannelData = async () => {
  try {
    let params = new URLSearchParams(window.location.search);
    let channelId = params.get("channelId");
    console.log(channelId);

    if (!channelId) {
      throw new Error("Channel ID not found in URL parameters.");
    }

    let response = await fetch(
      `http://localhost:3000/api/v1/channel/channel/${channelId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch channel data.");
    }

    let data = await response.json();
    let channel = data.findChannel;

    // Ensure the channel object exists
    if (!channel) {
      throw new Error("Channel data not found.");
    }

    const subscriberCount = channel.subscribers.length;

    const showInHtml = `
      <img
        src="https://images.unsplash.com/photo-1712781797301-ec9ee12b52b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8"
        class="channel-Background"
        alt=""
      />
      <h1 class="channelName">${channel.channelName}</h1>
      <details>
        <summary>Description</summary>
        <p>${channel.channelName}</p>
      </details>
      <div class="container-detail">
        <h2>Subscribers: ${subscriberCount}</h2>
        <div class="left-videos">
          <button id="videosBtn">Videos</button>
          <div id="videosContainer"></div>
        </div>
      </div>
    `;

    myContent.innerHTML = showInHtml;

    // Add event listener to the video button
    document.getElementById("videosBtn").addEventListener("click", async () => {
      const videosContainer = document.getElementById("videosContainer");
      videosContainer.innerHTML = ""; // Clear previous videos

      for (const videoId of channel.videos) {
        const videoData = await getVideoData(videoId);
        if (videoData) {
          const videoElement = document.createElement("div");
          videoElement.classList.add("video-container");

          const videoTitle = document.createElement("h3");
          videoTitle.textContent = videoData.title;
          videoElement.appendChild(videoTitle);

          const videoDateTime = document.createElement("p");
          const dateTime = new Date(videoData.createdAt);
          videoDateTime.textContent = `Uploaded on ${dateTime.toLocaleDateString()} at ${dateTime.toLocaleTimeString()}`;
          videoElement.appendChild(videoDateTime);

          const video = document.createElement("video");
          video.width = 320;
          video.height = 240;
          video.src = videoData.url;
          video.classList.add("video");
          videoElement.appendChild(video);

          videosContainer.appendChild(videoElement);

          // Add click event listener to open watch page with video ID
          video.addEventListener("click", function () {
            window.open(`watch.html?videoId=${videoData._id}`);
          });
        }
      }
    });
  } catch (error) {
    console.error(error);
    // Handle error, e.g., display a message to the user
  }
};

window.onload = function () {
  getChannelData();
};
