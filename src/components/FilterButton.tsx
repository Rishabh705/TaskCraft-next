'use client'

import { Button } from './ui/button';
import { Filter } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useCallback } from 'react';
import { useSearchParams, usePathname, useRouter, ReadonlyURLSearchParams } from 'next/navigation';

export default function FilterButton({ className }: { className?: string }) {

    // Get search parameters, current pathname, and router replace function
    const searchParams: ReadonlyURLSearchParams = useSearchParams();
    const pathname: string = usePathname();
    const { replace } = useRouter();

    // Update URL with selected filter values
    const handleChange = useCallback((filterType: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        
        params.set(filterType, value);
        
        replace(`${pathname}?${params.toString()}`);
    }, [pathname, replace, searchParams]);

    return (
        <Popover>
            {/* Button to trigger the popover */}
            <PopoverTrigger asChild>
                <Button><Filter /></Button>
            </PopoverTrigger>
            <PopoverContent className='flex flex-col gap-4'>
                {/* Dropdown for selecting status */}
                <Select onValueChange={(value) => handleChange('status', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">Status</SelectItem>
                        <SelectItem value="Incomplete">Incomplete</SelectItem>
                        <SelectItem value="Complete">Complete</SelectItem>
                    </SelectContent>
                </Select>
                {/* Dropdown for selecting category */}
                <Select onValueChange={(value) => handleChange('category', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">Category</SelectItem>
                        <SelectItem value="Work">Work</SelectItem>
                        <SelectItem value="Personal">Personal</SelectItem>
                    </SelectContent>
                </Select>
            </PopoverContent>
        </Popover>
    );
}
