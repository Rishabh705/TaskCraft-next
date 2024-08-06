'use client'

import { useCallback, useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { useSearchParams, usePathname, useRouter, ReadonlyURLSearchParams } from "next/navigation";
import { Button } from "./ui/button";

// ViewButton component to toggle between grid and list view
export default function ViewButton({ className }: { className?: string }) {
  // Retrieve the current search parameters from the URL
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  // Get the current pathname
  const pathname: string = usePathname();
  // State to manage the current view mode, default to 'grid'
  const [currentView, setCurrentView] = useState<string>(searchParams.get('view') || 'grid');
  // Router object to replace the URL with the updated search parameters
  const { replace } = useRouter();

  // Function to toggle the view mode between 'grid' and 'list'
  const changeView = useCallback(() => {
    // Create a copy of the search parameters to modify
    const params = new URLSearchParams(searchParams.toString())
    // Toggle the view mode based on the current view
    if (currentView === 'grid') {
      setCurrentView('list');
    } else {
      setCurrentView('grid');
    }
    // Update the 'view' parameter in the URL
    params.set('view', currentView);
    
    // Replace the current URL with the updated search parameters
    replace(`${pathname}?${params.toString()}`);
  }, [currentView, pathname, replace, searchParams])

  return (
    // Button to toggle the view mode
    <Button onClick={() => changeView()} className={`px-3 ${className}`}>
      {/* Display different icons based on the current view mode */}
      {currentView === 'list' ? <LayoutGrid className='h-4 w-4 md:h-5 md:w-5' /> : <List className='h-4 w-4 md:h-5 md:w-5' />}
    </Button>
  );
}
