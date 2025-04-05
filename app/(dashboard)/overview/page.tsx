import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const OverviewPage = async () => {
    const authResult = await auth();
    const {userId}=authResult
    if(!userId){
        redirect("/sign-in")
    }
    return (
        <div>This Is Dahsboard Overview</div>
    )
}

export default OverviewPage