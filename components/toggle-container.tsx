"use client"

import { useAuth, UserButton } from "@clerk/nextjs"

interface ToggleContainerProps {
    notifications?:[]
}

const ToggleContainer = ({notifications}:ToggleContainerProps) => {
    const {isSignedIn}=useAuth()
    return (
        <div className="flex items-center gap-4">
            {isSignedIn?<div className="flex items-center gap-2">
                {/* notification actions*/}
                <UserButton/>
            </div>:<></>}
            <div></div>
        </div>
    )
}

export default ToggleContainer