import { getApproveVehicles } from '@/actions/get-approved-vehicles';
import { getVehicleById } from '@/actions/get-vehicle-by-id';
import CustomBreadcrumb from '@/components/custom-breadcrumb';
import NoDataFound from '@/components/no-data-found';
import { Category, Favourite, SubCategory, User, Vehicle, View } from '@prisma/client';
import { get } from 'http';
import React from 'react'
import PageClient from './_components/client';

const VehicleDetailPage = async ({params}:{params:{vehicleId:string}}) => {
    let vehicle: null | (Vehicle & {
        category: Category;
        subCategory: SubCategory;
        owner: User;
        views: View[];
        favourites: Favourite[];
    })=null
    const validObjectRegex=/^[0-9a-fA-F]{24}$/;
    if(validObjectRegex.test(params.vehicleId)){
        vehicle= await getVehicleById(params.vehicleId);
    }

    const vehicles=await getApproveVehicles({});

    if(!vehicle){
        return <NoDataFound/>
    }

    console.log(vehicle)
    return (
        <div className='flex-col space-y-12 my-12'>
            <CustomBreadcrumb 
                breadcrumbItems={[{label:"Vehicles", link:"/search"}]}  
                breadcrumbPage={`${vehicle.make} (${vehicle.model})`}
            />
            <PageClient data={vehicle}/>
        </div>
    )
}

export default VehicleDetailPage