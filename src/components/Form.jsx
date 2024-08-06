import React from 'react'
import { Input } from './ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from './ui/button'

export default function Form({ formData, setFormData, handleSubmit }) {
    // Update formData state on input change
    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // Update formData state on select value change
    const handleChange = (type, value) => {
        setFormData((prev) => {
            return {
                ...prev,
                [type]:  value,
            };
        });
    };

    return (
        <div className="p-4 pb-0">
            <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                {/* Title input */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <Input type="text" name="title" value={formData.title} onChange={handleFormChange} className="mt-1  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder='Enter task title' required />
                </div>

                {/* Description textarea */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleFormChange} rows="3" className="mt-1  block w-full sm:text-sm border border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md p-3" placeholder='Enter task description'></textarea>
                </div>

                {/* Category select */}
                <div>
                    <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-700">Category</label>
                    <Select name="category" className=" block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none  sm:text-sm" onValueChange={(value) => handleChange('category', value)} value={formData.category} required>
                        <SelectTrigger>
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Work">Work</SelectItem>
                            <SelectItem value="Personal">Personal</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Due Date input */}
                <div>
                    <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">Due Date</label>
                    <Input type="date" name="due_date" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={formData.due_date} onChange={handleFormChange} required />
                </div>

                {/* Status select */}
                <div>
                    <label htmlFor="status" className="mb-1 block text-sm font-medium text-gray-700">Status</label>
                    <Select name="status" className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onValueChange={(value) => handleChange('status', value)} value={formData.status} required>
                        <SelectTrigger>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Incomplete">Incomplete</SelectItem>
                            <SelectItem value="Complete">Complete</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Submit button */}
                <Button className='w-full'>Submit</Button>
            </form>
        </div>
    )
}
