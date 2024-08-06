import MaxWidthWrapper from './MaxWidthWrapper';
import { Card } from "@/components/ui/card";
import AddForm from './AddForm';
import { cn } from '@/lib/utils';
import ViewButton from './ViewButton';
import FilterButton from './FilterButton';
import TaskCard from './TaskCard';
import { Frown } from "lucide-react";
import { SearchParams, Task } from '@/utils/types';
import { Suspense } from 'react';

interface TasksProps {
  searchParams: SearchParams;
  className?: string;
}
export default async function Tasks({ searchParams, className }: TasksProps) {

  // Fetch tasks from the API. 'cache: "no-store"' ensures fresh data on each request.
  const response: Response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api`, { cache: "no-store" });
  const { data }: { data: Task[] | undefined } = await response.json();
  const tasks: Task[] | undefined = data;

  // Extract search query, view type (grid or list), category, and status from searchParams
  const search = searchParams?.search || '';  // Default to an empty string if not provided
  const isGrid: boolean = searchParams?.view === 'grid';  // Determine if the view should be a grid
  const viewstyle: string = isGrid ?
    'grid gap-x-4 gap-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
    'flex flex-col gap-y-6';  // Apply appropriate styling based on the view type
  const category = searchParams?.category || 'none';  // Default to 'none' if not provided
  const status = searchParams?.status || 'none';  // Default to 'none' if not provided

  // Filter tasks based on the search query, selected status, and selected category
  const displayedTasks: Task[] = tasks?.filter((task: Task) =>
    // Check if task title includes the search query (case-insensitive)
    task.title?.toLowerCase().includes(search.toLowerCase()) &&
    // Check if task status matches the selected status (or 'none' for no filter)
    (status === 'none' || task.status === status) &&
    // Check if task category matches the selected category (or 'none' for no filter)
    (category === 'none' || task.category === category)
  ) || [];

  // Map filtered tasks to TaskCard components, each wrapped in a Card component
  const tasksCard: React.JSX.Element[] = displayedTasks.map((task, index) => (
    <Card className={`group relative min-h-52 ${task.status === 'Complete' ? 'bg-green-200' : ''}`} key={index}>
      <TaskCard task={task} isGrid={isGrid} />
    </Card>
  ));

  return (
    <MaxWidthWrapper className={cn(className)}>
      <div className='mb-2 flex justify-between'>
        <h1 className='text-2xl font-semibold'>Your Tasks</h1>
        <div className='flex gap-8'>
          {/* Filter and View buttons for adjusting the task display */}
          <Suspense>
            <FilterButton />
          </Suspense>
          <Suspense>
            <ViewButton className='hidden md:block' />
          </Suspense>
        </div>
      </div>
      <div className={cn(viewstyle, 'min-h-52')}>
        {
          // Display a message if no tasks are found, otherwise display the task cards
          tasksCard.length === 0 ? (
            <section className='flex items-center gap-4 justify-center'>
              <Frown />
              <h1 className='text-2xl font-semibold text-center'>No tasks found</h1>
            </section>
          ) : tasksCard
        }
        {/* Form for adding new tasks */}
        <AddForm />
      </div>
    </MaxWidthWrapper>
  );
}
