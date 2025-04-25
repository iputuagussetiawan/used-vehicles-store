import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"

export const PATCH=async(req:Request, {params}:{params:{vehicleId:string}})=>{
    try {
        const authResult = await auth();
        const {userId}=authResult
        if(!userId){
            return new NextResponse("Unauthorized", {status:401})
        }
        const {vehicleId}=params;

        const vehicle=await db.vehicle.findUnique({
            where:{id:vehicleId}
        })

        if(!vehicle){
            return NextResponse.json({
                msg:"Vehicle not found",
            },
            {status:404}
            )
        }
        const existingFavorite=await db.favourite.findFirst({
            where:{vehicleId,userId}
        })

        if(existingFavorite){
            await db.favourite.delete({
                where:{id:existingFavorite.id}
            })
            return NextResponse.json({
                success:true,
                message:"Vehicle removed from favorites",
                action:"removed"
            })
        }else{
            await db.favourite.create({
                data:{vehicleId,userId}
            })

            return NextResponse.json({
                success:true,
                message:"Vehicle added to favorites",
                action:"added"
            })
        }
    } catch (error) {
        return NextResponse.json(
            {
                error:"Failed to toggle favorites",
                details:(error as Error).message
            }, {status:500})
    }
}