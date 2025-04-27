"use client";

import FlexBox from '@/components/flex-box';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Category, Favourite, SubCategory, User, Vehicle, View } from '@prisma/client';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { Dot, Eye, Gem, Heart, InfoIcon, MapPin } from 'lucide-react';
import React, { useEffect, useState } from 'react'
interface InfoProps {
    data:(Vehicle & { 
        category: Category; 
        subCategory: SubCategory,
        owner: User,
        favourites?: Favourite[],
        views?: View[],
        notifications?: Notification[],
    }) | null
}
const Info = ({data}:InfoProps) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, [])

    if(!isMounted) return null
    return (
        <div className='col-span-1 space-y-4'>
            <Card className='shadow-none rounded-md py-3 px-4 sticky top-24 gap-2'>
                <FlexBox className='justify-between'>
                    <CardTitle>{data?.category?.name}</CardTitle>
                    <FlexBox className='gap-2'>
                        {data?.favourites && data?.favourites?.length >0 && (
                            <FlexBox className='gap-1'>
                                <Heart className='w-4 h-4 text-muted-foreground '/>
                                <span className='text-base text-muted-foreground'>
                                    {data?.favourites?.length.toLocaleString("en-US")}
                                </span>
                            </FlexBox>
                        )}

                        {data?.views && data?.views?.length >0 && (
                            <FlexBox className='gap-1'>
                                <Eye className='w-4 h-4 text-muted-foreground '/>
                                <span className='text-base text-muted-foreground'>
                                    {data?.views?.length.toLocaleString("en-US")}
                                </span>
                            </FlexBox>
                        )}
                    </FlexBox>
                </FlexBox>

                {/* detail section */}
                <CardDescription>
                    <FlexBox>
                        <p className='capitalize'>{Number(data?.mileage).toLocaleString("en-US")} KM</p> 
                        <Dot className='w-4 h-4 text-muted-foreground '/>
                        <p className='capitalize'>{data?.engine}</p>
                        <Dot className='w-4 h-4 text-muted-foreground '/>
                        <p className='capitalize'>{data?.transmission}</p>
                    </FlexBox>

                </CardDescription>

                <CardDescription>
                    <FlexBox className='gap-2 my-3'>
                        <MapPin className='w-4 h-4 text-muted-foreground '/>
                        <p className='text-muted-foreground'>{`${data?.location}, ${data?.state}, ${data?.postalCode}`}</p>
                    </FlexBox>
                </CardDescription>
                <FlexBox>
                    <div className="h-[1px] flex-1 bg-neutral-200"></div>
                    <Badge className='bg-black'>
                        <Gem className='w-4 h-4 text-muted-foreground mr-2 '/>
                        Budget
                    </Badge>
                </FlexBox>

                <FlexBox className='justify-between mt-6 '>
                    <FlexBox className='flex-col items-start'>
                            <FlexBox className='gap-1 items-center'>
                                <p className='text-3xl font-semibold'>
                                    Rp {data?.price.toLocaleString("id-ID")}
                                </p>
                            </FlexBox>
                            <p className='text-muted-foreground text-sm'>
                                Fixed on road price
                            </p>
                    </FlexBox>
                    <FlexBox className='flex-col items-start'>
                        <FlexBox className='items-center gap-1'>
                            <p className='text-3xl font-semibold text-purple-700'>
                               {`${Number(
                                (Number(data?.price)/12).toFixed(2)
                               ).toLocaleString("en-US")}`}
                            </p>
                        </FlexBox>
                        <FlexBox className='gap-2'>
                            <p className='text-muted-foreground text-sm'>EMI Plans</p>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <InfoIcon className='w-4 h-4 text-muted-foreground '/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className='text-sm'>
                                            EMI for 12 Month
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </FlexBox>
                    </FlexBox>
                </FlexBox>

                <CardFooter className='p-0 my-3'>
                    <FlexBox className='flex-col items-start gap-4 w-full'>
                        <FlexBox className='gap-2 items-center'>
                            <Avatar className='w-8 h-8'>
                                <AvatarImage src={data?.owner?.profileImage || "https://github.com/shadcn.png"} alt={data?.owner?.name || "shadcn"} />
                            </Avatar>
                            <FlexBox className='flex-col items-start'>
                                <p className='font-semibold'>{data?.owner?.name}</p>    
                                <p className='text-sm text-muted-foreground'>{data?.owner?.email}</p>
                            </FlexBox>
                        </FlexBox>
                        <Button className='mt-4 w-full cursor-pointer bg-black hover:bg-black/80'>Enquire Now</Button>
                    </FlexBox>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Info