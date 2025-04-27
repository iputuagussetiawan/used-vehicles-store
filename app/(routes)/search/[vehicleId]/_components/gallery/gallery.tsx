"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import React from 'react'
import GalleryContentImage from './gallery-content-image';
import { cn } from '@/lib/utils';

interface GalleryProps {
    images: string[]; 
}
const Gallery = ({images}: GalleryProps) => {
    return (
        <Tabs 
            defaultValue={images[0]}
            className='w-full space-y-12'
            orientation='vertical'
        >
            {
                images.map((tab,i) => (
                    <TabsContent 
                        key={i} 
                        value={tab}
                        className='border'
                    >
                        <GalleryContentImage url={tab} />
                    </TabsContent>
                ))  
            }

            <TabsList className='bg-transparent w-full md:space-x-4'>
                {
                    images.map((tab,i) => (
                        <TabsTrigger
                            
                            key={i} 
                            value={tab}
                            className={"display-block data-[state=active]:border data-[state=active]:border-gray-200 data-[state=active]:shadow-md"}
                        >
                            <GalleryContentImage isTab url={tab} />
                        </TabsTrigger>
                    ))
                }
            </TabsList>
        </Tabs>
    )
}

export default Gallery