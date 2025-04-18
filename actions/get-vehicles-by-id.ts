import { db } from "@/lib/db";
import {
    Category,
    Favourite,
    Notification,
    SubCategory,
    User,
    Vehicle,
    View,
} from "@prisma/client";


export const getVehiclesById = async (
    userId: string,
    isCheck: boolean
): Promise<
| (Vehicle & {
        category: Category;
        subCategory: SubCategory;
        owner: User;
        favourites: Favourite[];
        views: View[];
        notifications: Notification[];
    })[]
| null
> => {
    try {
        const vehicles = await db.vehicle.findMany({
            where: isCheck ? {} : { ownerId: userId },
            include: {
                category: true,
                subCategory: true,
                owner: true,
                favourites: true,
                views: true,
                notifications: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        if(vehicles.length===0){
            return null
        }

        return vehicles;
    } catch (error) {
        console.error(
        `Error fetching vehicles ${isCheck ? "" : `for user with ID ${userId}`}:`,
        error
        );
        return null;
    }
};