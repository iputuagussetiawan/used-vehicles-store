"use client";

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useRouter, useSearchParams } from 'next/navigation';

import React from 'react'

interface AllVehiclesToggleSwitchProps {
    isVehicles?: boolean
}

const AllVehiclesToggleSwitch = ({isVehicles=true}: AllVehiclesToggleSwitchProps) => {
    const router=useRouter();
    const searchParams=useSearchParams();
    const entity=isVehicles?"vehicles":"blogs";
    const allEntities=searchParams.get(`all${isVehicles?"vehicles":"blogs"}`)==="true";
    const handleToggle = () => {
        const newAllEntities = allEntities ? "false" : "true";
        router.push(`/manage-${entity}?all${isVehicles?"vehicles":"blogs"}=${newAllEntities}`);
    }
    return (
        <div className='flex items-center space-x-2'>
            <Switch 
                className='cursor-pointer'
                id={`all-${entity}`} 
                onCheckedChange={handleToggle}  
                checked={allEntities}
            />
            <Label htmlFor={`all-${entity}`} >{allEntities?`All ${isVehicles?"Vehicles":"Blogs"}`:`My ${isVehicles?"Vehicles":"Blogs"}`}</Label>
        </div>
    )
}

export default AllVehiclesToggleSwitch