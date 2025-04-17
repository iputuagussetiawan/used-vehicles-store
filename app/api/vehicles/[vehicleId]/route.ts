import { db } from "@/lib/db";
import { deleteImagesFromFirebase, deleteMultipleImagesFromFirebase } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { array } from "zod";

export const PATCH=async(req:Request,{params}:{params:{vehicleId:string}})=>{
    try {
        const authResult = await auth();
        const {userId}=authResult
        if(!userId){
            return new NextResponse("Unauthorized", {status:401})
        }
        const body=await req.json()
        const {coverImage, images, ...vehicleData}=body
        const vehicle=await db.vehicle.findUnique({
            where:{id:params.vehicleId}
        })
        if(!vehicle){
            return new NextResponse("Vehicle not found", {status:404})
        }
        if(vehicle.ownerId!==userId){
            return new NextResponse("Unauthorized", {status:403})
        }
        if(coverImage){
            vehicleData.coverImage=coverImage
        }
        if(images){
            vehicleData.images=JSON.stringify(images)
        }
        const updatedVehicle=await db.vehicle.update({
            where:{id:params.vehicleId},
            data:vehicleData
        })

        return NextResponse.json(
            {success:true,data:updatedVehicle},
            {status:200}
        );
    
    } catch (error) {
        console.log(error)
        return new NextResponse("Something went wrong", {status:500})
    }
}

export const DELETE=async(req:Request,{params}:{params:{vehicleId:string}})=>{
    try {
        const authResult = await auth();
        const {userId}=authResult
        if(!userId){
            return new NextResponse("Unauthorized", {status:401})
        }
        const vehicle=await db.vehicle.findUnique({
            where:{id:params.vehicleId}
        })
        if(!vehicle){
            return new NextResponse("Vehicle not found", {status:404})
        }
        if(vehicle.ownerId!==userId){
            return new NextResponse("Unauthorized", {status:403})
        }

        if(vehicle.coverImage){
            await deleteImagesFromFirebase(vehicle.coverImage);
        }
      
        const imageArray=JSON.parse(vehicle.images)
        if(Array.isArray(imageArray) && imageArray.length>0){
            await deleteMultipleImagesFromFirebase(imageArray);
        }
        const deletedVehicle=await db.vehicle.delete({
            where:{id:params.vehicleId}
        })
        return NextResponse.json(
            {success:true,data:deletedVehicle},
            {status:200}
        );
    } catch (error) {
        console.log("Error On Deleting Vehicle",error)
        return new NextResponse(`Failed to delete vehicle: ${(error as Error)?.message}`, {status:500})
    }
}