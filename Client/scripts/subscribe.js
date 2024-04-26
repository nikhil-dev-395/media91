console.log("hello world");

let myContent = document.getElementById("myContent");

window.addEventListener("DOMContentLoaded", async () => {
  try {
    let response = await fetch("http://localhost:3000/api/v1/channel/channel");
    console.log(response);

    let data = await response.json();
    console.log(data);

    let channel = await data.channel;
    console.log(channel);

    let showHtml = channel.map((channel, index) => {
      return `

 <article class="channel">
         <a here="">
          <img
            src="https://images.unsplash.com/photo-1712781797301-ec9ee12b52b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8"
            alt="Channel 1"
            onerror="this.onerror=https://images.unsplash.com/photo-1712781797301-ec9ee12b52b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8"
          />
         <a>
          <div class="channel-info">
            <h2>${channel.channelName}</h2> 
            <h2> owner : ${channel.owner}</h2> 
            <h2> subscriber :  ${channel.subscribers.length}</h2>
            <h2> videos :  ${channel.videos.length}</h2>
            <p>Description of Channel 1.</p>
            <button class="subscribe-btn">Subscribe</button>
          </div>
        </article>



            `;
    });
    myContent.innerHTML = showHtml;
  } catch (error) {
    console.log("error at subscribe.js in client", error);
  }
});
