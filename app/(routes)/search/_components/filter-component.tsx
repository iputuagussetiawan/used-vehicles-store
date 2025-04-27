"use client"
import ComboBox from '@/components/combo-box';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDebounce } from '@/hooks/use-debounce';
import { indonesiaStatesAndDistricts, vehicleMakes, vehicleModels } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { Category } from '@prisma/client';
import { AnimatePresence, motion } from 'framer-motion';
import { Eraser, Filter, FilterIcon, Radio } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'
import DualRangeSlider from './dual-range-slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { url } from 'inspector';
import queryString from 'query-string';

interface FilterComponentProps {
    searchParams:{
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
    };
    categories:Category[] | null
}

    const FilterComponent = ({searchParams, categories} : FilterComponentProps) => {

        const router=useRouter();
        const [showFilters, setShowFilters] = useState(false);
        const [hasFilterChange, setHasFilterChange] = useState(false);
        const [selectVehicleModel, setSelectVehicleModel] = useState(searchParams.make || "");

        const [make,setMake]=useState(searchParams.make || "");
        const [model,setModel]=useState(searchParams.model || "All Models");
        const [priceRange,setPriceRange]=useState<[number, number]>([
            searchParams.priceFrom ? parseInt(searchParams.priceFrom) : 0,
            searchParams.priceTo ? parseInt(searchParams.priceTo) : 0
        ])

        const [yearRange,setYearRange]=useState<[number, number]>([
            searchParams.fromYear ? parseInt(searchParams.fromYear) : 0,
            searchParams.toYear ? parseInt(searchParams.toYear) : 0
        ])
        const [location,setLocation]=useState(searchParams.location || "");
        const [transmission,setTransmission]=useState(searchParams.transmission || "");
        const [report,setReport]=useState(searchParams.report || "");
        const [engine,setEngine]=useState(searchParams.engine || "");
        const [categoryId,setCategoryId]=useState(searchParams.categoryId || "");

        const [selectedState,setSelectedState]=useState(searchParams.state || "");
        const [district,setDistricts]=useState<string[]>([]);
        const [selectedDistricts, setSelectedDistricts] = useState(
            searchParams.district || ""
        )

        const transmissionOptions = [
            { label: "Automatic", value: "Automatic" },
            { label: "Manual", value: "Manual" },
        ];

        const engineOptions=[
            {label:"EV",value:"EV"},
            {label:"Hybrid",value:"Hybrid"},
            {label:"Petrol",value:"Petrol"},
            {label:"Diesel",value:"Diesel"},
        ]

        const reportOptions=[
            {value:"low-mileage",label:"Low Mileage"},
            {value:"no-accidents",label:"No Accidents"},
            {value:"single-owner",label:"Single Owner"},
        ]

        const formattedCategories=categories?.map((category :{slug:string,name:string,id:string})=>({
            label:category.name,
            value:category.id,
            id:category.id
        }))||[]

        useEffect(() => {
            const selectedStateOj=indonesiaStatesAndDistricts.find((stateObj) => stateObj.state === selectedState);

            setDistricts(
                selectedStateOj?.districts.map((districtObj) => districtObj.district) || []
            )

            setSelectedDistricts("")
        }, [selectedState]);



        const debouncedMake = useDebounce(make);
        const debouncedModel = useDebounce(model);
        const debouncedPriceFrom = useDebounce(priceRange[0]);
        const debouncedPriceTo = useDebounce(priceRange[1]);
        const debouncedYearFrom = useDebounce(yearRange[0]);
        const debouncedYearTo = useDebounce(yearRange[1]);
        const debouncedLocation = useDebounce(location);

        const debouncedTransmission = useDebounce(transmission);
        const debouncedEngine = useDebounce(engine);
        const debouncedReport = useDebounce(report);
        const debouncedState = useDebounce(selectedState);
        const debouncedDistrict = useDebounce(selectedDistricts); 
        const debouncedCategoryId = useDebounce(categoryId);

        useEffect(() => {
            setHasFilterChange(true)
        },[
            make,
            model,
            priceRange,
            yearRange,
            location,
            transmission,
            engine,
            report,
            selectedState,
            selectedDistricts,
            categoryId
        ]);

        useEffect(() => {
            handleFilterChange();
        },[
            debouncedMake,
            debouncedModel,
            debouncedPriceFrom,
            debouncedPriceTo,
            debouncedYearFrom,
            debouncedYearTo,
            debouncedLocation,
            debouncedTransmission,
            debouncedEngine,
            debouncedReport,
            debouncedState,
            debouncedDistrict,
            debouncedCategoryId
        ])
        const handleFilterChange=()=>{
            if(!hasFilterChange) return;

            const updatedParams={
                ...searchParams,
                make:debouncedMake === "" ? undefined : debouncedMake,
                model:debouncedModel === "All Models" ? undefined : debouncedModel,
                priceFrom:debouncedPriceFrom || undefined,
                priceTo:debouncedPriceTo || undefined,
                fromYear:debouncedYearFrom || undefined,
                toYear:debouncedYearTo || undefined,
                location:debouncedLocation==="All Locations" ? undefined : debouncedLocation,
                transmission:debouncedTransmission || undefined,
                engine:debouncedEngine || undefined,
                report:debouncedReport || undefined,
                state:debouncedState || undefined,
                district:debouncedDistrict || undefined,
                categoryId:debouncedCategoryId || undefined
            };

            const queryStringUrl=queryString.stringifyUrl(
                {
                    url:"/search",
                    query:updatedParams
                },
                {
                    skipNull:true,
                    skipEmptyString:true
                }
            )

            router.push(queryStringUrl);
        }

        const handleClearFilterChange=()=>{
            setMake("")
            setModel("All Models")
            setPriceRange([1000,1000000])
            setYearRange([2000,new Date().getFullYear()])
            setLocation("All Locations")
            setReport("")
            setSelectVehicleModel("")
            setHasFilterChange(false)
            setSelectedState("")
            setSelectedDistricts("")
            setTransmission("")
            setEngine("")
            setCategoryId("")

            const queryStringUrl=queryString.stringifyUrl(
                {
                    url:"/search",
                    query:{}
                }
            )

            router.push(queryStringUrl);
        }
    return (

        <div className='flex flex-col space-y-4 my-8'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold'>Search Vehicle</h1>
                <p className='text-gray-600 mt-2'> Find the perfect vehicle for your needs</p>
            </div>

            <div className='flex item-center space-x-4 overflow-x-auto scrollbar-none py-2'>
                {vehicleModels.map((vehicleModel) => (
                    <Button 
                        variant={selectVehicleModel===vehicleModel.label?"default":"ghost"} 
                        className={cn("cursor-pointer whitespace-nowrap px-4 py-2", selectVehicleModel===vehicleModel.label? "bg-gray-100/80 border shadow-md shadow-gray-100 text-gray-700 hover:bg-gray-200":"hover:bg-none")}
                        onClick={()=>{
                            setSelectVehicleModel(vehicleModel.label)
                            setModel(vehicleModel.label)
                        }}
                    >
                        {vehicleModel.label}
                    </Button>
                ))}
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-6 py-4 px-4  gap-8'>
                <ComboBox
                    items={vehicleMakes}
                    selectedValue={make}
                    placeholder='Select Make'
                    onSelect={value=>setMake(value)}
                />

                <Select 
                    onValueChange={value=>setSelectedState(value)}
                    value={selectedState}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select State" />
                    </SelectTrigger>

                    <SelectContent>
                        {indonesiaStatesAndDistricts.map((stateObj) => (
                            <SelectItem key={stateObj.state} value={stateObj.state}>
                                {stateObj.state}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select 
                    onValueChange={value=>setSelectedDistricts(value)}
                    value={selectedDistricts}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select District" />
                    </SelectTrigger>

                    <SelectContent>
                        {indonesiaStatesAndDistricts.find(stateObj => stateObj.state === selectedState)?.districts?.map((district) => (
                            <SelectItem key={district.district} value={district.district}>
                                {district.district}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <ComboBox
                    items={formattedCategories}
                    selectedValue={categoryId}
                    placeholder='Select Category'
                    onSelect={(slug)=>{
                        const selectedCategory=formattedCategories.find((category)=>category.value===slug)
                        setCategoryId(selectedCategory?.id??"");
                    }}
                />

                <ComboBox
                    items={reportOptions}
                    selectedValue={report}
                    placeholder='Select Report'
                    onSelect={(value)=>setReport(value)}
                />

                <div className='flex items-center gap-2 md:justify-evenly'>
                    <Button 
                        variant={"outline"}
                        className='flex items-center space-x-2 w-10 h-10 min-w-10'
                        onClick={()=>setShowFilters(!showFilters)}
                    >
                        <FilterIcon className=' h-4 w-4' />
                    </Button>

                    <Button 
                        variant={"destructive"}
                        className='flex items-center space-x-2 w-10 h-10 min-w-10'
                        onClick={handleClearFilterChange}
                    >
                        <Eraser className=' h-4 w-4' />
                    </Button>
                </div>
            </div>

            <AnimatePresence>
                {
                    !showFilters &&(
                        <motion.div
                            className='grid grid-col-1 lg:grid-cols-8 gap-4'
                            initial={{opacity:0, height:0}}
                            animate={{opacity:1, height:"auto"}}
                            exit={{opacity:0, height:0}}
                        >
                            <div className='col-span-8 lg:col-span-2'>
                                <Label className='text-gray-600'>Price Range</Label>
                                <DualRangeSlider
                                    value={priceRange}
                                    onValueChange={(newRange)=>setPriceRange(newRange)}
                                    min={1000}
                                    max={1000000000}
                                />
                            </div>

                            <div className='col-span-8 lg:col-span-2'>
                                <Label className='text-gray-600'>Year Range</Label>
                                <DualRangeSlider
                                    value={yearRange}
                                    onValueChange={(newYearRange)=>setYearRange(newYearRange)}
                                    min={1990}
                                    max={new Date().getFullYear()}
                                    step={1}
                                    isPrice={false}
                                />
                            </div>

                            <div className='col-span-4 lg:col-span-2'>
                                <Label className='text-gray-600'>Transmission</Label>
                                <RadioGroup 
                                    value={transmission} 
                                    onValueChange={setTransmission}
                                    className='flex flex-col border p-1 px-3 rounded-lg'
                                >
                                    {
                                        transmissionOptions.map((option)=>(
                                            <div key={option.value} className='flex items-center space-x-2'>
                                                <RadioGroupItem value={option.value} id={option.value}/>
                                                <Label 
                                                    htmlFor={option.value}
                                                    className='text-sm font-medium'
                                                >
                                                    {option.label}
                                                </Label>
                                            </div>
                                        ))
                                    }
                                </RadioGroup>
                            </div>
                            <div className='col-span-4 lg:col-span-2'>
                                <Label className='text-gray-600'>Engine</Label>
                                <RadioGroup 
                                    value={engine} 
                                    onValueChange={setEngine}
                                    className='grid grid-cols-2 gap-2 p-1 px-3 rounded-lg border'
                                >
                                    {
                                        engineOptions.map((option)=>(
                                            <div key={option.value} className='flex items-center space-x-2'>
                                                <RadioGroupItem value={option.value} id={option.value}/>
                                                <Label 
                                                    htmlFor={option.value}
                                                    className='text-sm font-medium'
                                                >
                                                    {option.label}
                                                </Label>
                                            </div>
                                        ))
                                    }
                                </RadioGroup>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div>
    )
}

export default FilterComponent