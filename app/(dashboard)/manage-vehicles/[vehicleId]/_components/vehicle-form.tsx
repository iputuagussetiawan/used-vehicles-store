"use client"

import { Category, SubCategory, Vehicle } from '@prisma/client'
import React, { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import FlexBox from '@/components/flex-box';
import CustomBreadcrumb from '@/components/custom-breadcrumb';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Loader2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { set } from 'date-fns';
import { Combo } from 'next/font/google';
import ComboBox from '@/components/combo-box';
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

    //transform the categories
    const formattedCategories=categories?.map((category :{slug:string,name:string, id:string})=>({
        value:category.slug,
        label:category.name,
        id:category.id
    }))||[];

    //transform the subCategories
    const formattedSubCategories=subCategories?.map((subCategory :{slug:string,name:string, id:string})=>({
        value:subCategory.slug,
        label:subCategory.name,
        id:subCategory.id
    }))||[];

    const {isSubmitting, isValid}=form.formState
    const params=useParams()
    const router=useRouter()
    const {userId}= useAuth()

    const [loadingButton, setLoadingButton]=useState<string | null>(null)
    const [isMounted, setIsMounted] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState<Date | null>(null);




    const title=initialData ? "Edit Vehicle Information" : "Add New Vehicle"
    const description=initialData ? "Update your vehicle information and preferences" : "Create a new vehicle and start selling it online"

    const toastMessage=initialData ? "Vehicle updated successfully" : "Vehicle created successfully"

    const action=initialData ? "Save Changes" : "Create Vehicle"
    useEffect(() => {
        setIsMounted(true);
    },[]);

    if(!isMounted){
        return null
    }
    return (
        
        <React.Fragment>
            
                <CustomBreadcrumb 
                    breadcrumbPage={title} 
                    breadcrumbItems={[{label:'Vehicles',link:'/manage-vehicles'}]}
                />
                <FlexBox className='justify-between w-full'>
                    <Heading title={title} description={description} />
                    {initialData && (
                        <FlexBox className='justify-center gap-2'>
                            <Button className='cursor-pointer' size={"icon"} variant={"destructive"}>
                                <Trash2 className='h-4 w-4' />
                            </Button>
                            {/* admin action button */}
                            {userId === process.env.NEXT_PUBLIC_ADMIN_ID && (
                                <FlexBox className='justify-center gap-2'>
                                    <Button size={"sm"} variant={"outline"} className={cn(" cursor-pointer  text-gray-900 border-gray-900", initialData?.status==="pending" && "bg-gray-100 shadow-lg shadow-gray-100")}>
                                        {loadingButton === "pending" ? 
                                            <Loader2 className='h-4 w-4 animate-spin text-gray-900' /> : "Pending"
                                        }
                                    </Button>
                                    <Button size={"sm"} variant={"outline"} className={cn(" cursor-pointer  text-green-900 border-green-400", initialData?.status==="pending" && "bg-gray-100 shadow-lg shadow-gray-100")}>
                                        {loadingButton === "pending" ? 
                                            <Loader2 className='h-4 w-4 animate-spin text-gray-900' /> : "Approve"
                                        }
                                    </Button>
                                    <Button size={"sm"} variant={"outline"} className={cn(" cursor-pointer  text-red-900 border-red-400", initialData?.status==="pending" && "bg-gray-100 shadow-lg shadow-gray-100")}>
                                        {loadingButton === "pending" ? 
                                            <Loader2 className='h-4 w-4 animate-spin text-gray-900' /> : "Reject"
                                        }
                                    </Button>
                                </FlexBox>
                            )}
                        </FlexBox>
                    )}
                </FlexBox>

                <Separator className='my-4' />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(obSubmit)} className='space-y-8 w-full p-4 py-6 bg-neutral-50/60 rounded-lg'>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                            <FormField 
                                control={form.control}
                                name="make"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Make Name</FormLabel>
                                        <FormControl>
                                            <Input  
                                                disabled={isSubmitting}
                                                placeholder='Vehicle make name here..'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="model"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Model Name</FormLabel>
                                        <FormControl>
                                            <Input  
                                                disabled={isSubmitting}
                                                placeholder='Vehicle model here..'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField 
                                control={form.control}
                                name="year"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Year</FormLabel>
                                        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                                            <PopoverTrigger asChild>
                                                <Button variant={"outline"} className="w-full justify-between">
                                                    {selectedYear? selectedYear.getFullYear() : "Select Year"}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={selectedYear ?? undefined}
                                                    onSelect={(date)=>{
                                                        setSelectedYear(date || null)
                                                        field.onChange(date ? date.getFullYear() : null)
                                                        setPopoverOpen(false)
                                                    }}
                                                    initialFocus
                                                    disabled={(date: Date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField 
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="number" 
                                                disabled={isSubmitting}
                                                placeholder="Vehicle price here.."
                                                {...field}
                                                value={field.value ?? ''} // Ensure value is never `null`
                                                onChange={(e) => {
                                                    const value = e.target.value;

                                                    // Handle empty string or numeric values
                                                    if (value === '' || !isNaN(Number(value))) {
                                                    field.onChange(value === '' ? '' : Number(value));
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='categoryId'
                                render={({ field }) => (
                                    <FormItem className='flex-col flex space-y-4'>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <ComboBox
                                                items={formattedCategories} 
                                                placeholder='Select a category' 
                                                onSelect={(slug)=>{
                                                    const selectedCategory = formattedCategories.find((category) => category.value === slug)
                                                    field.onChange(selectedCategory?.id ?? null)
                                                }} 
                                                selectedValue={formattedCategories.find((category) => category.id === field.value)?.value ?? ''}
                                            ></ComboBox>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='subCategoryId'
                                render={({ field }) => (
                                    <FormItem className='flex-col flex space-y-4'>
                                        <FormLabel>Sub Category</FormLabel>
                                        <FormControl>
                                            <ComboBox
                                                items={formattedSubCategories} 
                                                placeholder='Select a sub-category' 
                                                onSelect={(slug)=>{
                                                    const selectedSubCategory = formattedSubCategories.find((subcategory) => subcategory.value === slug)
                                                    field.onChange(selectedSubCategory?.id ?? null)
                                                }} 
                                                selectedValue={formattedSubCategories.find((subcategory) => subcategory.id === field.value)?.value ?? ''}
                                            ></ComboBox>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            
                           

                        </div>
                    </form>
                </Form>
         
        </React.Fragment>
    )
}

export default VehicleForm