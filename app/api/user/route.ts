import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const POST=async(req:Request)=>{
    try {
        const {id, email, name, profileImage}=await req.json()
        console.log(id,email,name,profileImage)
        const existingUser=await db.user.findUnique({
            where:{clerkId:id}
        })
        if(!existingUser){
            //create new user
            const newUser=await db.user.create({
                data:{clerkId:id, email, name, profileImage}
            })
            return NextResponse.json({
                success:true,
                message:"User created successfully",
                user:newUser
            }, {status:200})
        }
        return NextResponse.json({
            success:true,
            message:"User already exists",
            user:existingUser
        }, {status:200})
    } catch (error) {
        console.log(`Error retrieving user:`, error)
        return NextResponse.json({
            success:false,
            message:"Error retrieving user",
        }, {status:500})
    }
}