import { db } from "@/lib/db";
import { Notification, User, Vehicle } from "@prisma/client";

export const getNotificationByUserID = async (
    userId: string
): Promise<(Notification & { user: User | null; vehicle: Vehicle| null })[]> => {
    try {
        const notifications = await db.notification.findMany({
        where: {
            userId: userId,
        },
        include: {
            user: true,
            vehicle: true,
        },
        orderBy: {
            createdAt: "desc",
        },
        });

        return notifications.length > 0 ? notifications : [];
    } catch (error) {
        console.error(`Error fetching notifications for user with ID: ${userId}`, error);
        return [];
    }
};