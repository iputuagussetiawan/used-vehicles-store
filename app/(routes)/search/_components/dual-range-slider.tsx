"use client"

import FlexBox from '@/components/flex-box';
import * as   Slider  from '@radix-ui/react-slider';
import React, { use, useEffect, useState } from 'react'

interface DualRangeSliderProps {
    value?: [number, number];
    onValueChange: (newValue: [number, number]) => void;
    min?: number;
    max?: number;
    step?: number;
    isPrice?: boolean
}

const DualRangeSlider = ({
    value=[2000, 100000000],
    onValueChange,
    min=0,
    max=10000000,
    step=1000,
    isPrice=true
}: DualRangeSliderProps) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, [])

    if(!isMounted) return null
    return (
        <FlexBox className='flex-col w-full'>
            <Slider.Root 
                className='relative flex items-center  h-5 w-full touch-none select-none'
                min={min}
                max={max}
                step={step}
                value={value}
                onValueChange={onValueChange}
                aria-label="Range"
            >
                <Slider.Track className='bg-gray-200 relative flex-grow rounded-full h-1'>
                    <Slider.Range className='absolute bg-gradient-to-r from-blue-500 to-purple-500 rounded-full h-full' />
                </Slider.Track>
                <Slider.Thumb className='block w-4 h-4 bg-blue-500 rounded-full cursor-pointer shadow-md'/>
                <Slider.Thumb className='block w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full cursor-pointer shadow-md'/>
            </Slider.Root>
            <div className='flex flex-col items-start w-full'>
                <div className='flex items-center justify-between w-full'>
                    <span className='text-sm text-muted-foreground'>From</span>
                    <span className='text-sm text-muted-foreground'>To</span>
                </div>

                <div className='flex items-center justify-between w-full'>
                    <span className='flex items-center gap-1 text-sm'>
                        {isPrice && 'Rp'} {Number(value[0]).toLocaleString('id-ID')}
                    </span>
                    <span className='flex items-center gap-1 text-sm'>
                        {isPrice && 'Rp'} {Number(value[1]).toLocaleString('id-ID')}
                    </span>
                </div>
            </div>
        </FlexBox>
    )
}

export default DualRangeSlider