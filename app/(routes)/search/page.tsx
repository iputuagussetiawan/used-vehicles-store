import { getApproveVehicles } from '@/actions/get-approved-vehicles';
import { getCategories } from '@/actions/get-categories';
import CustomBreadcrumb from '@/components/custom-breadcrumb';
import React from 'react'
import SearchByTitle from './_components/search-by-title';
import FilterComponent from './_components/filter-component';
import MainClient from '@/components/client';

interface SearchVehiclesProps {
    SearchParams: { 
        make?: string;
        model?: string;
        priceFrom?: string;
        priceTo?: string;
        location?: string;
        fromYear?: string;
        toYear?: string;
        report?: string;
        transmission?:string;
        engine?:string;
        state?:string;
        district?:string;
        categoryId?:string;
    }
}

export const revalidate = 0;

const SearchVehicles = async({SearchParams}: SearchVehiclesProps) => {
    //fetch the approve vehicles

    const vehicles=await getApproveVehicles({ ...SearchParams});
    console.log(vehicles)
    //fetch the categories

    const categories=await getCategories()
    return (
        <div className='flex-col space-y-12 my-12'>
            <CustomBreadcrumb breadcrumbItems={[]}  breadcrumbPage='Search'/>
            {/* Search By Title */}
            <SearchByTitle/>
            {/* Filter Component */}
            <FilterComponent/>
            <MainClient/>
        </div>
    )
}

export default SearchVehicles