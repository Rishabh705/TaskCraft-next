'use client'

import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";

export default function Delete({ taskId, className }: { taskId: string; className?: string }) {

    // Handle the deletion of a task
    const handleDelete = async (id: string) => {
        // Send a DELETE request to remove the task
        const response: Response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        if (response.ok) {
            console.log('Task deleted');
        }
    }

    return (
        // Render a Trash icon that triggers the delete function on click
        <Trash className={cn(className, `text-red-500 hover:cursor-pointer`)} onClick={() => handleDelete(taskId)} />
    )
}
