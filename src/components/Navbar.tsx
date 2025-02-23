
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { FileText, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              to="/"
              className={cn(
                "inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium",
                location.pathname === "/" 
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              <FileText className="w-4 h-4 mr-2" />
              Form
            </Link>
            <Link
              to="/dashboard"
              className={cn(
                "inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium",
                location.pathname === "/dashboard"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
