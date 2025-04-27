"use client";
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'

interface GalleryContentImageProps {
    url:string,
    isTab?:boolean
}
const GalleryContentImage = ({url, isTab=false}:GalleryContentImageProps) => {
    return (
        <div className={cn('aspect-square rounded-lg overflow-hidden relative', isTab ?"w-24 h-24" : "w-full h-[480px]")}  >
            <Image 
                src={url} 
                alt={url} 
                fill 
                className='w-full h-full object-cover' 
                priority
            />
        </div>
    )
}

export default GalleryContentImage