import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import EditForm from './EditForm';
import MarkComplete from './MarkComplete';
import TimeLeft from './TimeLeft';
import { Task } from '@/utils/types';
import Delete from "./Delete";

export default async function TaskCard({ task, isGrid }: { task: Task, isGrid: boolean }) {

    // Fetch updated task data from the server
    const response: Response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${task.id}`, {
        cache: "no-cache",
        next:
          { tags: ['fetchTasks'] }

      });
    const { data }: { data: Task } = await response.json();

    return (
        <>
            <AccordionItem value="item-1" className='pt-3 px-3'>
                {/* Conditionally render TimeLeft component based on task status */}
                <div className='flex w-full items-center justify-between'>
                    <p className="text-sm font-bold">
                        {task.category}
                    </p>
                    <div className={`${task.status === 'Complete' ? 'hidden' : 'block'}`}>
                        <TimeLeft task={task} />
                    </div>
                </div>
                {/* Display truncated title based on grid or list view */}
                <AccordionTrigger className='pt-2'>
                    {isGrid ? task.title.substring(0, 25) : task.title.substring(0, 50)}
                    {isGrid ? task.title.split("").length > 28 && "..." : task.title.split("").length > 50 && "..."}
                </AccordionTrigger>
                <AccordionContent>
                    {/* Display truncated description based on grid or list view */}
                    <p className="mb-2 text-xs font-light">Last Updated at: {task.lastUpdated}</p>
                    <div className='flex justify-between'>
                        <p className="text-wrap w-4/5">
                            {isGrid ? task.description.substring(0, 200) : task.description.substring(0, 300)}
                        </p>
                        <div className='flex items-center gap-1'>
                            {/* Render EditForm and Delete components */}
                            <EditForm task={data} className="h-4 w-4" />
                            <Delete taskId={task.id} className="h-4 w-4" />
                            {/* Conditionally render MarkComplete based on task status */}
                            <div className={`${task.status === 'Complete' ? 'hidden' : 'flex'}`}>
                                <MarkComplete task={data} className='h-4 w-4' />
                            </div>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </>
    );
}
