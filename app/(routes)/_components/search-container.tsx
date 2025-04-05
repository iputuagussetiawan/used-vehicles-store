"use client"

import { Input } from "@/components/ui/input"
import { Popover, PopoverContent } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import queryString from "query-string"
import { PopoverTrigger } from "@radix-ui/react-popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const SearchContainer = () => {

  //state to tract form data
  const [selectedFilter, setSelectedFilter] = useState<string>("low-mileage")
  const [brandName, setBrandName] = useState<string>("")
  const [modelName, setModelName] = useState<string>("")
  const [fromYearOpen, setFromYearOpen] = useState(false)
  const [toYearOpen, setToYearOpen] = useState(false)
  const [fromYear, setFromYear] = useState<Date | null>(null)
  const [toYear, setToYear] = useState<Date | null>(null)
  const [priceFrom, setPriceFrom] = useState<string>("")
  const [priceTo, setPriceTo] = useState<string>("")
  const [location, setLocation] = useState<string>("")

  const router=useRouter()

  const filters=[
    {value:"low-mileage",label:"Low Mileage"},
    {value:"single-owner",label:"Single Owner"},
    {value:"no-accidents",label:"No Accidents"},
  ]

  //function to handle filter click
  const handleFilterClick=(filterValue:string)=>{
    setSelectedFilter(filterValue)
  }

  const handleFromYearSelect=(date:Date | undefined)=>{
    setFromYear(date ?? null)
    setFromYearOpen(false)
  }

  const handleToYearSelect=(date:Date | undefined)=>{
    setToYear(date ?? null)
    setToYearOpen(false)
  }

  const onSubmit=(e:React.FormEvent)=>{
    e.preventDefault();
    const query={
      make:brandName,
      model:modelName,
      priceFrom,
      priceTo,
      location,
      fromYear : fromYear? format(fromYear,"yyyy"):null,
      toYear : toYear? format(toYear,"yyyy"):null,
      report:selectedFilter
    }

    const url=queryString.stringifyUrl({
      url:"/search",
      query,
    }, {skipNull:true,skipEmptyString:true},);

    router.push(url);
  }
  return (
    <div className="relative lg:absolute lg:bottom-0 lg:right-0 w-full max-w-md z-10 mt-12 lg:mt-0 backdrop-blur-sm bg-white/30 rounded-lg p-6 shadow-lg">
      <form className="flex flex-col gap-4 space-y-6" onSubmit={onSubmit}>
        {/* report filter section */}
        <div className="grid grid-cols-3 gap-2 w-full">
          {filters.map(filter=>(
            <div key={filter.value} 
            onClick={()=>handleFilterClick(filter.value)} className={cn("px-4 py-2 border rounded-md cursor-pointer transition-all duration-300 flex items-center justify-center text-sm font-medium truncate whitespace-nowrap", selectedFilter===filter.value ? "bg-blue-600 text-white border-blue-600":"bg-gray-200 text-gray-700 border-gray-200")}>
              {filter.label}
            </div>
          ))}
        </div>

        {/* search form */}
        <div className="grid grid-col-1 gap-4 lg:grid-cols-2">
          <Input placeholder="Brand Name"  
          className="bg-white/60 text-gray-900 placeholder-gray-500 font-semibold border border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-200"
          value={brandName}
          onChange={(e)=>setBrandName(e.target.value)}
          />

          <Input placeholder="Model Name"  
          className="bg-white/60 text-gray-900 placeholder-gray-500 font-semibold border border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-200"
          value={modelName}
          onChange={(e)=>setModelName(e.target.value)}
          />

          <Popover open={fromYearOpen} onOpenChange={setFromYearOpen}>
            <PopoverTrigger asChild>
              <div className="relative">
                <Input 
                  placeholder="Year From"
                  value={fromYear? format(fromYear, "dd/MM/yyyy"):""}
                  readOnly
                  className="bg-white/60 text-gray-900 placeholder-gray-500 font-semibold border border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-200"
                />
                <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"/>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={fromYear ?? undefined}
                onSelect={handleFromYearSelect}
                disabled={(date: Date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                //initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover open={toYearOpen} onOpenChange={setToYearOpen}>
            <PopoverTrigger asChild>
              <div className="relative">
                <Input 
                  placeholder="To From"
                  value={toYear? format(toYear, "dd/MM/yyyy"):""}
                  readOnly
                  className="bg-white/60 text-gray-900 placeholder-gray-500 font-semibold border border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-200"
                />
                <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"/>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={toYear ?? undefined}
                onSelect={handleToYearSelect}
                disabled={(date: Date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                //initialFocus
              />
            </PopoverContent>
          </Popover>

          <Input placeholder="Price From"  
          type="number"
          className="bg-white/60 text-gray-900 placeholder-gray-500 font-semibold border border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-200"
          value={priceFrom}
          onChange={(e)=>setPriceFrom(e.target.value)}
          />

        <Input placeholder="Price To"  
          type="number"
          className="bg-white/60 text-gray-900 placeholder-gray-500 font-semibold border border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-200"
          value={priceTo}
          onChange={(e)=>setPriceTo(e.target.value)}
          />

        <Input placeholder="Location"  
          className="bg-white/60 text-gray-900 placeholder-gray-500 font-semibold border border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-200 lg:col-span-2"
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
          />

          <Button className="lg:col-span-2 px-4 py-2 transition cursor-pointer btn-primary" type="submit">Search</Button>


        </div>
      </form>
    </div>
  )
}

export default SearchContainer