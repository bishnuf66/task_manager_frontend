# TaskMaster - Frontend(https://task-manager-frontend-rouge-five.vercel.app/)

## Overview

The frontend of the TaskMaster application is built with **React** and **Vite**, utilizing **Tailwind CSS** for responsive design. It provides an intuitive interface for users to interact with the backend, allowing them to manage their tasks efficiently. The application supports creating, viewing, and deleting tasks with proper error handling and loading states to ensure a smooth user experience.

## Tech Stack

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **API Integration**: Fetching data via REST API calls to the backend

## Frontend Setup Instructions

### Prerequisites

Make sure you have the following tools installed before setting up the frontend:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Steps to Run the Frontend Locally

1. **Clone the repository:**

   Clone the repository using Git:

   ```bash
   git clone https://github.com/bishnuf66/task_manager_frontend.git
   cd task_manager_frontend
   ```

2. **Install dependencies:**

   After cloning the repository, install the required packages:

   ```bash
   npm install
   ```

   or if you're using Yarn:

   ```bash
   yarn install
   ```

3. **Configure environment variables:**

   Create a `.env.local` file in the root of the frontend directory and add the following environment variables:

   ```env
   VITE_API_URL=http://localhost:8000/api/v1
   ```

   Replace `http://localhost:8000/api/v1` with the actual API URL of your backend.

4. **Start the development server:**

   Run the development server with the following command:

   ```bash
   npm run dev
   ```

   or with Yarn:

   ```bash
   yarn dev
   ```

   This will run the frontend application locally at `http://localhost:5173`.

---

## Frontend Features

- **Task Management**: Users can view, create, and delete tasks via a clean and easy-to-use interface.
- **Responsive Design**: The frontend is built using Tailwind CSS, ensuring that the application adapts well to various screen sizes and devices (mobile-first design).
- **Loading Indicators**: Display loading indicators to enhance the user experience when data is being fetched or updated.
- **Error Handling**: Proper error messages are displayed to users if there’s an issue, such as when a task cannot be deleted.

---

## Conclusion

The frontend of TaskMaster provides a seamless and responsive user experience. The app allows users to manage tasks effectively while offering a clean and intuitive interface. Once both the frontend and backend are set up, users can securely create, manage, and delete tasks.
