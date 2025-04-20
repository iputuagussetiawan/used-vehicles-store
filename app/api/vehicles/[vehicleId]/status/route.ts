import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"

export const PATCH= async(req:Request,{params}:{params:{vehicleId:string}})=>{
    try {
        const authResult = await auth();
        const {userId}=authResult;

        if(userId !==process.env.NEXT_PUBLIC_ADMIN_ID){
            return new NextResponse("Unauthorized", {status:401})
        }

        const {status}=await req.json();
        if(!["pending","approved","rejected"].includes(status)){
            return new NextResponse("Invalid Status", {status:400})
        }
        const vehicle=await db.vehicle.findUnique({
            where:{id:params.vehicleId}
        })

        if(!vehicle){
            return new NextResponse("Vehicle not found", {status:404})
        }

        const updateVehicle=await db.vehicle.update({
            where:{id:params.vehicleId},
            data:{status}   
        })

        await db.notification.create({
            data:{
                message:`Your vehicle  ${vehicle.make} ${vehicle.model} status has been updated to ${status}`,
                userId:vehicle.ownerId,
                vehicleId:vehicle.id,
                type:"vehicle",
                status:status,
                isRead:false
            }
        })
        return NextResponse.json(
            {success:true,data:updateVehicle},
            {status:200}
        );
    } catch (error) {
        console.error("Error updateing vehicle status:",error)  
        return new NextResponse("Failed To Update vehicle Status", {status:500})
    }
}