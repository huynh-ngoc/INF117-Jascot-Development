"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

export function TierCards() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const pricingPlans = [
    {
      id: 1,
      title: "Plus +",
      categories: {
        analysis: {
          title: "Quick Check Purchase Analysis",
          features: [
            "Unit Mix and Rental Variables",
            "Rehab Costs",
            "Financing Options",
            "Financing Costs",
            "Acquisition Costs",
            "Operating Costs",
            "No Deal At Risk Costs",
            "Ratios",
          ],
        },
        automation: {
          title: "Some Automated Data",
          features: [],
        },
        reports: {
          title: "Reports",
          features: ["Side by Side Comparisons", "Investor Summary"],
        },
        uploads: {
          title: "Data Uploads",
          features: [],
        },
      },
      trial: "Try 3 Properties for Free",
      pricing: {
        regular: 14.95,
        introductory: {
          monthly: 12.95,
          annual: 95.88,
          savings: 36,
        },
      },
      payPerUse: "Don't want a subscription\nUse our Pay-Per-Use Feature",
    },
    {
      id: 2,
      title: "Double Plus ++",
      categories: {
        analysis: {
          title: "Full Analysis (Including)",
          features: [
            "Unit Mix and Rental Variables",
            "Rehab Costs",
            "Financing Options",
            "Financing Costs",
            "Acquisition Costs",
            "Operating Costs",
            "No Deal At Risk Costs",
            "Ratios",
          ],
        },
        automation: {
          title: "Enhanced Automated Data",
          features: [
            "Property Information",
            "Property Location",
            "Area Demographics",
            "Rental Comps",
            "Sales Comps",
          ],
        },
        reports: {
          title: "Reports",
          features: ["Property Comparison", "Investor Summary"],
        },
      },
      pricing: {
        regular: 24.95,
        introductory: {
          monthly: 19.95,
          annual: 177.0,
          savings: 26,
        },
      },
    },
    {
      id: 3,
      title: "Pro",
      categories: {
        analysis: {
          title: "Full Analysis (Including)",
          features: [
            "Unit Mix and Rental Variables",
            "Rehab Costs",
            "Financing Options",
            "Financing Costs",
            "Acquisition Costs",
            "Operating Costs",
            "No Deal At Risk Costs",
            "Ratios",
          ],
        },
        automation: {
          title: "Full Automated Data",
          features: [
            "Property Information",
            "Property Location",
            "Area Demographics",
            "Rental Comps",
            "Sales Comps",
          ],
        },
        reports: {
          title: "Reports",
          features: ["Property Comparison", "Investor Summary"],
        },
      },
      pricing: {
        regular: 32.99,
        introductory: {
          monthly: 24.99,
          annual: 299.88,
          savings: 24,
        },
      },
    },
  ];

  return (
    <div className="h-screen w-full p-2 sm:p-3 lg:p-4">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-center mb-2 sm:mb-3 lg:mb-4 flex-shrink-0">
          Plans
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 flex-1 min-h-0">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`bg-white shadow-lg p-2 sm:p-3 lg:p-4 flex flex-col h-full transition-all duration-300 ease-in-out cursor-pointer ${
                hoveredCard === null
                  ? "hover:shadow-xl hover:scale-105"
                  : hoveredCard === plan.id
                  ? "shadow-xl scale-105 z-10"
                  : "blur-sm opacity-70"
              }`}
              onMouseEnter={() => setHoveredCard(plan.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Header */}
              <div className="text-center mb-2 sm:mb-3 flex-shrink-0">
                <h2 className="text-sm sm:text-base lg:text-2xl font-semibold mb-1 sm:mb-2">
                  {plan.title}
                </h2>
                {plan.subtitle && (
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-2">
                    {plan.subtitle}
                  </p>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-h-0 space-y-1 sm:space-y-2 overflow-y-auto">
                {Object.entries(plan.categories).map(([key, category]) => (
                  <div key={key} className="space-y-1">
                    <h3 className="text-sm sm:text-sm lg:text-base font-semibold text-gray-800">
                      {category.title}
                    </h3>
                    {category.features.length > 0 ? (
                      <ul className="space-y-0.5">
                        {category.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-2 w-2 sm:h-2.5 sm:w-2.5 lg:h-3 lg:w-3 mr-1 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-xs lg:text-sm text-gray-600 leading-tight">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-xs sm:text-xs lg:text-sm text-gray-500 italic">
                        {category.title === "Data Uploads?"
                          ? category.title
                          : "No additional features"}
                      </div>
                    )}
                  </div>
                ))}

                {/* Trial */}
                {plan.trial && (
                  <div className="bg-green-50 p-2 rounded text-center">
                    <p className="text-xs sm:text-sm lg:text-base text-green-600 font-medium rounded-b-2xl">
                      {plan.trial}
                    </p>
                  </div>
                )}
              </div>

              {/* Pricing and Button Section */}
              <div className="mt-2 sm:mt-3 pt-2 border-t flex-shrink-0">
                {/* Regular Price */}
                <div className="mb-2 text-center">
                  <p className="text-xs sm:text-sm lg:text-base font-semibold text-gray-700">
                    Regular Price
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-800">
                    ${plan.pricing.regular} Per Month
                  </p>
                </div>

                {/* Introductory Offer */}
                {plan.pricing.introductory && (
                  <div className="mb-3 p-2 bg-red-50 rounded text-center">
                    <p className="text-xs sm:text-sm lg:text-base font-semibold text-red-700">
                      12 Mo. Introductory Offer
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg font-bold text-red-800">
                      ${plan.pricing.introductory.monthly} Per Month
                    </p>
                    <p className="text-xs sm:text-sm lg:text-base text-red-600">
                      (Paid Annually ${plan.pricing.introductory.annual})
                    </p>
                    <p className="text-xs sm:text-sm lg:text-base text-green-600 font-medium">
                      Save {plan.pricing.introductory.savings}%
                    </p>
                  </div>
                )}

                {/* Pay Per Use Option*/}
                {plan.payPerUse && (
                  <div className="text-center text-xs text-gray-500 mb-2 px-1">
                    <p className="leading-tight">Pay-Per-Use Available</p>
                  </div>
                )}

                <Link href="/dashboard" className="w-full">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm lg:text-base py-1.5 sm:py-2">
                    Subscribe
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
