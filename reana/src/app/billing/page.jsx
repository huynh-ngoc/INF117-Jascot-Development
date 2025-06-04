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
  CreditCard, 
  Calendar, 
  Download, 
  Edit3, 
  AlertCircle,
  ChevronRight,
  Star,
  Zap
} from 'lucide-react';

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState('plus');
  const [billingCycle, setBillingCycle] = useState('annual');
  const [showPlanModal, setShowPlanModal] = useState(false);

  // Current subscription data
  const currentSubscription = {
    plan: 'Plus +',
    status: 'Active',
    nextBilling: '2025-07-04',
    amount: billingCycle === 'annual' ? 95.88 : 12.95,
    cycle: billingCycle === 'annual' ? 'Annual' : 'Monthly'
  };

  // Billing history
  const billingHistory = [
    { date: '2025-06-04', amount: 95.88, status: 'Paid', invoice: '#INV-2025-001' },
    { date: '2025-05-04', amount: 12.95, status: 'Paid', invoice: '#INV-2025-002' },
    { date: '2025-04-04', amount: 12.95, status: 'Paid', invoice: '#INV-2025-003' },
    { date: '2025-03-04', amount: 12.95, status: 'Paid', invoice: '#INV-2025-004' }
  ];

  // Payment methods
  const paymentMethods = [
    { 
      id: 1, 
      type: 'Visa', 
      last4: '4242', 
      expiry: '12/26', 
      isDefault: true 
    },
    { 
      id: 2, 
      type: 'Mastercard', 
      last4: '5555', 
      expiry: '09/27', 
      isDefault: false 
    }
  ];

  // Plan options
  const planOptions = [
    {
      id: 'plus',
      title: 'Plus +',
      features: ['Quick Check Purchase Analysis', 'Some Automated Data', 'Basic Reports'],
      pricing: {
        monthly: 12.95,
        annual: 95.88,
        regularMonthly: 14.95
      }
    },
    {
      id: 'double-plus',
      title: 'Double Plus ++',
      features: ['Full Analysis', 'Enhanced Automated Data', 'Advanced Reports'],
      pricing: {
        monthly: 19.95,
        annual: 177.0,
        regularMonthly: 24.95
      },
      popular: true
    },
    {
      id: 'pro',
      title: 'Pro',
      features: ['Full Analysis', 'Complete Automated Data', 'All Reports'],
      pricing: {
        monthly: 24.99,
        annual: 299.88,
        regularMonthly: 32.99
      }
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePlanChange = (planId) => {
    setCurrentPlan(planId);
    setShowPlanModal(false);
    // In a real app, this would trigger an API call to change the subscription
  };

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
                  <BreadcrumbPage>Billing</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2 px-8">
            <DarkLightSwitch className="place-content-center" />
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="max-w-6xl mx-auto w-full space-y-6">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Subscription</h1>
              <p className="text-gray-600">Manage your subscription, billing, and payment methods</p>
            </div>

            {/* Current Subscription Overview */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">{currentSubscription.plan}</h2>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {currentSubscription.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-1">
                    Next billing: {formatDate(currentSubscription.nextBilling)}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${currentSubscription.amount} <span className="text-sm font-normal text-gray-600">/{currentSubscription.cycle.toLowerCase()}</span>
                  </p>
                  {billingCycle === 'annual' && (
                    <p className="text-sm text-green-600 font-medium">Save 36% with annual billing</p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowPlanModal(true)}
                    className="flex items-center gap-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    Change Plan
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Cancel Subscription
                  </Button>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Payment Methods */}
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
                    <Button variant="outline" size="sm">Add New Card</Button>
                  </div>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {method.type} •••• {method.last4}
                            </p>
                            <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                          </div>
                          {method.isDefault && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                              Default
                            </span>
                          )}
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Billing History */}
                <Card className="p-6 mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h3>
                  <div className="space-y-3">
                    {billingHistory.map((bill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">{formatDate(bill.date)}</p>
                            <p className="text-sm text-gray-500">{bill.invoice}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="font-medium text-gray-900">${bill.amount}</p>
                            <span className="text-sm text-green-600">{bill.status}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Usage & Quick Actions */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month's Usage</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Properties Analyzed</span>
                      <span className="font-medium">12 / Unlimited</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reports Generated</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">API Calls</span>
                      <span className="font-medium">245</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-between">
                      Update Billing Info
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between">
                      Download Tax Invoice
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between">
                      Billing Support
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </div>
            </div>

            {/* Plan Change Modal */}
            {showPlanModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Change Your Plan</h2>
                      <Button variant="ghost" onClick={() => setShowPlanModal(false)}>×</Button>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <span className="text-sm text-gray-600">Billing Cycle:</span>
                      <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                          className={`px-3 py-1 rounded text-sm ${billingCycle === 'monthly' ? 'bg-white shadow' : ''}`}
                          onClick={() => setBillingCycle('monthly')}
                        >
                          Monthly
                        </button>
                        <button
                          className={`px-3 py-1 rounded text-sm ${billingCycle === 'annual' ? 'bg-white shadow' : ''}`}
                          onClick={() => setBillingCycle('annual')}
                        >
                          Annual
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {planOptions.map((plan) => (
                        <Card 
                          key={plan.id} 
                          className={`p-4 cursor-pointer transition-all relative ${
                            currentPlan === plan.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-lg'
                          }`}
                          onClick={() => handlePlanChange(plan.id)}
                        >
                          {plan.popular && (
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                              <span className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                Most Popular
                              </span>
                            </div>
                          )}
                          
                          <div className="text-center mb-4">
                            <h3 className="text-lg font-semibold mb-2">{plan.title}</h3>
                            <div className="mb-2">
                              <span className="text-2xl font-bold">
                                ${billingCycle === 'annual' ? plan.pricing.annual : plan.pricing.monthly}
                              </span>
                              <span className="text-gray-600 text-sm">
                                /{billingCycle === 'annual' ? 'year' : 'month'}
                              </span>
                            </div>
                            {billingCycle === 'annual' && (
                              <p className="text-sm text-green-600">
                                Save ${((plan.pricing.regularMonthly * 12) - plan.pricing.annual).toFixed(2)} per year
                              </p>
                            )}
                          </div>
                          
                          <ul className="space-y-2 mb-4">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center text-sm">
                                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          
                          {currentPlan === plan.id ? (
                            <div className="text-center text-blue-600 font-medium">Current Plan</div>
                          ) : (
                            <Button className="w-full">
                              {plan.pricing.monthly > planOptions.find(p => p.id === currentPlan)?.pricing.monthly ? 'Upgrade' : 'Downgrade'}
                            </Button>
                          )}
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}