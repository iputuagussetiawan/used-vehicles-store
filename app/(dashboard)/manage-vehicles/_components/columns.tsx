"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CellAction } from "./cell-action";

// Define the types for each vehicle column, including status
export type VehiclesColumn = {
    id: string;
    make: string;
    model: string;
    year: number;
    price: string; // Assuming price is formatted as a string
    category: string; // Category name instead of ID
    subCategory: string; // Sub-category name instead of ID
    coverImage: string; // Cover image URL
    createdAt: string; // Formatted date string
    status: string; // Status is now explicitly typed
    owner: { name: string; profileImage: string };
};

// Define the columns for the table
export const columns: ColumnDef<VehiclesColumn>[] = [
    {
        accessorKey: "owner",
        header: "Owner",
        cell: ({ row }) => {
        const { owner } = row.original;

        return (
            <div className="flex items-center space-x-2">
            <Image
                width={32}
                height={32}
                className="object-cover rounded-full"
                src={owner.profileImage}
                alt={owner.name}
            />
            </div>
        );
        },
    },
    {
        accessorKey: "coverImage",
        header: "Image",
        cell: ({ row }) => {
        const { coverImage } = row.original;
        return (
            <Image
            width={80}
            height={45}
            className="object-cover rounded-md"
            src={coverImage}
            alt="Vehicle Image"
            priority
            />
        );
        },
    },
    {
        accessorKey: "make",
        header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Make
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        );
        },
        cell: ({ row }) => {
        const { make } = row.original;
        return <p className="w-24 truncate">{make}</p>;
        },
    },
    {
        accessorKey: "model",
        header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Model
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        );
        },
        cell: ({ row }) => {
        const { model } = row.original;
        return <p className="w-24 truncate">{model}</p>;
        },
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Category
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        );
        },
        cell: ({ row }) => {
        const { category } = row.original;
        return <p className="w-24 truncate">{category}</p>;
        },
    },
    {
        accessorKey: "subCategory",
        header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Sub Category
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        );
        },
        cell: ({ row }) => {
        const { subCategory } = row.original;
        return <p className="w-24 truncate">{subCategory}</p>;
        },
    },
    {
        accessorKey: "year",
        header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Year
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        );
        },
        cell: ({ row }) => {
        const { year } = row.original;
        return <p>{year}</p>;
        },
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        );
        },
        cell: ({ row }) => {
        const { price } = row.original;
        return <p>{price}</p>;
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        );
        },
        cell: ({ row }) => {
        const { createdAt } = row.original;
        const formattedDate = format(new Date(createdAt), "dd/MM/yyyy"); // Format the date consistently
        return <p>{formattedDate}</p>;
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        );
        },
        cell: ({ row }) => {
        const { status } = row.original;

        // Conditional styling based on the status
        const statusStyles: Record<typeof status, string> = {
            pending: "bg-yellow-200 text-yellow-700",
            approved: "bg-green-200 text-green-700",
            rejected: "bg-red-200 text-red-700",
        };

        return (
            <span
            className={`px-2 py-1 rounded-lg font-medium ${statusStyles[status]}`}
            >
            {status?.charAt(0).toUpperCase() + status?.slice(1)}
            </span>
        );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />, // Assuming you have a CellAction component
    },
];