# Task Management System

## Overview
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


The Task Management System is a web application that allows users to manage their tasks efficiently. Users can create new tasks, update existing tasks, mark tasks as completed, and search for tasks. The application also features an expandable list view for tasks, displaying additional details such as the task description and the last updated timestamp.

## System Design

The system is designed using Nextjs for the frontend, with Tailwind CSS for styling. Key components include:

1. **Task Manager**: Manages the list of tasks along with the search and filter functionality.
2. **Task List**: Displays a list of tasks.
3. **Task Item**: Represents individual tasks, with the ability to expand and show additional details.
4. **Countdown Timer**: Shows a countdown to the task's due date and updates the display dynamically.

## Implementation

### Core Features

- **Create Task**: Allows users to add new tasks.
- **Update Task**: Allows users to edit existing tasks.
- **Mark as Done**: Allows users to mark tasks as completed.
- **Search Tasks**: Implements a search functionality to filter tasks.
- **Expandable List**: Displays tasks in an expandable list format, showing a description and a timestamp of the last update when expanded.

### Data Storage

For simplicity, the tasks are stored in the component state. In a real-world application, tasks would typically be stored in a backend database, with API endpoints to manage task creation, updates, and retrieval.

### Countdown Timer

The `CountdownTimer` component shows the time remaining until a task's due date. It updates every second and changes the badge color when the time left is less than 30 minutes.

### Custom Hook: useIsMounted

A custom hook `useIsMounted` is used to check if the component is mounted, preventing updates to the state if the component is not mounted.

## Setup and Run the Application

### Prerequisites

- Node.js (version 12 or higher)
- npm (version 6 or higher) or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-management-system.git
   cd task-management-system

2. Install the dependencies:
    ```bash
        npm install
    # or
        yarn install
    ``` 
3. Running the Application
To start the application, run:

    ```bash
        npm run dev
    # or
        yarn dev
    ```
The application will be available at http://localhost:3000.

4. Building the Application
To build the application for production, run:

    ```bash
        npm run build
        # or
        yarn build
    ```

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
