/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

// Function to generate slugs
// @ts-expect-error
const generateSlug = (name) => {
    return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");
};

const main = async () => {
    try {
        // Seed Categories for Used Cars
        await database.category.createMany({
            data: [
                { name: "Cars", slug: generateSlug("Cars") },
                { name: "Bikes", slug: generateSlug("Bikes") },
            ],
        });

        // Seed Sub-categories for Used Cars and Bikes
        await database.subCategory.createMany({
            data: [
                // Subcategories for Cars
                {
                    name: "SUV",
                    slug: generateSlug("SUV"),
                    categoryId: (
                        await database.category.findFirst({ where: { name: "Cars" } })
                    ).id,
                },
                {
                    name: "Sedan",
                    slug: generateSlug("Sedan"),
                    categoryId: (
                        await database.category.findFirst({ where: { name: "Cars" } })
                    ).id,
                },
                {
                    name: "Hatchback",
                    slug: generateSlug("Hatchback"),
                    categoryId: (
                        await database.category.findFirst({ where: { name: "Cars" } })
                    ).id,
                },
                {
                    name: "Convertible",
                    slug: generateSlug("Convertible"),
                    categoryId: (
                        await database.category.findFirst({ where: { name: "Cars" } })
                    ).id,
                },
                {
                    name: "Coupe",
                    slug: generateSlug("Coupe"),
                    categoryId: (
                        await database.category.findFirst({ where: { name: "Cars" } })
                    ).id,
                },
                {
                    name: "Pickup Truck",
                    slug: generateSlug("Pickup Truck"),
                    categoryId: (
                        await database.category.findFirst({ where: { name: "Cars" } })
                    ).id,
                },
                {
                    name: "Minivan",
                    slug: generateSlug("Minivan"),
                    categoryId: (
                        await database.category.findFirst({ where: { name: "Cars" } })
                    ).id,
                },
                {
                    name: "Electric",
                    slug: generateSlug("Electric"),
                    categoryId: (
                        await database.category.findFirst({ where: { name: "Cars" } })
                    ).id,
                },

                // Subcategories for Bikes
                {
                    name: "Cruiser",
                    slug: generateSlug("Cruiser"),
                    categoryId: (
                        await database.category.findFirst({ where: { name: "Bikes" } })
                    ).id,
                },
                {
                    name: "Sports Bike",
                    slug: generateSlug("Sports Bike"),
                    categoryId: (
                        await database.category.findFirst({ where: { name: "Bikes" } })
                    ).id,
                },
                {
                    name: "Touring",
                    slug: generateSlug("Touring"),
                    categoryId: (
                        await database.category.findFirst({ where: { name: "Bikes" } })
                    ).id,
                },
                {
                    name: "Dirt Bike",
                    slug: generateSlug("Dirt Bike"),
                    categoryId: (
                        await database.category.findFirst({ where: { name: "Bikes" } })
                    ).id,
                },
                {
                    name: "Scooter",
                    slug: generateSlug("Scooter"),
                    categoryId: (
                        await database.category.findFirst({ where: { name: "Bikes" } })
                    ).id,
                },
                {
                    name: "Electric Bike",
                    slug: generateSlug("Electric Bike"),
                    categoryId: (
                        await database.category.findFirst({ where: { name: "Bikes" } })
                    ).id,
                },
                {
                    name: "Naked Bike",
                    slug: generateSlug("Naked Bike"),
                    categoryId: (
                        await database.category.findFirst({ where: { name: "Bikes" } })
                    ).id,
                },
            ],
        });
        console.log(
        "Seeding successful for categories and sub-categories related to used cars and bikes."
        );
    } catch (error) {
        console.log(`Error on seeding the database for used vehicles: ${error}`);
    } finally {
        await database.$disconnect();
    }
};

main();