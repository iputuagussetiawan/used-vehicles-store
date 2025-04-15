import CustomBreadcrumb from '@/components/custom-breadcrumb'
import React from 'react'
import FlexBox from '@/components/flex-box'
import Heading from '@/components/heading'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { auth } from '@clerk/nextjs/server'
import AllVehiclesToggleSwitch from '../manage-vehicles/_components/toggle-switch'


const ManageProducts = async() => {
    const authResult = await auth();
    const {userId}=authResult
    const adminId=process.env.NEXT_PUBLIC_ADMIN_ID

  return (
    <div className='flex-col space-y-4 py-4'>
        <CustomBreadcrumb 
            breadcrumbItems={[{label:'Dashboard',link:'/overview'}]}
            breadcrumbPage='Products'
        />
        <FlexBox className='justify-between'>
            <Heading title='Products (0)' description='Easy way to manage your products' />
            
            <div className='flex items-center gap-2'>
                <Link href={'/manage-products/create'} >
                    <Button> 
                        <Plus className='mr-1 h-4 w-4' />
                        Add Products
                    </Button>
                </Link>
            </div>
        </FlexBox>

        <Separator />

        {/* data table */}
    </div>
  )
}

export default ManageProducts