"use client";

import React, { useState } from "react";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const SubscribeNow = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the subscription logic here (e.g., API call)
    toast("Subscribed", {
      description: "You have successfully subscribed to our newsletter!",
    });
  };

  return (
    <div className="bg-gray-900 text-white py-16 rounded-3xl">
      <div className="container mx-auto px-4">
        {/* Title and Short Description */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold">Subscribe Now</h2>
          <p className="text-gray-400 mt-2">
            Stay updated with the latest vehicle offers and news. Subscribe to
            our newsletter!
          </p>
        </div>

        {/* Subscription Form */}
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg flex flex-col sm:flex-row gap-4 items-center"
          >
            <div className="relative w-full sm:flex-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="email"
                className="w-full p-4 pl-12 h-12 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>

            <Button
              type="submit"
              className="px-8 py-4 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 w-full sm:w-auto"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscribeNow;