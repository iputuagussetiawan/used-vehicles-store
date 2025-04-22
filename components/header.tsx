import React from 'react'
import HeaderClient from './header-client'
import { auth } from '@clerk/nextjs/server'
import { getNotificationByUserID } from '@/actions/get-notification-by-user-id'

const Header = async () => {
    const { userId } = await auth()
    console.log(userId)
    if (userId) {
        //pull notifications from the database
        const notifications = await getNotificationByUserID(userId)
        console.log(notifications);
        return <HeaderClient notifications={notifications} />
    }

    return <HeaderClient />
}

export default Header