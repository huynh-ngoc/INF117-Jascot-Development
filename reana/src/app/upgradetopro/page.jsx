"use client"

import React, { useState } from 'react';
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import DarkLightSwitch from "@/components/mode-toggle/dark-light-switch";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Check, 
  Star,
  Zap,
  Crown,
  Sparkles,
  TrendingUp,
  Shield,
  Clock,
  Users,
  BarChart3,
  FileText,
  Headphones
} from 'lucide-react';

export default function UpgradeProPage() {
  const [billingCycle, setBillingCycle] = useState('annual');
  const [selectedPlan, setSelectedPlan] = useState('pro');

  const currentPlan = {
    name: 'Plus +',
    features: ['Quick Check Purchase Analysis', 'Some Automated Data', 'Basic Reports'],
    price: billingCycle === 'annual' ? 95.88 : 12.95
  };

  const proFeatures = [
    {
      icon: <BarChart3 className="h-6 w-6 text-blue-500" />,
      title: "Advanced Analytics",
      description: "Deep dive into property data with comprehensive market analysis and trend insights"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-green-500" />,
      title: "Predictive Modeling",
      description: "AI-powered predictions for property values, market trends, and investment opportunities"
    },
    {
      icon: <FileText className="h-6 w-6 text-purple-500" />,
      title: "Unlimited Reports",
      description: "Generate unlimited detailed reports with custom branding and export options"
    },
    {
      icon: <Shield className="h-6 w-6 text-orange-500" />,
      title: "Priority Support",
      description: "24/7 premium support with dedicated account manager and live chat"
    },
    {
      icon: <Users className="h-6 w-6 text-indigo-500" />,
      title: "Team Collaboration",
      description: "Share insights with team members, set permissions, and collaborate on projects"
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "API Access",
      description: "Full API access with higher rate limits for custom integrations"
    }
  ];

  const planComparison = [
    {
      feature: "Properties Analyzed",
      plus: "50/month",
      pro: "Unlimited"
    },
    {
      feature: "Reports Generated",
      plus: "10/month",
      pro: "Unlimited"
    },
    {
      feature: "Data Export",
      plus: "Basic CSV",
      pro: "Advanced formats (PDF, Excel, API)"
    },
    {
      feature: "Support",
      plus: "Email support",
      pro: "24/7 Priority + Phone"
    },
    {
      feature: "Team Members",
      plus: "1 user",
      pro: "Up to 10 users"
    },
    {
      feature: "API Calls",
      plus: "1,000/month",
      pro: "50,000/month"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Real Estate Investor",
      content: "The Pro plan transformed how I analyze properties. The predictive modeling helped me identify a 25% ROI opportunity I would have missed.",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Property Manager",
      content: "Team collaboration features are game-changing. Our entire team can now access insights and make data-driven decisions together.",
      avatar: "MC"
    },
    {
      name: "Jessica Rivera",
      role: "Real Estate Agent",
      content: "The unlimited reports and custom branding help me provide premium service to my clients. Worth every penny.",
      avatar: "JR"
    }
  ];

  const proPrice = billingCycle === 'annual' ? 299.88 : 24.99;
  const regularPrice = billingCycle === 'annual' ? 395.88 : 32.99;
  const savings = regularPrice - proPrice;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Upgrade to Pro</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2 px-8">
            <DarkLightSwitch className="place-content-center" />
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="max-w-6xl mx-auto w-full space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Crown className="h-8 w-8 text-yellow-500" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Upgrade to Pro
                </h1>
              </div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Unlock the full potential of property analysis with advanced features, unlimited access, and priority support.
              </p>
              
              {/* Billing Cycle Toggle */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <span className="text-sm text-gray-600">Billing Cycle:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                      billingCycle === 'monthly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
                    }`}
                    onClick={() => setBillingCycle('monthly')}
                  >
                    Monthly
                  </button>
                  <button
                    className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                      billingCycle === 'annual' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
                    }`}
                    onClick={() => setBillingCycle('annual')}
                  >
                    Annual
                  </button>
                </div>
                {billingCycle === 'annual' && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    Save 24%
                  </span>
                )}
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Current Plan */}
              <Card className="p-6 relative">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">Current Plan: Plus +</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">
                      ${currentPlan.price}
                    </span>
                    <span className="text-gray-600">
                      /{billingCycle === 'annual' ? 'year' : 'month'}
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    {currentPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              {/* Pro Plan */}
              <Card className="p-6 relative border-2 border-blue-500 bg-gradient-to-b from-blue-50 to-white">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Sparkles className="h-4 w-4" />
                    Recommended
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-500" />
                    Pro Plan
                  </h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      ${proPrice}
                    </span>
                    <span className="text-gray-600">
                      /{billingCycle === 'annual' ? 'year' : 'month'}
                    </span>
                  </div>
                  {billingCycle === 'annual' && (
                    <p className="text-sm text-green-600 font-medium mb-4">
                      Save ${savings.toFixed(2)} per year
                    </p>
                  )}
                  <ul className="space-y-2 text-sm mb-6">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Everything in Plus +
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Unlimited Properties & Reports
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Advanced Analytics & AI
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Team Collaboration
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Priority Support
                    </li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                    Upgrade to Pro
                  </Button>
                </div>
              </Card>
            </div>

            {/* Pro Features */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">What You'll Get with Pro</h2>
                <p className="text-gray-600">Powerful features designed to supercharge your property analysis</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {proFeatures.map((feature, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        {feature.icon}
                        <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Comparison Table */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Feature Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Feature</th>
                      <th className="text-center py-3 px-4">Plus +</th>
                      <th className="text-center py-3 px-4 bg-blue-50 rounded-t">
                        <span className="flex items-center justify-center gap-1">
                          <Crown className="h-4 w-4 text-yellow-500" />
                          Pro
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {planComparison.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4 font-medium">{item.feature}</td>
                        <td className="py-3 px-4 text-center text-gray-600">{item.plus}</td>
                        <td className="py-3 px-4 text-center bg-blue-50 font-medium text-blue-700">
                          {item.pro}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Testimonials */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">What Our Pro Users Say</h2>
                <p className="text-gray-600">Join thousands of satisfied professionals</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="p-6">
                    <div className="space-y-4">
                      <p className="text-gray-600 italic">"{testimonial.content}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{testimonial.name}</p>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Final CTA */}
            <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Ready to Unlock Your Potential?</h2>
                <p className="text-blue-100">Join thousands of professionals already using Pro features</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100">
                    Start 14-Day Free Trial
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                    Schedule Demo
                  </Button>
                </div>
                <p className="text-sm text-blue-200">No credit card required • Cancel anytime</p>
              </div>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}