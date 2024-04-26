const myContent = document.querySelector(".myContent");

window.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("http://localhost:3000/api/v1/media/video");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Extract the data from the response

    // Check if the 'videos' array exists in the response data
    if (!data.videos || !Array.isArray(data.videos)) {
      throw new Error("Invalid data format");
    }

    const videos = data.videos;

    const showHtml = videos
      .map((video, index) => {
        return `
    <div class="vid-list">
        <a href="watch.html?videoId=${video._id}">
            <img src="${video.thumbnail}" class="thumbnail" />
        </a>
        <div class="flex-div">
            <img class="channel" src="${video.avatarUrl}" />
            <div class="vid-info">
                <a href="Play-Video.html?videoId=${video._id}">${video.title}</a>
                <a href="channel.html?channelId=${video.channelId}">${video.channelName}</a>
                <p>${video.createdAt}</p>
            </div>
        </div>
    </div>
`;
      })
      .join("");

    myContent.innerHTML = showHtml;
  } catch (error) {
    console.error("There was a problem fetching or rendering data:", error);
    throw error;
  }
});
