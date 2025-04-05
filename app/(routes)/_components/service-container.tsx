"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export const ServicesContainer = () => {
  const services = [
    {
      title: "Vehicle Inspection",
      description:
        "We provide detailed vehicle inspection reports to ensure you are getting the best value for your money.",
      image:
        "https://cdn.pixabay.com/photo/2019/01/30/11/22/oil-3964367_1280.jpg",
    },
    {
      title: "Finance Assistance",
      description:
        "Our finance experts help you find the best loan options available, ensuring smooth and affordable financing.",
      image:
        "https://cdn.pixabay.com/photo/2014/07/06/13/55/calculator-385506_1280.jpg",
    },
    {
      title: "Trade-In Valuation",
      description:
        "Get a fair trade-in valuation for your current vehicle and use it towards your next purchase.",
      image:
        "https://cdn.pixabay.com/photo/2018/01/23/03/39/handshake-3100563_1280.jpg",
    },
    {
      title: "Warranty Options",
      description:
        "We offer extended warranty options for your peace of mind, so you can enjoy your vehicle worry-free.",
      image:
        "https://thumbs.dreamstime.com/b/warranty-pressing-button-virtual-screen-35134149.jpg",
    },
  ];

  return (
    <div className=" mx-auto px-4 py-16">
      {/* Title and Description */}
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-gray-900">Services</h2>
        <p className="text-gray-600 mt-4">
          Discover the wide range of services we offer to help you find the best
          used vehicles that suit your needs.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-neutral-100 shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 flex-1 flex flex-col md:flex-row items-start gap-2"
          >
            {/* Image */}
            <div className="w-full min-w-[225px] h-52 md:h-40 overflow-hidden rounded-lg mb-4 lg:mb-0">
              <Image
                src={service.image}
                alt={service.title}
                width={500}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            <div className="space-y-3 pl-2">
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mt-2">{service.description}</p>

              <Button>Read More</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesContainer;