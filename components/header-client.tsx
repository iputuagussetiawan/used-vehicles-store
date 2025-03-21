"use client"

import React from 'react'

interface HeaderClientProps {
    notifications?:[]
}
const HeaderClient = ({notifications}:HeaderClientProps) => {
    return (
        <header>
            <div className='w-full flex items-center justify-between container mx-auto py-4 px-4 md:px-8'>
                {/* Logo */}
                {/* Menu */}
                {/* Toggle */}
            </div>
        </header>
    )
}

export default HeaderClient