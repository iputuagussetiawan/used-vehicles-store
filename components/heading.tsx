"use client";

import React from 'react'

interface HeadingProps {
    title: string,
    description?: string
}

const Heading = ({title, description}: HeadingProps) => {
    return (
        <div className='mt-4'>
            <h1 className='text-xl lg:text-2xl font-bold text-gray-800 mb-1'>{title}</h1>
            {description&&(
                <p className='text-sm lg:text-base text-gray-600'>{description}</p>
            )}
        </div>
    )
}

export default Heading