import { db } from "@/lib/db";
import { Category, Favourite, Notification, SubCategory, User, Vehicle, View } from "@prisma/client";

export const getVehicleById = async (vehicleId: string): Promise<
    | (Vehicle & {
        category: Category,
        subCategory: SubCategory,
        owner: User,
        favourites: Favourite[],
        views: View[],
        notifications: Notification[],
    }) | null
> => {
    try {
        const vehicle = await db.vehicle.findUnique({
            where: { id: vehicleId },
            include: {
                category: true,
                subCategory: true,
                owner: true,
                favourites: true,
                views: true,
                notifications: true,
            },
        })

        if (!vehicle) {
            return null
        }
        return vehicle;
    } catch (error) {
        console.log(`Error retrieving vehicle with id ${vehicleId}:`, error)
        return null
        throw error; // Rethrow the error
    }
};