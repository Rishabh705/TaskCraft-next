import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { Task } from '@/utils/types';

// Define the path to the JSON file where tasks are stored
const filePath: string = path.join(process.cwd(), 'src', 'utils', 'data.json');

// Read tasks from the JSON file
const readFile = async (): Promise<Task[]> => {
    try {
        // Read the file content as a string
        const file: string = await fs.readFile(filePath, 'utf8');
        // Parse JSON string to an array of tasks, default to empty array if parsing fails
        return JSON.parse(file) || [];
    } catch (error) {
        // Return an empty array if file reading or parsing fails
        return [];
    }
};

// Write tasks to the JSON file
const writeFile = async (data: Task[]) => {
    // Write JSON data to the file with 2-space indentation
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// Handle GET requests to fetch all tasks
export async function GET() {
    try {
        const data: Task[] = await readFile();
        // Respond with the tasks as JSON
        return NextResponse.json({ data });
    } catch (error) {
        console.error(error);
        // Respond with an error message and status code 500 if there's a failure
        return NextResponse.json({ error: 'Failed to get data.' }, { status: 500 });
    }
}

// Handle POST requests to add a new task
export async function POST(request: Request) {
    try {
        const data: Task[] = await readFile();
        const newTask: Task = await request.json();
        // Add the new task to the list of tasks
        data.push(newTask);
        // Save the updated task list to the file
        await writeFile(data);
        // Respond with the newly added task and status code 201
        return NextResponse.json({ data: newTask }, { status: 201 });
    } catch (error) {
        console.error(error);
        // Respond with an error message and status code 500 if there's a failure
        return NextResponse.json({ error: 'Failed to save data.' }, { status: 500 });
    }
}

// Handle DELETE requests to remove a task by its ID
export async function DELETE(request: Request) {
    try {
        const { id }: { id: string } = await request.json();
        let data: Task[] = await readFile();
        // Check if there are tasks to delete
        if (data.length === 0) {
            return NextResponse.json({ error: 'No tasks to delete.' }, { status: 404 });
        }
        // Filter out the task with the given ID
        const initialLength = data.length;
        data = data.filter((task: Task) => task.id !== id);
        // If no tasks were removed, return an error
        if (data.length === initialLength) {
            return NextResponse.json({ error: 'Task not found.' }, { status: 404 });
        }
        // Save the updated list of tasks to the file
        await writeFile(data);
        // Respond with a success message
        return NextResponse.json({ message: 'Task deleted successfully.' }, { status: 200 });
    } catch (error) {
        console.error(error);
        // Respond with an error message and status code 500 if there's a failure
        return NextResponse.json({ error: 'Failed to delete data.' }, { status: 500 });
    }
}

// Handle PUT requests to update a task
export async function PUT(request: Request) {
    try {
        const updatedTask: Task = await request.json();
        let data: Task[] = await readFile();
        // Update the task in the list
        data = data.map((task: Task) => (task.id === updatedTask.id ? updatedTask : task));
        // Save the updated task list to the file
        await writeFile(data);
        // Respond with the updated task
        return NextResponse.json({ data: updatedTask }, { status: 200 });
    } catch (error) {
        console.error(error);
        // Respond with an error message and status code 500 if there's a failure
        return NextResponse.json({ error: 'Failed to update data.' }, { status: 500 });
    }
}
