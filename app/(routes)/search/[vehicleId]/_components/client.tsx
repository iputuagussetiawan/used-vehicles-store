"use client";

import { Category, Favourite, SubCategory, User, Vehicle, View } from '@prisma/client';
import React from 'react'
import Gallery from './gallery/gallery';
import Info from './info';

interface PageClientProps {
    data:(Vehicle & { 
        category: Category; 
        subCategory: SubCategory,
        owner: User,
        favourites?: Favourite[],
        views?: View[],
        notifications?: Notification[],
    }) | null
}

const PageClient = ({data} : PageClientProps) => {
    return (
        <div className='lg:grid grid-cols-3 lg:gap-x-8'>
            {/* Gallery */}
            <div className='lg:col-span-2 space-y-8'>
                {/* Gallery */}
                <Gallery images={data?.images ? JSON.parse(data?.images) : []}/>

                {/* Other Info */}
              
            </div>
            {/* info */}
            <Info data={data}/>

        </div>
    )
}

export default PageClient