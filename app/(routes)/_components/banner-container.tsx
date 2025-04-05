"use client";

import { Button } from "@/components/ui/button";
import SearchContainer from "./search-container";

export const BannerContainer = () => {
  return (
    <div
      className="relative bg-cover bg-center lg:min-h-[60vh] flex flex-col justify-start items-center text-center p-6 lg:p-12 rounded-xl overflow-hidden"
      style={{ backgroundImage: "url(/assets/hero.jpg)" }}
    >
      {/* Overlay for background image */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content on top of background image */}
      <div className="relative z-10 text-white max-w-3xl space-y-6 lg:space-y-8">
        <h1 className="text-2xl lg:text-5xl font-bold leading-tight">
          The Ultimate Marketplace for{" "}
          <span className="text-black font-bold text-2xl lg:text-5xl block my-3 uppercase">
            Used Vehicles
          </span>
        </h1>
        <p className="text-sm lg:text-xl leading-relaxed">
          AutoFind connects buyers and sellers of pre-owned vehicles with a
          seamless and trusted platform. Browse through thousands of listings,
          filter by make, model, price, and location to find the perfect match.
        </p>
        <Button>Browse Vehicles</Button>
      </div>

      {/* Search form */}
      <SearchContainer />
    </div>
  );
};

export default BannerContainer;