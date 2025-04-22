"use client"

import React from 'react'
import LogoContainer from './logo-container'
import NavbarRoutes from './navbar-routes'
import ToggleContainer from './toggle-container'
import { Notification } from '@prisma/client'

interface HeaderClientProps {
    notifications?:Notification[]
}
const HeaderClient = ({notifications}:HeaderClientProps) => {
    return (
        <header>
            <div className='w-full flex items-center justify-between container mx-auto py-4 px-4 md:px-8'>
                {/* Logo */}
                <LogoContainer/>
                {/* Menu */}
                <NavbarRoutes/>
                {/* Toggle */}
                <ToggleContainer notifications={notifications}/>
            </div>
        </header>
    )
}

export default HeaderClient