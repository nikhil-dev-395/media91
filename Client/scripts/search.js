// window.onload = async (event) => {
//   event.preventDefault();
//   try {
//     const searchTitle = new URLSearchParams(window.location.search).get(
//       "title"
//     );

//     console.log(searchTitle);

//     const response = await fetch(
//       `http://localhost:3000/api/v1/search/search?title=${encodeURIComponent(
//         searchTitle
//       )}`
//     );

//     if (response.ok) {
//       const searchData = await response.json();
//       const searchResultsContainer = document.getElementById("searchResults");

//       if (searchData.videos.length === 0) {
//         searchResultsContainer.innerHTML = "<p>No videos found</p>";
//       } else {
//         searchData.videos.forEach((video) => {
//           const videoElement = document.createElement("div");
//           videoElement.innerHTML = `
//             <h2>${video.title}</h2>
//             <p>${video.description}</p>
//             <video src="${video.url}" controls></video>
//           `;
//           searchResultsContainer.appendChild(videoElement);
//         });
//       }
//     } else {
//       console.error("Error searching for videos:", response.statusText);
//     }
//   } catch (error) {
//     console.error("Error searching for videos:", error);
//   }
// };

