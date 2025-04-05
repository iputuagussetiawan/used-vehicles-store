"use client";

import { Users, ClipboardCheck, ThumbsUp, MapPin } from "lucide-react";
import React from "react";

export const WhyChooseUsContainer = () => {
  const reasons = [
    {
      title: "Expert Team",
      description:
        "Our team consists of automotive experts who ensure you get top-quality service every time.",
      icon: Users,
    },
    {
      title: "Comprehensive Services",
      description:
        "We offer a full range of services, from inspection to financing, making your vehicle purchase seamless.",
      icon: ClipboardCheck,
    },
    {
      title: "Customer Satisfaction",
      description:
        "We prioritize customer satisfaction with transparent pricing and no hidden fees.",
      icon: ThumbsUp,
    },
    {
      title: "Nationwide Coverage",
      description:
        "Our network covers all major regions, giving you access to a vast inventory of vehicles.",
      icon: MapPin,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Title and Description */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">Why Choose Us</h2>
        <p className="text-gray-600 mt-4">
          Here’s why we stand out from the competition and why we are the best
          choice for your vehicle needs.
        </p>
      </div>

      {/* Reasons Flex Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {reasons.map((reason, index) => {
          const IconComponent = reason.icon;

          // Conditional styling for odd and even cards
          const isOdd = index % 2 !== 0;
          const iconBgClass = isOdd ? "bg-gray-900" : "bg-blue-100";
          const iconColorClass = isOdd ? "text-white" : "text-blue-600";

          return (
            <div
              key={index}
              className="rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 flex-1 flex flex-col items-center text-center"
            >
              {/* Icon with conditional styling */}
              <div
                className={`mb-4 w-40 h-40 rounded-lg min-w-40 min-h-40 flex items-center justify-center ${iconBgClass}`}
              >
                <IconComponent size={75} className={iconColorClass} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 whitespace-nowrap">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mt-2">{reason.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhyChooseUsContainer;