'use client'
import React, { useEffect } from 'react'

export default function Svg({ children }: { children: React.ReactNode }) {
    useEffect(() => {

    }, []);

    return (
        <div className="bg-[url('/r.svg')] py-5 relative">
            {children}
        </div>
    )
}
