import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const DELETE= async (req:Request) => {
    try {
        const authResult = await auth();
        const {userId}=authResult
        if(!userId){
            return new NextResponse("Unauthorized", {status:401})
        }

        await db.notification.deleteMany({
            where:{userId}
        })

        return new NextResponse("Notification deleted successfully", {status:200})  

    } catch (error) {
        console.error(`Error deleting notification:`, error);
        return new NextResponse("Error deleting notification", {status:500})
    }
};