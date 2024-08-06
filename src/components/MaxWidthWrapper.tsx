import { cn } from '@/lib/utils'
import React from 'react'

// MaxWidthWrapper component to set a maximum width for its children
const MaxWidthWrapper = ({ children, className }: Readonly<{ children: React.ReactNode; className?: string }>) => {
  return (
    <div className={cn('mx-auto w-full max-w-screen-xl px-2.5 md:px-20', className)}>
      {/* Render children within a div that has a maximum width */}
      {children}
    </div>
  )
}

export default MaxWidthWrapper
