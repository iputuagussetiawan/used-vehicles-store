import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export const POST=async(req:Request)=>{
    try {
        const authResult = await auth();
        const {userId}=authResult
        if(!userId){
            return new NextResponse("Unauthorized", {status:401})
        }

        const body=await req.json()

        const {
            make,
            model,
            year,
            price,
            // categoryId: "",
            // subCategoryId: "",
            coverImage,
            images,
            location,
            state,
            district,
            postalCode,
            // engine: "",
            // transmission: "",
            mileage,
            report,
        }=body;

        if(
            !make||
            !model||
            !year||
            !price||
            // categoryId: "",
            // subCategoryId: "",
            !coverImage||
            !images||
            !location||
            !state||
            !district||
            !postalCode||
            // engine: "",
            // transmission: "",
            !mileage||
            !report
        ){
            return new NextResponse("Missing required fields", {status:400})
        }

        const serializedImages=JSON.stringify(images)
        const newVehicle=await db.vehicle.create({
            data:{
                make,
                model,
                year,
                price,
                categoryId: "",
                subCategoryId: "",
                coverImage,
                images:serializedImages,
                ownerId:userId,
                location,
                state,
                district,
                postalCode,
                engine: "",
                transmission: "",
                mileage,
                report:report || "low-mileage",
            },
        });

        const user =await db.user.findUnique({
            where:{clerkId:userId},
        })

        await db.notification.create({
            data:{
                message:`New vehicle ${make}  ${model} created`,
                vehicleId:newVehicle.id,
                userId:user?.id || "",
                type:"vehicle",
                status:"pending",
            }
        })
        await db.notification.create({
            data:{
                message:`New vehicle ${make}  ${model} has submitted for review by user ${user}`,
                userId:process.env.NEXT_PUBLIC_ADMIN_ID || "",
                vehicleId:newVehicle.id,
                type:"vehicle",
                status:"pending",
            }
        })

        return new NextResponse("Vehicle created successfully", {status:200})
    } catch (error) {
        console.log(`Error creating vehicle:`,error)
        return new NextResponse("Error creating vehicle", {status:500})
    }
}