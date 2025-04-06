import { db } from "@/lib/db";
import { Category } from "@prisma/client";

export const getCategories = async ():Promise<Category[] | null> => {
    try {
        const categories= await db.category.findMany();
        return categories
    } catch (error) {
        console.log(`Error Fetching Categories:`,error)
        return null
    }
};