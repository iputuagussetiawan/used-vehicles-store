"use client"

import { Category, SubCategory, Vehicle } from '@prisma/client'
import React from 'react'
import { useForm } from 'react-hook-form';
import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
interface VehicleFormProps {
    initialData:Vehicle | null;
    categories:Category[] | null;
    subCategories:SubCategory[] | null
}

const formSchema= z.object({
    make : z.string().min(1, {message:"Make is required"}),
    model: z.string().min(1, {message:"Model is required"}),
    year:z.number().int({message:"Year must be a number"}).min(1900,{message:"Year must be at least 1900"}).max(new Date().getFullYear(),{message:`Year must be at most ${new Date().getFullYear()}`}).nullable(),
    price:z.number().min(0,{message:"Price must be at least 0"}).max(10000000000,{message:"Price must be at most 10000000000"}).nullable(),
    categoryId:z.string().min(1,{message:"Category is required"}),
    subCategoryId:z.string().min(1,{message:"Sub-category is required"}),
    coverImage:z.string().url({message:"Must Be a valid URL"}),
    images:z.array(z.string().url({message:"Each image Must Be a valid URL"})).nonempty({message:"At least one image is required"}),

    report : z.string().min(1, {message:"Report is required"}),
    location : z.string().min(1, {message:"Location is required"}),
    state : z.string().min(1, {message:"State is required"}),
    district : z.string().min(1, {message:"district is required"}),
    postalCode : z.string().min(1, {message:"postalCode is required"}),
    mileage : z.string().min(1, {message:"mileage is required"}),
    engine : z.string().min(1, {message:"engine is required"}),
    transmission : z.string().min(1, {message:"transmission is required"}),

})
const VehicleForm = ({initialData, categories, subCategories}: VehicleFormProps) => {
    const form =useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:initialData ?{
            ...initialData,
            images:initialData.images ? JSON.parse(initialData.images) : [],
            report:initialData.report || "low-mileage",
        }:{
            make: "",
            model: "",
            year: new Date().getFullYear(),
            price: 0,
            categoryId: "",
            subCategoryId: "",
            coverImage: "",
            images: [],
            location: "",
            state: "",
            district: "",
            postalCode: "",
            engine: "",
            transmission: "",
            mileage: "",
            report: "low-mileage",
        }
    })

    const obSubmit=async(data:z.infer<typeof formSchema>)=>{
        console.log(data)
    }

    const reportOptions=[
        {value:"low-mileage",label:"Low Mileage"},
        {value:"no-accidents",label:"No Accidents"},
        {value:"single-owner",label:"Single Owner"},
    ]

    const {isSubmitting, isValid}=form.formState
    const params=useParams()
    const router=useRouter()
    const {userId}= useAuth()

    const title=initialData ? "Edit Vehicle Information" : "Add New Vehicle"
    const description=initialData ? "Update your vehicle information and preferences" : "Create a new vehicle and start selling it online"

    const toastMessage=initialData ? "Vehicle updated successfully" : "Vehicle created successfully"

    const action=initialData ? "Save Changes" : "Create Vehicle"
    return (
        
        <div>VehicleForm</div>
    )
}

export default VehicleForm