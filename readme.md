# Media91 Web App

## how to setup backend in system

## Installation

1. first you need to install node js and git in your local system to install

2. Clone the repository:

```bash
git clone "https://github.com/nikhil-dev-395/media91"

cd media91

```

### then

```bash
cd server
npm install
npm start
```


## note that :- all the frontend code will store in * client * folder

### following are the api`s used in server

- for registering user : "http://localhost:3000/api/v1/user/signup/"

- for signin user :"http://localhost:3000/api/v1/user/signin"
- for creating thumbnail :"http://localhost:3000/api/v1/media/thumbnail/:userId"

- for uploading video : "http://localhost:3000/api/v1/media/video/thumnailId"
- for creating comment : "http://localhost:3000/api/v1/comment/createComment/userId"

## Overview

Media91 is a web application built using the (MongoDB, Express.js, html css js , Node.js) stack, designed to provide users with a platform for sharing and viewing multimedia content, similar to YouTube. This README serves as a comprehensive guide to understanding, deploying, and contributing to the Media91 web app.
Media91 is a web application built using the (MongoDB, Express.js, html css js, Node.js) stack, designed to provide users with a platform for sharing and viewing multimedia content, similar to YouTube. This README serves as a comprehensive guide to understanding, deploying, and contributing to the Media91 web app.

## Features

- **User Authentication:** Secure user registration and login system.
- **Content Upload:** Users can upload and share various multimedia content such as videos.
- **User Profiles:** Personalized user profiles showcasing uploaded content and user details.
- **Comments and Likes:** Users can engage with content by leaving comments and liking/disliking videos.
- **Search Functionality:** Enables users to easily discover and explore content on the platform.
- **Responsive Design:** Ensures a seamless experience across different devices and screen sizes.

## Technologies Used

- **MongoDB:** NoSQL database for storing user data, video information, and other relevant details.
- **Express.js:** Web application framework for handling backend logic and routing.
- **html css js:** languages for building interactive user interfaces.
- **Node.js:** JavaScript runtime for server-side development.
- **JWT Authentication:** JSON Web Token-based authentication for secure user sessions.
- **Cloudinary:** Cloud-based media management for storing and serving multimedia content.
- **Mongoose:** MongoDB object modeling for Node.js, providing a straightforward way to interact with the database.

## Prerequisites

- Node.js and npm installed on your machine
- MongoDB Atlas account (or a local MongoDB instance)
- Cloudinary account for storing and managing media files

# following are the apis we are using

- for registering user : "http://localhost:3000/api/v1/user/signup/"
  ![alt text](image.png)

- for creating thumbnail :"http://localhost:3000/api/v1/media/thumbnail/:userId"
  ![alt text](image-1.png)

for uploading video : "http://localhost:3000/api/v1/media/video/thumnailId"
![alt text](image-2.png)

- for creating comment : "http://localhost:3000/api/v1/comment/createComment/userId"
  ![alt text](image-3.png)

- for signin user :"http://localhost:3000/api/v1/user/signin"
  ![alt text](image-4.png)
