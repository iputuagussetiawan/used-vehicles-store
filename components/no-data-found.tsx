"use client"

import { Frown } from 'lucide-react';
import React from 'react'
import { Button } from './ui/button';

interface NoDataFoundProps {
    message?:string;
    actionText?:string;
    onActionClick?:()=>void
}

const NoDataFound = ({message, actionText, onActionClick}:NoDataFoundProps) => {
    return (
        <div className='flex flex-col items-center justify-center flex-grow w-full h-full p-6'>
            <div className='mb-4'>
                <Frown className='w-16 h-16 text-gray-700' />
            </div>
            <h2 className='mb-2 text-xl font-bold text-gray-700'>
                {message}
            </h2>
            <p className='text-gray-700'>Sorry, We could find aby data for you request </p>

            {onActionClick &&
            (
                <Button onClick={onActionClick} className='px-4 py-2 mt-6 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700'>{actionText}</Button>
            )}
        </div>
    )
}

export default NoDataFound