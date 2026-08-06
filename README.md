<h1 align="center">File Vault</h1>

<p align="center">
  <img src="https://github.com/user-attachments/assets/0fd80fbf-a9c1-45cb-bd80-70a05b405bb6" alt="File Vault Screenshot" />
</p>


A full-stack file storage application that allows users to upload, manage, and organise files. Users can create folders, upload files, view stored files, and manage their documents through a simple interface.

This project was built using Node.js, Express, PostgreSQL, Prisma, and EJS to practise full-stack web development, authentication, database management, and cloud storage integration.



## Live Demo

[View Website](https://odin-file-uploader-mgv0.onrender.com/)

## Features

- Upload, view, and manage files
- Create and organise files using folders
- User authentication and session management
- Store file metadata in a PostgreSQL database
- Cloud storage integration for uploaded files
- Download and delete files through the interface

## Built With

- Node.js
- Express.js
- EJS
- PostgreSQL
- Prisma ORM
- Cloudinary
- Multer
- Express Session
- CSS
- JavaScript

## Installation

Clone the repository:

```bash
git clone https://github.com/ThousandDucks/odin-file-uploader.git
```

Navigate into the project directory:

```bash
cd odin-file-uploader
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add your environment variables:

```env
DATABASE_URL=your_database_url

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

SESSION_SECRET=your_session_secret
```

Set up the database:

```bash
npx prisma migrate dev
```

Start the application:

```bash
node app
```

## Future Improvements

- Add folder sharing functionality
- Add file search and filtering
- Add storage limit for each user
