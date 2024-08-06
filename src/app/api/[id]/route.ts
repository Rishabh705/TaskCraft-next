import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { Task } from '@/utils/types';

// Define the path to the JSON file where tasks are stored
const filePath: string = path.join(process.cwd(), 'src', 'utils', 'data.json');

// Read the tasks from the JSON file
const readFile = async (): Promise<Task[]> => {
    try {
        // Read the file content as a string
        const file: string = await fs.readFile(filePath, 'utf8');
        // Parse the JSON string to an array of tasks
        return JSON.parse(file);
    } catch (error) {
        console.error('Error reading file:', error);
        return []; // Return an empty array if file reading or parsing fails
    }
};

// Write tasks to the JSON file
const writeFile = async (data: Task[]) => {
    try {
        // Write JSON data to the file with 2-space indentation
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing file:', error);
    }
};

// Handle GET requests to fetch a specific task by its ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const data: Task[] = await readFile();
        // Find the task with the given ID
        const task: Task | undefined = data.find((task: Task) => task.id === id);
        if (task) {
            // Respond with the found task
            return NextResponse.json({ data: task }, { status: 200 });
        } else {
            // Respond with an error if the task is not found
            return NextResponse.json({ error: 'Task not found.' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error getting task:', error);
        // Respond with an error message if there's a failure
        return NextResponse.json({ error: 'Failed to get data.' }, { status: 500 });
    }
}

// Handle PUT requests to update a task by its ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const updatedTask: Task = await request.json();
        let data: Task[] = await readFile();
        // Update the task with the given ID
        data = data.map((task: Task) => (task.id === id ? updatedTask : task));
        // Save the updated list of tasks to the file
        await writeFile(data);
        // Respond with the updated task
        return NextResponse.json({ data: updatedTask }, { status: 200 });
    } catch (error) {
        console.error('Error updating task:', error);
        // Respond with an error message if there's a failure
        return NextResponse.json({ error: 'Failed to update data.' }, { status: 500 });
    }
}
