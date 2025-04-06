"use client";
import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { HomeIcon } from 'lucide-react';

interface CustomBreadcrumbProps {
    breadcrumbItems: {link: string, label: string}[];
    breadcrumbPage: string
}

const CustomBreadcrumb = ({breadcrumbPage, breadcrumbItems}:CustomBreadcrumbProps) => {
    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className='flex items-center justify-center hover:text-blue-500' href="/">
                            <HomeIcon className="w-4 h-4 mr-1" />
                            Home
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    
                    {breadcrumbItems&&(
                        <React.Fragment>
                            {breadcrumbItems.map((item, index) => (
                                <React.Fragment key={index}>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink 
                                            className='hover:text-blue-500'
                                            href={item.link}>{item.label}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    )
                    }

                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{breadcrumbPage}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}

export default CustomBreadcrumb