// src/app/archive/page.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Bot,
  Settings2,
  DollarSign,
  SquareTerminal,
  Ruler,
  Receipt,
  ArrowRight,
} from "lucide-react";

const archivedFeatures = [
  {
    title: "Realtor Profile",
    description: "Manage realtor information and profiles",
    url: "/realtor-pop-up",
    icon: BookOpen,
    category: "Profiles"
  },
  {
    title: "Investor Cash",
    description: "Track and manage investor cash flow",
    url: "/investor-cash",
    icon: SquareTerminal,
    category: "Finance"
  },
  {
    title: "Income Unit Mix",
    description: "Analyze income and unit mix strategies",
    url: "/income-unit-mix",
    icon: Bot,
    category: "Analysis"
  },
  {
    title: "DSCR Bridge Loan",
    description: "Calculate DSCR bridge loan metrics",
    url: "/dscr-bridge-loan",
    icon: BookOpen,
    category: "Loans"
  },
  {
    title: "DSCR Bridge Perm",
    description: "Permanent DSCR bridge loan calculations",
    url: "/dscr-bridge-perm",
    icon: SquareTerminal,
    category: "Loans"
  },
  {
    title: "DSCR Bridge Rehab",
    description: "Rehabilitation DSCR bridge loan analysis",
    url: "/dscr-bridge-rehab",
    icon: Bot,
    category: "Loans"
  },
  {
    title: "Rule of Thumb Metrics",
    description: "Quick calculation metrics and ratios",
    url: "/rule-of-thumb-metrics",
    icon: Ruler,
    category: "Calculations"
  },
  {
    title: "Rule of Thumb Operating Budget",
    description: "Operating budget rule of thumb calculations",
    url: "/rule-of-thumb-opr-budget",
    icon: Ruler,
    category: "Calculations"
  },
  {
    title: "Rule of Thumb Loan Cost",
    description: "Loan cost estimation tools",
    url: "/rule-of-thumb-loan-cost",
    icon: Ruler,
    category: "Calculations"
  },
  {
    title: "Rule of Thumb Loan Terms",
    description: "Loan terms and conditions calculator",
    url: "/rule-of-thumb-loan-terms",
    icon: Ruler,
    category: "Calculations"
  },
  {
    title: "Existing Loan",
    description: "Existing loan analysis and management",
    url: "/existing-loan",
    icon: Ruler,
    category: "Loans"
  },
  {
    title: "Rehab and Renovation",
    description: "Rehabilitation and renovation cost planning",
    url: "/rehab-renovation",
    icon: Ruler,
    category: "Planning"
  },
  {
    title: "Detailed Lender Fees 1st",
    description: "First mortgage lender fees breakdown",
    url: "/detailed-lender-fees-1st",
    icon: SquareTerminal,
    category: "Fees"
  },
  {
    title: "Detailed Lender Fees 2nd",
    description: "Second mortgage lender fees breakdown",
    url: "/detailed-lender-fees-2nd",
    icon: SquareTerminal,
    category: "Fees"
  },
  {
    title: "Detailed Inspection Fees",
    description: "Property inspection fees calculator",
    url: "/detailed-inspection-fees",
    icon: SquareTerminal,
    category: "Fees"
  },
  {
    title: "Detailed Settlement Fees",
    description: "Settlement and closing fees breakdown",
    url: "/detailed-settlement-fees",
    icon: SquareTerminal,
    category: "Fees"
  },
  {
    title: "Reports Page",
    description: "Generate comprehensive investment reports",
    url: "/reports",
    icon: SquareTerminal,
    category: "Reports"
  },
  {
    title: "LTR-BRRRR Operating Budget",
    description: "Long-term rental BRRRR operating budget",
    url: "/ltr-brrrr-operbudget",
    icon: Receipt,
    category: "Budgets"
  },
  {
    title: "Fix-n-Flip Operating Budget",
    description: "Fix and flip project operating budget",
    url: "/fix-n-flip-operbudget",
    icon: Receipt,
    category: "Budgets"
  },
  {
    title: "Total Investment",
    description: "Total investment calculation and analysis",
    url: "/total-investment",
    icon: Receipt,
    category: "Analysis"
  },
];

const categories = [...new Set(archivedFeatures.map(feature => feature.category))];

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Feature Archive</h1>
          <p className="text-gray-600">
            Access archived features and tools. These features are preserved for development and testing purposes.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-2xl font-bold text-blue-600">{archivedFeatures.length}</div>
            <div className="text-sm text-gray-500">Total Features</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-2xl font-bold text-green-600">{categories.length}</div>
            <div className="text-sm text-gray-500">Categories</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-2xl font-bold text-purple-600">
              {archivedFeatures.filter(f => f.category === 'Calculations').length}
            </div>
            <div className="text-sm text-gray-500">Calculators</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-2xl font-bold text-orange-600">
              {archivedFeatures.filter(f => f.category === 'Loans').length}
            </div>
            <div className="text-sm text-gray-500">Loan Tools</div>
          </div>
        </div>

        {/* Features by Category */}
        {categories.map(category => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              {category}
              <span className="ml-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                {archivedFeatures.filter(f => f.category === category).length}
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {archivedFeatures
                .filter(feature => feature.category === category)
                .map((feature, index) => (
                  <Link
                    key={index}
                    href={feature.url}
                    className="group bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-all duration-200 hover:border-blue-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <feature.icon className="h-6 w-6 text-blue-600 mr-3" />
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {feature.title}
                        </h3>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="mt-4 text-xs text-blue-600 font-medium">
                      Access Feature →
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        ))}

        {/* Footer Note */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Developer Note</h3>
          <p className="text-blue-800 text-sm">
            These features have been archived from the main navigation to streamline the user experience. 
            All functionality remains intact and accessible through this archive page. Future developers 
            can restore any feature to the main navigation by updating the sidebar configuration.
          </p>
        </div>
      </div>
    </div>
  );
}