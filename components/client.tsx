"use client"

import { Category, Favourite, SubCategory, User, Vehicle, View } from '@prisma/client'
import React from 'react'
import NoDataFound from './no-data-found';
import {AnimatePresence, motion} from "framer-motion"
import { fadeInOut } from '@/animations';
import DataPin from './data-pin';

interface MainClientProps {
    data:(Vehicle | [] & { 
        category: Category, 
        subCategory: SubCategory,
        owner: User,
        favourites?: Favourite[],
        views?: View[],
        notifications?: Notification[],
    })[];
}

const MainClient = ({data}:MainClientProps) => {
    if(data.length===0){
        return <NoDataFound/>
    }
    console.log(data)
    return (
        <AnimatePresence>
            <motion.div layout {...fadeInOut} className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {data && data.map((item)=>(

                    <DataPin vehicle={item}/>
                ))}
                
            </motion.div>
        </AnimatePresence>
    )
}

export default MainClient