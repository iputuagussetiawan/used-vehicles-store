import { db } from "@/lib/db";
import { SubCategory } from "@prisma/client";

export const getSubCategories = async ():Promise<SubCategory[] | null> => {
    try {
        const subCategories= await db.subCategory.findMany();
        return subCategories
    } catch (error) {
        console.log(`Error Fetching Sub Categories:`,error)
        return null
    }
};