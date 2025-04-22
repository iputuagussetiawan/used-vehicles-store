import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH=async(req:Request)=>{
    try {
        const authResult = await auth();
        const {userId}=authResult

        if(!userId){
            return new NextResponse("Unauthorized", {status:401})
        }

        const updatedNotifications=await db.notification.updateMany({
            where:{
                userId,
                isRead:false},
            data:{
                isRead:true
            }
            
        })

        return  NextResponse.json(
            {
                success:true,
                data:updatedNotifications
            }, 
            {status:200}
        )
    } catch (error) {
        console.error(`Error reading notification:`, error);
        return new NextResponse("Error reading notification", {status:500})

    }
}