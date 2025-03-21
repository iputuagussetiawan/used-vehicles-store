"use client"
import { cn } from '@/lib/utils'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { use } from 'react'

const NavbarRoutes = () => {
    const pathname=usePathname()
    const {isSignedIn}=useAuth()

    const routes=[
        {path:'/',label:'Home'},
        {path:'/search',label:'vehicles'},
        {path:'/contact',label:'Contact'},
    ]

    if(isSignedIn){
        routes.push(...[
                {path:'/overview',label:'Overview'}
            ]
        )
    }
    return (
        <nav className='space-x-4 hidden md:flex'>
            {routes.map(({path,label})=>(
                <Link key={path} href={path} passHref className={cn("px-4 py-2 font-medium text-base", pathname===path?'text-blue-500 font-semibold':'text-gray-700 hover:text-blue-500')}>
                    {label}
                </Link>
            ))}
        </nav>
    )
}

export default NavbarRoutes