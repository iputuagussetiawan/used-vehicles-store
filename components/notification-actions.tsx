"use client"
import { Bell, CheckCircle, Trash2 } from 'lucide-react'
import React, { use, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Notification } from '@prisma/client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
import TooltipButton from './ui/tooltip-button'
import { cn } from '@/lib/utils'
import { set } from 'date-fns'
import { toast } from 'sonner'
import axios from 'axios'

interface NotificationActionsProps {    
    notifications?:Notification[]
}

const NotificationActions = ({notifications}:NotificationActionsProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(false);

    const router=useRouter();
    const unreadNotifications=notifications?.filter((notification) => !notification.isRead)
    const readNotifications=notifications?.filter((notification) => notification.isRead)
    useEffect(() => {
        setIsMounted(true);
    }, [])

    const markAllAsRead = async () => {
        setLoading(true);
        try {
            await axios.patch('/api/notifications/read');
            router.refresh();
            toast.success("All notifications marked as read");  
        } catch (error) {
            toast.error("Something went wrong", {
                description: (error as Error).message,
            })
        }finally{
            setLoading(false);
        }
    }

    const deleteAllAsNotifications = async () => {
        setLoading(true);
        try {
            await axios.delete('/api/notifications/delete');
            router.refresh();
            toast.success("All notifications deleted");  
        } catch (error) {
            toast.error("Something went wrong", {
                description: (error as Error).message,
            })
        }finally{
            setLoading(false);
        }
    }
    if(!isMounted){
        return null
    }
    return (
        <div className='relative'>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant={'ghost'} size={'icon'}>
                        <Bell/>
                        {unreadNotifications && unreadNotifications?.length>0 && (

                            <span className='absolute top-0 right-0 rounded-full bg-red-600 text-white w-4 h-4 text-xs flex items-center justify-center'>
                                {unreadNotifications?.length}
                            </span>
                        )
                        }
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' side='bottom' sideOffset={10} className='min-w-64 max-w-xs md:max-w-xl max-h-96 overflow-y-auto'>
                    <DropdownMenuLabel className='flex items-center justify-between'>
                        Notification
                        <div className="flex items-center space-x-1">
                            <TooltipButton
                                tooltipContent='Mark all as read'
                                icon={<CheckCircle className='w-4 h-4'/>}
                                onClick={markAllAsRead}
                                buttonVariant={'ghost'}
                                buttonClassName='text-neutral-500'
                                disabled={!notifications || notifications?.length===0}
                            />
                            <TooltipButton
                                tooltipContent='Mark all notifications'
                                icon={<Trash2 className='w-4 h-4'/>}
                                onClick={deleteAllAsNotifications}
                                buttonVariant={'ghost'}
                                buttonClassName='text-red-500'
                                disabled={!notifications || notifications?.length===0}
                            />
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {unreadNotifications && unreadNotifications?.length>0 &&  (
                        <React.Fragment>
                            <DropdownMenuLabel>Unread</DropdownMenuLabel>
                            {unreadNotifications.map((notification) => (
                                <DropdownMenuItem key={notification.id} className={cn("bg-gray-100 flex flex-col items-start")}>
                                    
                                    <span>{notification.message}</span>
                                    <span className='text-xs text-gray-500'>
                                        {
                                            new Date(notification.createdAt).toLocaleString("en-US",{
                                                dateStyle:"short",
                                                timeStyle:"short"
                                            })
                                        }
                                    </span>
                                </DropdownMenuItem>
                            ))}
                        </React.Fragment>
                    )}

                    {readNotifications && readNotifications?.length>0 &&  (
                        <React.Fragment>
                            <DropdownMenuLabel>Read</DropdownMenuLabel>
                            {readNotifications.map((notification) => (
                                <DropdownMenuItem key={notification.id} className={cn("bg-white-100 flex flex-col items-start")}>
                                    <span>{notification.message}</span>
                                    <span className='text-xs text-gray-500'>
                                        {
                                            new Date(notification.createdAt).toLocaleString("en-US",{
                                                dateStyle:"short",
                                                timeStyle:"short"
                                            })
                                        }
                                    </span>
                                </DropdownMenuItem>
                            ))}
                        </React.Fragment>
                    )}

                    {!notifications || notifications?.length===0 && (
                        <DropdownMenuItem>
                            No notifications
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default NotificationActions