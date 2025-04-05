"use client";

import { useAuth, useUser } from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { toast } from 'sonner';
import axios from "axios";
import { profile } from 'console';

const AuthHandler = () => {
    const {isSignedIn} = useAuth();
    const {user}=useUser();
    const router=useRouter();
    const pathname=usePathname();
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        const storeUserData = async () => {
            if(isSignedIn && user){
                try {
                    const response=await axios.post("/api/user",{
                        id:user.id,
                        email:user.primaryEmailAddress?.emailAddress,
                        name:user.fullName || user.firstName || "Anonymous",
                        profileImage:user.imageUrl,
                    })
                    if(response.data.success){
                        router.push(pathname)
                    }else{
                        console.log("Failed to store user data:",response.data.message);
                        toast.error("Failed",{description:`Failed to store user data: ${response.data.message}`});
                    }
                } catch (error) {
                    console.log(`Failed to store user data:`,error);
                    toast.error("Failed",{description:`Failed to store user data`});
                }finally{
                    setLoading(false);
                }
            }else{
                setLoading(false);
            }
        }
        storeUserData()
    }, [pathname, isSignedIn, router,user]);

    if(loading){
        return(
            <div className='w-full h-full fixed z-50 bg-white top-0 left-0 flex justify-center items-center'>
                <Loader className='w-10 h-10 animate-spin text-blue-500'/>
            </div>
        )
    }
    return null
}

export default AuthHandler
