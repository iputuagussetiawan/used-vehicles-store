import { getVehicleById } from '@/actions/get-vehicle-by-id';
import { auth } from '@clerk/nextjs/server';
import { Vehicle } from '@prisma/client';
import { redirect } from 'next/navigation';
import React from 'react';
import VehicleForm from './_components/vehicle-form';
import { getCategories } from '@/actions/get-categories';
import { getSubCategories } from '@/actions/get-sub-categories';

const ManageVehicle = async ({ params }: { params: { vehicleId: string } }) => {
    const {vehicleId} = await params;
    const authResult = await auth();
    const {userId}=authResult
    if(!userId){
        redirect("/sign-in")
    }

    let vehicle: null | Vehicle=null
    const validObjectRegex=/^[0-9a-fA-F]{24}$/;
    if(validObjectRegex.test(vehicleId)){
        const vehicle=await getVehicleById(vehicleId);
    }

    const categories=await getCategories();
    const subCategories=await getSubCategories();

    // const vehicle=await getVehicleById(vehicleId);
    // console.log(vehicle);
    // console.log(categories);
    // console.log(subCategories);
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-5 pt-4 '>
                {/* vehicle form */}
                <VehicleForm initialData={vehicle} categories={categories} subCategories={subCategories} />
            </div>
        </div>
    );
};

export default ManageVehicle;