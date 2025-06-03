"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Home, TrendingUp, Calculator, MapPin } from "lucide-react";
import { TierCards } from "@/components/tiers/card-tiers";

export default function WelcomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Add your search logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          {/* Logo and Brand */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white p-3 rounded-full mr-4">
                <Home className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">Reana</h1>
                <p className="text-lg sm:text-xl text-blue-100">Real Estate Investment Assistant</p>
              </div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">
              Smart Real Estate Investment Analysis
            </h2>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto text-blue-100">
              Make informed investment decisions with comprehensive property analysis, market data, and financial projections
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
                <MapPin className="h-5 w-5 text-gray-400 ml-4" />
                <input
                  type="text"
                  placeholder="Enter property address or ZIP code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 px-4 py-4 text-gray-700 focus:outline-none text-lg"
                />
                <Button 
                  onClick={handleSearch}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-r-full transition-colors"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <Home className="h-16 w-16 text-white" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <TrendingUp className="h-20 w-20 text-white" />
        </div>
        <div className="absolute top-40 right-20 opacity-15">
          <Calculator className="h-12 w-12 text-white" />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Reana?</h3>
            <p className="text-lg text-gray-600">Powerful tools for smart real estate investments</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Calculator className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Advanced Analysis</h4>
              <p className="text-gray-600">Comprehensive financial analysis including cash flow, ROI, and risk assessment</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Market Data</h4>
              <p className="text-gray-600">Real-time market comparisons, rental rates, and neighborhood analytics</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Home className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Property Reports</h4>
              <p className="text-gray-600">Detailed investment reports and side-by-side property comparisons</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section - Tier Cards */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h3>
            <p className="text-lg text-gray-600">Select the perfect tier for your investment needs</p>
          </div>
          
          <TierCards />
        </div>
      </div>
    </div>
  );
}