"use client"

import FlexBox from '@/components/flex-box'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import queryString from 'query-string'


const SearchByTitle = () => {
    const [searchTitle, setSearchTitle] = useState<string>("");
    const router=useRouter();
    const handleSearchClick=()=>{
        const currentParams=queryString.parse(window.location.search)
        const updatedParams={...currentParams,make:searchTitle || undefined}
        
        const cleanedParams=Object.fromEntries(Object.entries(updatedParams).filter(
            ([_,value])=>value!==undefined && value!=="" && value!==null))

        const newQueryString=queryString.stringify(cleanedParams, {
            skipNull:true,
            skipEmptyString:true
        })

        router.push(`?${newQueryString}`);
        
    }
    return (
        <FlexBox className='justify-center h-20 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg px-8 py-4'>
            <FlexBox className='bg-white mt-16 rounded-lg w-full md:w-1/2 h-14 min-h-14 px-2 shadow-neutral-200 shadow-lg flex items-center justify-between relative space-x-2'>
                <Search className='text-muted-foreground' />
                <Input
                    placeholder='Search here...'
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    className='h-10 outline-none border-none shadow-none focus-visible:ring-0 focus:ring-0 w-full placeholder:text-muted-foreground'
                />
                <Button onClick={handleSearchClick}  className="cursor-pointer bg-gray-700 min-h-12 min-w-12 hover:bg-gray-950" size="icon">
                    <Search className='w-4 h-4'/>
                </Button>
            </FlexBox>
        </FlexBox>
    )
}

export default SearchByTitle