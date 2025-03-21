import React from 'react'
import HeaderClient from './header-client'
import { auth } from '@clerk/nextjs/server'

const Header = async () => {
    const { userId } = await auth()
    console.log(userId)
    if (userId) {
        //pull notifications from the database
        return <HeaderClient notifications={[]} />
    }

    return <HeaderClient />
}

export default Header