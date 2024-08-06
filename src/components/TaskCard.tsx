import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from './ui/button';
import EditForm from './EditForm';
import MarkComplete from './MarkComplete';
import TimeLeft from './TimeLeft';
import { Task } from '@/utils/types';
import Delete from "./Delete";

export default async function TaskCard({ task, isGrid }: { task: Task, isGrid: boolean }) {

    // Fetch updated task data from the server
    const response: Response = await fetch(`http://localhost:3000/api/${task.id}`, { cache: "no-store" });
    const { data }: { data: Task } = await response.json();
    
    return (
        <>
            <CardHeader className='pb-2'>
                {/* Conditionally render TimeLeft component based on task status */}
                <div className={`pb-1 ${task.status === 'Complete' ? 'hidden' : 'block'}`}>
                    <TimeLeft task={task} />
                </div>
                {/* Display truncated title based on grid or list view */}
                <CardTitle className='font-normal'>
                    {isGrid ? task.title.substring(0, 25) : task.title.substring(0, 50)} 
                    {isGrid ? task.title.split("").length > 28 && "..." : task.title.split("").length > 50 && "..."}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/* Display truncated description based on grid or list view */}
                <CardDescription className='break-all'>
                    {isGrid ? task.description.substring(0, 200) : task.description.substring(0, 300)} 
                    {isGrid ? task.description.split("").length > 28 && "..." : task.description.split("").length > 60 && "..."}
                </CardDescription>
            </CardContent>
            <CardFooter className='flex w-full items-center justify-between'>
                {/* Popover component for showing task details */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">Details</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="space-y-2">
                            {/* Display task details */}
                            <div className='flex justify-between items-center'>
                                <p className="text-sm font-medium text-gray-700">Category</p>
                                <p className="text-sm text-gray-500">{task.category}</p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p className="text-sm font-medium text-gray-700">Due Date</p>
                                <p className="text-sm text-gray-500">{task.due_date}</p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p className="text-sm font-medium text-gray-700">Status</p>
                                <p className="text-sm text-gray-500">{task.status}</p>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                <div className='justify-end gap-1 hidden group-hover:flex'>
                    {/* Render EditForm and Delete components */}
                    <EditForm task={data}/>
                    <Delete taskId={task.id}/>
                    {/* Conditionally render MarkComplete based on task status */}
                    <div className={`hidden ${task.status === 'Complete' ? '' : 'group-hover:flex'}`}>
                        <MarkComplete task={data} />
                    </div>
                </div>
            </CardFooter>
        </>
    );
}
