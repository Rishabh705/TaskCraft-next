'use client'

import { ChangeEventHandler } from "react";
import { Input } from "./ui/input";
import { useSearchParams, usePathname, useRouter, ReadonlyURLSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

const SearchBox = ({ className }: { className?: string }) => {
    // Get current search parameters and pathname from Next.js router
    const searchParams: ReadonlyURLSearchParams = useSearchParams();
    const pathname: string = usePathname();
    const { replace } = useRouter();

    // Handle input changes with debounce to optimize performance
    const handleChange: ChangeEventHandler<HTMLInputElement> = useDebouncedCallback((evt) => {
        // Create a new URLSearchParams object from current search parameters
        const params = new URLSearchParams(searchParams);

        // Update search parameters based on input value
        if (evt.target.value) {
            params.set('search', evt.target.value);
        } else {
            params.delete('search');
        }

        // Replace the current URL with updated search parameters
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className={className}>
            <div className="relative flex w-full items-stretch">
                {/* Input field for search, using debounced handleChange function */}
                <Input 
                    type='text' 
                    placeholder='Find tasks in a flash...' 
                    onChange={(e) => handleChange(e)} 
                    defaultValue={searchParams.get('search')?.toString()} 
                />
            </div>
        </div>
    )
}

export default SearchBox
