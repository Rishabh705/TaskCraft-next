'use client'

import React, { useState } from 'react'
import {
    Drawer,
    DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose
} from "@/components/ui/drawer"
import { Button } from './ui/button'

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { CirclePlus } from "lucide-react"
import Form from './Form'
import { Task } from '@/utils/types'
import { customRevalidatePath } from '@/lib/actions'

export default function AddForm() {
    // Initialize form data state with default values
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<Task>({
        id: '',
        title: '',
        description: '',
        category: '',
        due_date: '',
        status: 'Incomplete',
        lastUpdated: ''
    })

    // Function to generate a unique task ID
    const generateUniqueId = () => {
        return Math.random().toString(36).substring(2, 9);
    };

    // Handle form submission
    const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {

        e.preventDefault()
        try {

            // Generate a unique ID for the new task
            const taskId = generateUniqueId();

            // Send a POST request to add the new task
            const response: Response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formData, id: taskId, lastUpdated: new Date().toISOString() })
            });
            if (response.ok) {
                console.log('Task updated');
            }
            await customRevalidatePath("fetchTasks");
            setOpen(false); // Close the drawer after updating the task


            // Clear form data after submission
            setFormData({
                id: '',
                title: '',
                description: '',
                category: '',
                due_date: '',
                status: 'Incomplete',
                lastUpdated: ''
            })
        } catch (error) {
            console.log('Error updating task:', error);
        }
    }

    return (
        <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
            {/* Trigger to open the drawer */}
            <DrawerTrigger asChild>
                <Card className='flex flex-col justify-center items-center hover:bg-secondary'>
                    <CardContent className='p-6 flex flex-col justify-center items-center'>
                        <CirclePlus className="text-4xl text-gray-500" />
                    </CardContent>
                </Card>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Add a task</DrawerTitle>
                        <DrawerDescription>Fill in the form to add a task.</DrawerDescription>
                    </DrawerHeader>

                    {/* Form component for task entry */}
                    <Form formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />

                    <DrawerFooter>
                        {/* Close button for the drawer */}
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
