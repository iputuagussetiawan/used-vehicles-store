"use client";
import { cn } from '@/lib/utils';
import { trace } from 'console';
import React from 'react'
interface FlexBoxProps extends React.HTMLAttributes<HTMLDivElement>{
    children: React.ReactNode
}
export const FlexBox = ({children, className="", ...props}: FlexBoxProps) => {
    return (
        <div {...props} className={cn("flex items-center", className)}>{children}</div>
    )
}

export default FlexBox;
