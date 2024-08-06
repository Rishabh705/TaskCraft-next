export interface Task {
    id: string;
    title: string;
    description: string;
    category: string;
    due_date: string;
    status: 'Incomplete' | 'Complete'; // Assuming status can only be these two values
    lastUpdate: string;
}

export interface SearchParams {
    [key: string]: string | string[] | undefined
}

