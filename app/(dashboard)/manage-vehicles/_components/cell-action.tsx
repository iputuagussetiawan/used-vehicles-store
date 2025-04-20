"use client"

import React, { useEffect, useState } from 'react'
import { VehiclesColumn } from './columns'
import { useParams, useRouter } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import TooltipButton from '@/components/ui/tooltip-button';
import { Copy, Eye, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

interface CellActionProps {
    data:VehiclesColumn;
}

export const CellAction = ({data}:CellActionProps) => {
    const router=useRouter();
    const params=useParams();

    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    //  const authResult = await auth();
    // const {userId}=authResult

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Copied",{
            description:"Vehicle ID copied to clipboard"
        });
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            const response = await axios.delete(`/api/vehicles/${data?.id}`);
            toast.success("Deleted", {
                description: "Vehicle deleted successfully",
            });
            router.push("/manage-vehicles");                

        } catch (error) {
            toast.error("Something went wrong", {
                description: (error as Error).message,
            });            
        } finally {
            setLoading(false);
            setOpen(false);         
            router.refresh();
        }
    }



    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted){
        return null
    }




    return <React.Fragment>
        <div className="flex items-center justify-center gap-x-2">
            <TooltipButton 
                tooltipContent="Copy ID"
                icon={<Copy/>}
                onClick={()=>onCopy(data.id)}
                buttonVariant={"ghost"}
                buttonClassName='text-muted-foreground hover:text-green-500 cursor-pointer'
                tooltipDelay={0}
                disabled={loading}
            />
            <TooltipButton 
                tooltipContent="View"
                icon={<Eye/>}
                onClick={()=>router.push(`/manage-vehicles/${data.id}`)}
                buttonVariant={"ghost"}
                buttonClassName='text-muted-foreground hover:text-orange-500 cursor-pointer'
                tooltipDelay={0}
                disabled={loading}
            />
            <TooltipButton 
                tooltipContent="Delete"
                icon={<Trash2/>}
                onClick={onDelete}
                buttonVariant={"ghost"}
                buttonClassName='text-muted-foreground hover:text-red-500 cursor-pointer'
                tooltipDelay={0}
                disabled={loading}
            />
        </div>
    </React.Fragment>
}
