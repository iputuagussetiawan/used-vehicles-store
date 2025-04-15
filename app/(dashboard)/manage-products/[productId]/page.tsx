import { getVehicleById } from '@/actions/get-vehicle-by-id';
import { auth } from '@clerk/nextjs/server';
import { Vehicle } from '@prisma/client';
import { redirect } from 'next/navigation';
import React from 'react';
import { getCategories } from '@/actions/get-categories';
import { getSubCategories } from '@/actions/get-sub-categories';
import ProductsForm from './_components/product-form';

const ManageProducts = async ({ params }: { params: { vehicleId: string } }) => {
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-5 pt-4 '>
                {/* products form */}
                <ProductsForm/>
            </div>
        </div>
    );
};

export default ManageProducts;