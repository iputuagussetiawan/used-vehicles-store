"use client"

import { auth } from '@clerk/nextjs/server'
import { Category, Favourite, SubCategory, User, Vehicle, View } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {motion} from "framer-motion"
import { useAuth } from '@clerk/nextjs'
import { Card, CardDescription, CardTitle } from './ui/card'
import FlexBox from './flex-box'
import Image from 'next/image'
import { Dot, Eye, FileHeartIcon, Heart, HeartIcon, MapPin } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from 'sonner'
import axios from 'axios'

interface DataPinProps{
    vehicle:Vehicle &{
        category: Category, 
        subCategory: SubCategory,
        owner: User,
        favourites?: Favourite[],
        views?: View[],
        notifications?: Notification[],
    }
}

const DataPin = ({vehicle} : DataPinProps) => {

    console.log(vehicle)

    const {userId}=useAuth()

    const [isMounted,setIsMounted]=useState(false)
    const [isFavourite, setIsFavourite]=useState(
        vehicle.favourites && vehicle.favourites.some((data : any)=>data.userId===userId)
    );
    const [isLoading, setIsLoading]=useState(false)
    const router=useRouter();

    const toggleFavourites=async(event:React.MouseEvent)=>{
        event.stopPropagation();
        if(!userId){
            return toast.error("You must be logged in to favourite a vehicle")
        }
        setIsLoading(true)
        try {
            const response=await axios.patch(`/api/vehicles/${vehicle.id}/favourites`);
            if(response.data.action==="added"){
                setIsFavourite(true);
                toast.success("Added to favourites")
            }else{
                setIsFavourite(false);
                toast.success("Removed from favourites")
            }

            router.refresh();
            
        } catch (error) {
            toast.error("Something went wrong",{
                description:(error as Error).message
            })
        }finally{
            setIsLoading(false)
        }
    }
    const handleNavigation=()=>{
        router.push(`/search/${vehicle.id}`)
    }
    const FavoriteIcon=isFavourite? HeartIcon : Heart

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }
    return (
        <motion.div layout>
            <Card className='overflow-hidden cursor-pointer pt-0 gap-0' onClick={handleNavigation}>
                {/* image */}
                <FlexBox className='relative h-52 overflow-hidden p-0'>
                    <Image
                        src={vehicle.coverImage}
                        alt={vehicle.make}
                        className='w-full h-full object-cover'
                        fill
                    />
                </FlexBox>
                <FlexBox className='px-4 justify-between mt-2 py-2'>
                    <FlexBox className='gap-2'>
                        <CardTitle>{vehicle.make}</CardTitle>
                        <FlexBox className='gap-4'>
                            { vehicle.favourites && vehicle.favourites.length>0 && (
                                <FlexBox className='gap-1'>
                                    <Heart className='w-4 h-4 text-muted-foreground' />
                                    <p className='text-sm text-muted-foreground'>{vehicle.favourites.length.toLocaleString("en-US")}</p>
                                </FlexBox>
                            )}

                            { vehicle.views && vehicle.views.length>0 && (
                                <FlexBox className='gap-1'>
                                    <Eye className='w-4 h-4 text-muted-foreground' />
                                    <p className='text-sm text-muted-foreground'>{vehicle.views.length.toLocaleString("en-US")}</p>
                                </FlexBox>
                            )}
                        </FlexBox>
                    </FlexBox>

                    {/* Mark as pavorite */}
                    <Button 
                        variant={'ghost'}
                        size={'icon'}
                        onClick={toggleFavourites}
                        disabled={isLoading}
                    >
                        <FavoriteIcon className={cn('w-4 h-4', isFavourite ? 'text-red-500' : 'text-muted-foreground')} />
                    </Button>
                </FlexBox>
                <CardDescription className='px-4 -mt-1'>
                    <FlexBox>
                        <p className='capitalize'>
                            {Number(vehicle.mileage).toLocaleString("en-US")} Km
                        </p>
                        <Dot className='w-2 h-2 text-muted-foreground' />
                        <p className='capitalize'>{vehicle.engine}</p>
                        <Dot className='w-2 h-2 text-muted-foreground' />
                        <p className='capitalize'>{vehicle.transmission}</p>
                    </FlexBox>
                </CardDescription>
                <CardDescription className='px-4 my-2'>
                    <FlexBox className='justify-between items-center'>
                        <FlexBox className='gap-2 text-neutral-600 items-center max-w-[75%]'>
                            <Avatar>
                                <AvatarImage src={vehicle?.owner?.profileImage || "https://github.com/shadcn.png" } />
                                <AvatarFallback>{vehicle?.owner?.name}</AvatarFallback>
                            </Avatar>
                            <div className='truncate'>
                                <p className="text-sm font-semibold">{vehicle?.owner?.name || "N/A"}</p>
                                <div className="flex items-center gap-1 text-[12px]">
                                    <MapPin className="w-4 h-4" />
                                    <p className='truncate text-ellipsis overflow-hidden'>
                                        {`${vehicle.location}, ${vehicle.district}, ${vehicle.state},  ${vehicle.postalCode}`}
                                    </p>
                                </div>
                            </div>
                        </FlexBox>

                        <div className='flex items-center text-gray-900'>
                            <p className='text-sm font-semibold'>Rp {vehicle.price.toLocaleString("en-US")}</p>
                            <Dot className='w-2 h-2 text-muted-foreground' />
                        </div>
                    </FlexBox>
                </CardDescription>
            </Card>
        </motion.div>
    )
}

export default DataPin