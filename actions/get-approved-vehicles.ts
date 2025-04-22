
import { db } from "@/lib/db";
import { Vehicle,Category, Favourite, SubCategory, User, View, Notification } from "@prisma/client";

interface SearchParams { 
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

export const getApproveVehicles=async(
    searchParams:SearchParams)
    :Promise<
    (Vehicle&{
        category:Category;
        subCategory:SubCategory;
        owner:User;
        favourites:Favourite[];
        views:View[];
        notification:Notification[];
    })[]>=>{
    const {
        make,
        model,
        priceFrom,
        priceTo,
        location, 
        fromYear,
        toYear,
        report,
        transmission,
        engine,
        state,
        district,
        categoryId,
    }=searchParams;

    try {
        const query:any={
            where:{
                status:"approved"
            },
            include:{
                category:true,
                subCategory:true,
                owner:true,
                favourites:true,
                views:true,
                notifications:true,
            },
            orderBy:{
                createdAt:"desc"
            }
        }

        if(categoryId){
            query.where.categoryId=categoryId
        }

        if(make || model){
            query.where.AND=[
                make && {
                    make:{
                        contains:make
                    },
                },
                model && {
                    model:{
                        contains:model,
                    }
                }
            ].filter(Boolean);
        }
        if(priceFrom || priceTo){
            query.where.price={
                ...(priceFrom && {gte:Number(priceFrom)}),
                ...(priceTo && {lte:Number(priceTo)})
            }
        }

        if(location){
            query.where.location={
                contains:location
            };
        }

        if(fromYear || toYear){
            query.where.year={
                ...(fromYear && {gte:Number(fromYear)}),
                ...(toYear && {lte:Number(toYear)})
            }
        }

        if(report){
            query.where.report={
                contains:report
            }
        }

        if(transmission){
            query.where.transmission={
                contains:transmission
            }
        }

        if(engine){
            query.where.engine={
                contains:engine
            }
        }

        if(state){
            query.where.state={
                contains:state
            }
        }

        if(district){
            query.where.district={
                contains:district
            }
        }

        const vehicles= await db.vehicle.findMany(query)

        //@ts-ignore
        return vehicles;
        


    } catch (error) {
        console.error("GET APPROVE VEHICLES", error);
        return[];
    }
}