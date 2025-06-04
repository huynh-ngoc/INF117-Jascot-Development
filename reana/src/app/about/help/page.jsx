// File: app/about/help/page.jsx
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LifeBuoy,
  BookOpen,
  PlayCircle,
  MessageCircle,
  Mail,
  Phone,
  Search,
  FileText,
  Calculator,
  Share2,
  Bell,
  Users,
  CreditCard,
  Settings,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Clock,
  Zap,
  Target
} from "lucide-react";

export default function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const helpCategories = [
    {
      id: 1,
      title: "Getting Started",
      description: "Learn the basics of using Reana",
      icon: <Target className="h-6 w-6 text-green-500" />,
      articles: [
        { title: "How to analyze your first property", time: "5 min read" },
        { title: "Understanding the dashboard", time: "3 min read" },
        { title: "Setting up your account", time: "2 min read" },
        { title: "Choosing the right subscription plan", time: "4 min read" }
      ]
    },
    {
      id: 2,
      title: "Property Analysis",
      description: "Master property evaluation tools",
      icon: <Calculator className="h-6 w-6 text-blue-500" />,
      articles: [
        { title: "Understanding ROI calculations", time: "8 min read" },
        { title: "Cash flow analysis explained", time: "6 min read" },
        { title: "Interpreting market comparables", time: "7 min read" },
        { title: "Using the BRRRR calculator", time: "10 min read" }
      ]
    },
    {
      id: 3,
      title: "Reports & Data",
      description: "Generate and understand reports",
      icon: <FileText className="h-6 w-6 text-purple-500" />,
      articles: [
        { title: "Customizing your reports", time: "5 min read" },
        { title: "Exporting data and analysis", time: "3 min read" },
        { title: "Understanding financial assumptions", time: "7 min read" },
        { title: "Data sources and accuracy", time: "4 min read" }
      ]
    },
    {
      id: 4,
      title: "Account Management",
      description: "Manage your Reana account",
      icon: <Settings className="h-6 w-6 text-orange-500" />,
      articles: [
        { title: "Billing and subscription management", time: "4 min read" },
        { title: "Team collaboration features", time: "6 min read" },
        { title: "Notification preferences", time: "2 min read" },
        { title: "Security and privacy settings", time: "5 min read" }
      ]
    }
  ];

  const quickActions = [
    {
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      icon: <PlayCircle className="h-8 w-8 text-red-500" />,
      action: "Watch Now",
      color: "bg-red-50 border-red-200"
    },
    {
      title: "Live Chat Support",
      description: "Get instant help from our team",
      icon: <MessageCircle className="h-8 w-8 text-blue-500" />,
      action: "Start Chat",
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      icon: <Mail className="h-8 w-8 text-purple-500" />,
      action: "Send Email",
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: "Schedule a Call",
      description: "Book a one-on-one session",
      icon: <Phone className="h-8 w-8 text-green-500" />,
      action: "Book Now",
      color: "bg-green-50 border-green-200"
    }
  ];

  const popularArticles = [
    {
      title: "How to analyze your first property in 5 minutes",
      category: "Getting Started",
      views: "12.5k views",
      time: "5 min read"
    },
    {
      title: "Understanding cash flow vs. cash-on-cash return",
      category: "Analysis",
      views: "8.2k views", 
      time: "7 min read"
    },
    {
      title: "Setting up property alerts and notifications",
      category: "Features",
      views: "6.1k views",
      time: "3 min read"
    },
    {
      title: "Comparing multiple properties effectively",
      category: "Analysis",
      views: "5.8k views",
      time: "6 min read"
    }
  ];

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
                  <BreadcrumbPage>Help Center</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2 px-8">
            <DarkLightSwitch className="place-content-center" />
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
          <div className="max-w-6xl mx-auto w-full space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <LifeBuoy className="h-10 w-10 text-blue-500" />
                <h1 className="text-4xl font-bold text-gray-900">Help Center</h1>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about using Reana to analyze properties, generate reports, and make smarter real estate decisions.
              </p>
            </div>

            {/* Search Bar */}
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for help articles, guides, and tutorials..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Card key={index} className={`${action.color} hover:shadow-md transition-all cursor-pointer group`}>
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                      {action.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      {action.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Popular Articles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Popular Articles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {popularArticles.map((article, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer group">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span>{article.category}</span>
                        <span>•</span>
                        <span>{article.views}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {article.time}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Help Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {helpCategories.map((category) => (
                <Card key={category.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      {category.icon}
                      <div>
                        <h3 className="text-lg">{category.title}</h3>
                        <p className="text-sm text-gray-600 font-normal">{category.description}</p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {category.articles.map((article, index) => (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer group">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                            {article.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {article.time}
                        </div>
                      </div>
                    ))}
                    <Button variant="ghost" className="w-full mt-3 text-blue-600 hover:text-blue-700">
                      View All Articles
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Support Section */}
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold">Still need help?</h2>
                  <p className="text-blue-100 max-w-2xl mx-auto">
                    Can't find what you're looking for? Our dedicated support team is available 24/7 to help you succeed with your real estate investments.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <Button className="bg-white text-blue-600 hover:bg-gray-100">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Start Live Chat
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                      <Mail className="h-4 w-4 mr-2" />
                      Email: support@reana.ai
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                      <Phone className="h-4 w-4 mr-2" />
                      Schedule Call
                    </Button>
                  </div>
                  <div className="pt-4 border-t border-blue-400/30">
                    <p className="text-sm text-blue-200">
                      Average response time: <span className="font-semibold text-white">Under 2 hours</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 text-center">
                  <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h4 className="font-semibold text-green-800">Pro Tip</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Use keyboard shortcuts: Ctrl+N for new analysis, Ctrl+S to save reports
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 text-center">
                  <Bell className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h4 className="font-semibold text-blue-800">Stay Updated</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Enable notifications to get alerts when property values change
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <h4 className="font-semibold text-purple-800">Team Features</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    Upgrade to Pro to collaborate with team members on analyses
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}