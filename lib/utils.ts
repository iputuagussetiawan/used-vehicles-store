import { storage } from "@/config/firebase.config";
import { clsx, type ClassValue } from "clsx"
import { deleteObject, ref } from "firebase/storage";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const deleteImagesFromFirebase = async (imageUrls: string): Promise<void> => {
  try{
    const imageRef = ref(storage, imageUrls);
    await deleteObject(imageRef);
  }catch(error){
    console.log(`Error deleting image:`, error);
    throw new Error(`Error deleting image: ${(error as Error).message}`);
  }
}

export const deleteMultipleImagesFromFirebase = async (imageUrls: string[]): Promise<void> => {
  try{
    const deletePromises=imageUrls.map(async(url) => 
      deleteObject(ref(storage, url))
    );
    await Promise.all(deletePromises);
  }catch(error){
    console.log(`Error deleting images:`, error);
    throw new Error(`Error deleting images: ${(error as Error).message}`);
  }
}