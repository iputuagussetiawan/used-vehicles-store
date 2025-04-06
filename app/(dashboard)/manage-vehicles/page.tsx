import CustomBreadcrumb from '@/components/custom-breadcrumb'
import React from 'react'
import FlexBox from '@/components/flex-box'
import Heading from '@/components/heading'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { auth } from '@clerk/nextjs/server'
import AllVehiclesToggleSwitch from './_components/toggle-switch'

const ManageVehicles = async() => {
    const authResult = await auth();
    const {userId}=authResult
    const adminId=process.env.NEXT_PUBLIC_ADMIN_ID

  return (
    <div className='flex-col space-y-4 py-4'>
        <CustomBreadcrumb 
            breadcrumbItems={[{label:'Dashboard',link:'/overview'}]}
            breadcrumbPage='Vehicles'
        />
        <FlexBox className='justify-between'>
            <Heading title='Vehicles (0)' description='Easy way to manage your vehicles' />
            
            <div className='flex items-center gap-2'>
                {userId === adminId && (
                    <AllVehiclesToggleSwitch />
                )}
                <Link href={'/manage-vehicles/create'} >
                    <Button> 
                        <Plus className='mr-1 h-4 w-4' />
                        Add Vehicle
                    </Button>
                </Link>
            </div>
        </FlexBox>

        <Separator />

        {/* data table */}
    </div>
  )
}

export default ManageVehicles