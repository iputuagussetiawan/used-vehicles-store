"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


export const DashboardRoutes = () => {
    const pathname = usePathname()
    const routes = [
        {path:'/overview',label:'Overviewme'},
        {path:'/manage-vehicles',label:'Vehicles'},
        {path:'/contacts',label:'Contacts'},
    ]
    return (
        <div className='w-full overflow-x-auto scrollbar-none'>
            <nav className='flex md:justify-center space-x-4 md:space-x-6 py-4'>
                {routes.map(({path,label})=>(
                    <Link key={path} href={path} className={cn("px-4 py-2 rounded-lg font-medium text-base transition-all duration-300 ease-in-out", pathname===path?'bg-blue-500 text-white shadow-lg font-semibold':'bg-neutral-200 text-gray-700 hover:bg-blue-500 hover:text-white')} >
                        {label}
                    </Link>
                ))}
            </nav>
        </div>
    )
}
