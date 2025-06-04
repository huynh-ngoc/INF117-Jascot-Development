// File: app/about/faq/page.jsx
"use client"

import React, { useState } from "react";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DarkLightSwitch from "@/components/mode-toggle/dark-light-switch";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  MessageCircle, 
  Mail,
  Phone,
  Search,
  Calculator,
  BarChart3,
  Smartphone,
  Shield,
  Clock
} from "lucide-react";

export default function FAQPage() {
  const [expandedItems, setExpandedItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const faqData = [
    {
      id: 1,
      category: "Getting Started",
      icon: <Calculator className="h-5 w-5 text-blue-500" />,
      question: "Do I need to know real estate math to use Reana?",
      answer: "Not at all! Reana was specifically designed for users who find spreadsheets overwhelming and complex calculations intimidating. Simply enter a property address, and our AI-powered platform handles all the mathematical calculations, market analysis, and financial projections automatically. You'll get professional-grade insights without needing to understand the underlying formulas."
    },
    {
      id: 2,
      category: "Features",
      icon: <BarChart3 className="h-5 w-5 text-green-500" />,
      question: "Can I use Reana for both rentals and flips?",
      answer: "Absolutely! Reana supports multiple real estate investment strategies including long-term rentals, short-term rentals (Airbnb), BRRRR method, fix-and-flips, wholesale deals, and buy-and-hold investments. Our analysis adapts to your chosen strategy and provides relevant metrics and projections for each approach."
    },
    {
      id: 3,
      category: "Data Sources",
      icon: <Shield className="h-5 w-5 text-purple-500" />,
      question: "Where does Reana get its data from?",
      answer: "We aggregate data from multiple trusted sources including MLS databases, public records, market data providers like CoreLogic and RentSpree, local government databases, and AI-powered market analysis tools. Our data is updated regularly to ensure accuracy and includes comparable sales, rental rates, neighborhood trends, and economic indicators."
    },
    {
      id: 4,
      category: "Data Management",
      icon: <Clock className="h-5 w-5 text-orange-500" />,
      question: "Is my data saved and secure?",
      answer: "Yes! All your property analyses, reports, and personal data are securely saved to your account with enterprise-grade encryption. You can access, edit, and return to your reports anytime from any device. We follow strict data privacy protocols and never share your information with third parties."
    },
    {
      id: 5,
      category: "Platform Access",
      icon: <Smartphone className="h-5 w-5 text-indigo-500" />,
      question: "Can I access Reana on mobile devices?",
      answer: "Yes! While Reana is optimized for desktop use to provide the best experience for detailed analysis, our mobile-responsive design ensures you can access your reports, view properties, and perform basic analyses on smartphones and tablets. Our mobile experience continues to evolve with new features."
    },
    {
      id: 6,
      category: "Pricing",
      icon: <HelpCircle className="h-5 w-5 text-pink-500" />,
      question: "What's included in each subscription plan?",
      answer: "Our Plus+ plan includes quick purchase analysis, basic automated data, and essential reports. The Double Plus++ plan adds enhanced analysis, advanced automated data, and comprehensive reporting. Our Pro plan provides unlimited analysis, complete data automation, all report types, team collaboration, priority support, and API access."
    },
    {
      id: 7,
      category: "Getting Started",
      icon: <Search className="h-5 w-5 text-teal-500" />,
      question: "How accurate are the property valuations?",
      answer: "Our AI-powered valuations combine multiple data sources and methodologies to provide highly accurate estimates, typically within 5-10% of actual market value. However, we always recommend conducting your own due diligence and getting professional appraisals for final investment decisions."
    },
    {
      id: 8,
      category: "Support",
      icon: <MessageCircle className="h-5 w-5 text-red-500" />,
      question: "What kind of support do you offer?",
      answer: "We provide comprehensive support including email support for all users, priority support for Pro subscribers, live chat during business hours, detailed documentation, video tutorials, and webinars. Pro users also get access to a dedicated account manager for personalized assistance."
    }
  ];

  const categories = [...new Set(faqData.map(item => item.category))];

  const filteredFAQs = faqData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpanded = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
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
                  <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/about">About Us</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>FAQ</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2 px-8">
            <DarkLightSwitch className="place-content-center" />
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
          <div className="max-w-4xl mx-auto w-full space-y-6">
            {/* Header Section */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <HelpCircle className="h-8 w-8 text-blue-500" />
                <h1 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
              </div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about Reana's property analysis platform, features, and how to get started.
              </p>
            </div>

            {/* Search Bar */}
            <Card className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search frequently asked questions..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </Card>

            {/* FAQ Categories */}
            {searchTerm === "" && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <Card key={category} className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                    <h3 className="font-semibold text-gray-900">{category}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {faqData.filter(item => item.category === category).length} questions
                    </p>
                  </Card>
                ))}
              </div>
            )}

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFAQs.length === 0 ? (
                <Card className="p-8 text-center">
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">Try adjusting your search terms or browse our categories above.</p>
                </Card>
              ) : (
                filteredFAQs.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleExpanded(item.id)}
                        className="w-full p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="flex-shrink-0 mt-1">
                              {item.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                                  {item.category}
                                </span>
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {item.question}
                              </h3>
                            </div>
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            {expandedItems[item.id] ? (
                              <ChevronUp className="h-5 w-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </button>
                      
                      {expandedItems[item.id] && (
                        <div className="px-6 pb-6 border-t bg-gray-50">
                          <div className="pt-4 pl-9">
                            <p className="text-gray-700 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Contact Support Section */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Still have questions?</h2>
                  <p className="text-gray-600">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Live Chat
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Support
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Schedule Call
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}