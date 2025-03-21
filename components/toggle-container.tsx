"use client"

import { useAuth, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "./ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { LayoutDashboard } from "lucide-react"
import MobileNavbar from "./mobile-navbar"
import NotificationActions from "./notification-actions"


interface ToggleContainerProps {
    notifications?:[]
}

const ToggleContainer = ({notifications}:ToggleContainerProps) => {
    const {isSignedIn}=useAuth()
    return (
        <div className="flex items-center gap-4">
            {isSignedIn?<div className="flex items-center gap-2">
                {/* notification actions*/}
                <NotificationActions/>
                <UserButton/>
            </div>:<div className="flex items-center gap-4">
                <Link href={"/sign-in"}>
                    <Button className="px-4 py-2 transition cursor-pointer">Sign In</Button>
                </Link>
                <Link href={"/sign-in"}>
                    <Button className="px-4 py-2  transition cursor-pointer" variant={"secondary"}>Sign Up</Button>
                </Link>
            </div>
            }
            <Sheet>
                <SheetTrigger className="md:hidden pr-4 cursor-pointer">
                    <LayoutDashboard/>
                </SheetTrigger>
                <SheetContent>
                    <MobileNavbar/>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default ToggleContainer