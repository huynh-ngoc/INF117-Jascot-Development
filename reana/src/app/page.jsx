"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, Home, TrendingUp, Calculator, MapPin, X } from "lucide-react";
import { TierCards } from "@/components/tiers/card-tiers";

export default function WelcomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  const autocompleteService = useRef(null);
  const searchInputRef = useRef(null);

  // Load Google Maps API
  useEffect(() => {
    if (window.google && window.google.maps) {
      setIsGoogleMapsLoaded(true);
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setIsGoogleMapsLoaded(true);
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Handle input change and fetch predictions
  const handleSearchChange = (value) => {
    setSearchQuery(value);

    if (value.length > 2 && isGoogleMapsLoaded && autocompleteService.current) {
      const request = {
        input: value,
        types: ["address"],
        componentRestrictions: { country: "us" },
      };

      autocompleteService.current.getPlacePredictions(request, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPredictions(predictions.slice(0, 5));
        } else {
          setPredictions([]);
        }
      });
    } else {
      setPredictions([]);
    }
  };

  // Select an address from the suggestions
  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setSearchQuery(address);
    setPredictions([]);
    setShowSubscriptionModal(true);
  };

  // Open subscription modal when clicking "Search"
  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSelectedAddress(searchQuery);
      setShowSubscriptionModal(true);
    }
  };

  // Close modal
  const closeSubscriptionModal = () => {
    setShowSubscriptionModal(false);
    setSelectedAddress("");
  };

  // ✅ Redirect to /account with selected plan
  const handleSubscribe = (planType) => {
    console.log(`Subscribing to ${planType} for: ${selectedAddress}`);
    router.push(`/account?plan=${encodeURIComponent(planType)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          {/* Logo and Brand */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="flex aspect-square h-12 w-12 items-center justify-center rounded-lg overflow-hidden bg-white mr-4">
                <img
                  src="/reana-logo.png"
                  alt="Reana logo"
                  className="max-h-10 max-w-10 object-contain"
                />
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
                  ref={searchInputRef}
                  type="text"
                  placeholder="Enter property address or ZIP code..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 px-4 py-4 text-gray-700 focus:outline-none text-lg"
                  autoComplete="off"
                />
                <Button
                  onClick={handleSearch}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-r-full transition-colors"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>

              {predictions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
                  {predictions.map((prediction) => (
                    <div
                      key={prediction.place_id}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => handleAddressSelect(prediction.description)}
                    >
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {prediction.structured_formatting.main_text}
                          </p>
                          <p className="text-xs text-gray-500">
                            {prediction.structured_formatting.secondary_text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Subscribe to View Property Analysis
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Selected: {selectedAddress}
                </p>
              </div>
              <button
                onClick={closeSubscriptionModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="text-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Home className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Get Detailed Property Insights</h4>
                <p className="text-gray-600">
                  Subscribe to access comprehensive property analysis, market data, and investment calculations for this address.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleSubscribe("Basic")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors font-medium"
                >
                  Start with Plus Plan - $14.95/month
                </button>
                <button
                  onClick={() => handleSubscribe("Professional")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors font-medium"
                >
                  Get DoublePlus++ Plan - $24.95/month
                </button>
                <button
                  onClick={() => handleSubscribe("Enterprise")}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors font-medium"
                >
                  Choose Pro Plan - $32.99/month
                </button>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  All plans include free trial period. Cancel anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Section */}
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
