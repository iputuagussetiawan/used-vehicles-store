"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs"; // Assuming you're using Clerk for authentication

const MobileNavbar = () => {
    const pathname = usePathname();
    const { isSignedIn } = useAuth(); // Use this to check if the user is authenticated

    const routes = [
        { path: "/", label: "Home" },
        { path: "/vehicles", label: "Vehicles" },
        { path: "/contact", label: "Contact" },
    ];

    if (isSignedIn) {
        routes.push({ path: "/overview", label: "Dashboard" });
    }

    return (
        <div className="flex flex-col space-y-4 p-4 bg-white">
        {routes.map(({ path, label }) => (
            <Link
                key={path}
                href={path}
                passHref
                className={`relative px-4 py-2 text-lg font-medium transition-all duration-300 ease-in-out ${
                    pathname === path
                    ? "text-blue-600 font-semibold after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-blue-600 after:scale-x-100 after:transition-transform after:duration-300"
                    : "text-gray-700 hover:text-blue-500 hover:after:absolute hover:after:-bottom-1 hover:after:left-0 hover:after:h-[2px] hover:after:w-full hover:after:bg-blue-500 hover:after:scale-x-0 hover:after:transition-transform hover:after:duration-300"
                }`}
                >
                {label}
            </Link>
        ))}
        </div>
    );
};

export default MobileNavbar;