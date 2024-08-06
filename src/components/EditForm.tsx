'use client'

import React, { useState } from 'react'
import {
    Drawer,
    DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose
} from "@/components/ui/drawer"
import { Button } from './ui/button'
import { Pencil } from "lucide-react";
import Form from './Form'
import { Task } from '@/utils/types';
import { cn } from '@/lib/utils';
import { customRevalidatePath } from '@/lib/actions';

interface EditFormProps {
    task: Task; // The task to be edited
    className?: string;
}

export default function EditForm({ task, className }: EditFormProps) {
    // Initialize form data with the provided task details
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<Task>({
        id: task.id,
        title: task.title,
        description: task.description,
        category: task.category,
        due_date: task.due_date,
        status: task.status,
        lastUpdated: task.lastUpdated
    });

    // Handle form submission to update the task
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Send a PUT request to update the task
        try {
            const response: Response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formData, lastUpdated: new Date().toISOString() })
            });
            if (response.ok) {
                console.log('Task updated');
            }
            await customRevalidatePath("fetchTasks");
            setOpen(false); // Close the drawer after updating the task
        } catch (error) {
            console.log('Error updating task:', error);

        }
    };

    return (
        <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
            {/* Trigger to open the drawer with an edit icon */}
            <DrawerTrigger asChild>
                <Pencil className={cn(className, "text-blue-500 hover:cursor-pointer")} />
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Edit the task</DrawerTitle>
                        <DrawerDescription>Fill in the form to edit the task.</DrawerDescription>
                    </DrawerHeader>

                    {/* Form component to handle task editing */}
                    <Form formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />

                    <DrawerFooter>
                        {/* Button to close the drawer */}
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
