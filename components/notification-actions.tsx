"use client"
import { Bell } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

const NotificationActions = () => {
    return (
        <div className='relative'>
            <Button variant={'ghost'} size={'icon'}>
                <Bell/>
            </Button>
        </div>
    )
}

export default NotificationActions