"use client";

import React from "react";
import Link from "next/link"; // Adjust this if you are using a different routing solution
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Send,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import LogoContainer from "./logo-container";


export const Footer = () => {
  const menus = [
    { name: "Home", href: "/" },
    { name: "Vehicles", href: "/vehicles" },
    // { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400 py-10 rounded-3xl">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About Us */}
        <div className="flex flex-col">
          <LogoContainer isFooter />
          <h4 className="text-white text-lg font-bold mb-4">
            The Ultimate Marketplace
          </h4>
          <p className="text-gray-400 mb-4">
            AutoFind connects buyers and sellers of pre-owned vehicles with a
            seamless and trusted platform.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col">
          <h4 className="text-white text-lg font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {menus.map((menu) => (
              <li key={menu.name}>
                <Link
                  href={menu.href}
                  className="hover:text-blue-500 transition-colors"
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex flex-col">
          <h4 className="text-white text-lg font-bold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <Link
              href="https://facebook.com"
              aria-label="Facebook"
              className="hover:text-blue-500 transition-colors"
            >
              <Facebook size={24} />
            </Link>
            <Link
              href="https://twitter.com"
              aria-label="Twitter"
              className="hover:text-blue-500 transition-colors"
            >
              <Twitter size={24} />
            </Link>
            <Link
              href="https://instagram.com"
              aria-label="Instagram"
              className="hover:text-blue-500 transition-colors"
            >
              <Instagram size={24} />
            </Link>
          </div>
          <div className="mt-4">
            <p className="flex items-center mb-2">
              <MapPin className="mr-2 w-4 text-blue-500" />
              Tabanan
            </p>
            <p className="flex items-center mb-2">
              <Phone className="mr-2 w-4 text-blue-500" />
              +62 81237772015
            </p>
            <p className="flex items-center">
              <Mail className="mr-2 w-4 text-blue-500" />
              agussetiawaniputu@gmail.com
            </p>
          </div>
        </div>

        {/* Subscribe Section */}
        <div className="flex flex-col">
          <h4 className="text-white text-lg font-bold mb-4">
            Subscribe to Our Newsletter
          </h4>
          <form className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full bg-gray-800 border-gray-700 border flex items-center rounded-lg">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg bg-transparent text-gray-200 border-none  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                required
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-800 pt-4">
        <p className="text-center text-gray-500">
          © {new Date().getFullYear()} AutoFind. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;