import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

export function TierCards() {
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
      },
      trial: "Try 3 Properties for Free",
      pricing: {
        regular: {
          monthly: 14.95,
          annualEquivalent: 179.4,
        },
        introductory: {
          monthly: 12.95,
          annualEquivalent: 95.88,
          savingsPercentage: 36,
          term: "12 Mo.",
        },
      },
      payPerUse: true,
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
        regular: {
          monthly: 24.95,
          annualEquivalent: 299.4,
        },
        introductory: {
          monthly: 19.95,
          annualEquivalent: 177.0,
          savingsPercentage: 26,
          term: "12 Mo.",
        },
      },
      payPerUse: false,
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
        regular: {
          monthly: 32.99,
          annualEquivalent: 395.88,
        },
        introductory: {
          monthly: 24.99,
          annualEquivalent: 299.88,
          savingsPercentage: 24,
          term: "12 Mo.",
        },
      },
      payPerUse: false,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-5xl font-bold">Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.id}
            className="bg-white shadow-lg p-6 flex flex-col justify-between"
          >
            <div>
              <h1 className="flex text-3xl font-semibold mb-4 justify-center">
                {plan.title}
              </h1>
              <div className="space-y-4">
                {Object.entries(plan.categories).map(([key, category]) => (
                  <div key={key}>
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                    <ul className="space-y-2 mt-2">
                      {category.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {plan.additionalFeatures && (
                  <div>
                    <h3 className="text-lg font-semibold">
                      Additional Features
                    </h3>
                    <ul className="space-y-2 mt-2">
                      {plan.additionalFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center">
              {plan.pricing.introductory ? (
                <div className="text-center mb-2">
                  <div className="text-2xl font-bold">
                    ${plan.pricing.introductory.monthly}/month
                  </div>
                  <div className="text-sm text-gray-500">
                    Save {plan.pricing.introductory.savingsPercentage}% for{" "}
                    {plan.pricing.introductory.term}
                  </div>
                </div>
              ) : (
                <div className="text-2xl font-bold mb-2">
                  ${plan.pricing.regular.monthly}/month
                </div>
              )}
              {plan.trial && (
                <p className="mt-2 text-sm text-gray-600 italic">
                  {plan.trial}
                </p>
              )}
              <Link href="/dashboard">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Get {plan.title}
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
