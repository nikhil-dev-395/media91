// Function to post a comment
async function postComment(commentText, videoId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/comment/video/${videoId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentText }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      alert("Comment posted successfully");
      console.log("Comment:", data.comment);
    } else {
      alert("Failed to post comment: " + data.message);
    }
  } catch (error) {
    console.error("Error posting comment:", error);
    alert("Failed to post comment. Please try again later.");
  }
}

// Function to handle form submission
function handleCommentSubmission(event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Get comment text from the textarea
  const commentText = document.getElementById("commentText").value.trim();

  // Check if comment text is not empty
  if (!commentText) {
    alert("Please enter a comment.");
    return;
  }

  // Get the videoId from the URL params
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get("videoId");

  // Post the comment
  postComment(commentText, videoId);
}

// Add event listener to the form
const commentForm = document.getElementById("commentForm");
commentForm.addEventListener("submit", handleCommentSubmission);
