'use client'

import { cn } from "@/lib/utils";
import { Task } from "@/utils/types";
import { CheckCheck } from "lucide-react";

export default function MarkComplete({ task, className }: { task: Task; className?: string }) {
    // Handler function to mark the task as complete
    const handleComplete = async() => {
        // Send a PUT request to update the task status
        const response: Response = await fetch('http://localhost:3000/api', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...task, status: 'Complete' })
        });
        if (response.ok) {
            console.log('Task completed'); // Log success message
        }
    };

    return (
        // CheckCheck icon that triggers the handleComplete function on click
        <CheckCheck onClick={handleComplete} className={cn(className, `text-green-500 hover:cursor-pointer`)}/>
    )
}
