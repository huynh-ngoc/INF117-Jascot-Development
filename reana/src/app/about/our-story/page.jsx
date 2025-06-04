// File: app/about/our-story/page.jsx
import React from "react";
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
import { 
  Heart,
  Lightbulb,
  Target,
  Users,
  TrendingUp,
  MapPin,
  Calendar,
  Award,
  Rocket,
  Building,
  Brain,
  Zap
} from "lucide-react";

export default function OurStoryPage() {
  const milestones = [
    {
      year: "2022",
      title: "The Spark",
      description: "Our founders faced the same frustration: spending hours on spreadsheets just to analyze one property deal.",
      icon: <Lightbulb className="h-6 w-6 text-yellow-500" />
    },
    {
      year: "2023", 
      title: "Building the Vision",
      description: "We assembled a team of real estate experts and AI engineers to create the first prototype of Reana.",
      icon: <Building className="h-6 w-6 text-blue-500" />
    },
    {
      year: "2024",
      title: "AI-Powered Launch",
      description: "Launched our AI-powered platform, helping thousands of investors analyze properties in minutes, not hours.",
      icon: <Brain className="h-6 w-6 text-purple-500" />
    },
    {
      year: "2025",
      title: "Growing Impact",
      description: "Expanding our platform with advanced features, team collaboration, and comprehensive market analysis.",
      icon: <TrendingUp className="h-6 w-6 text-green-500" />
    }
  ];

  const values = [
    {
      title: "Simplicity First",
      description: "We believe complex analysis shouldn't require complex tools. Real estate investing should be accessible to everyone.",
      icon: <Zap className="h-8 w-8 text-blue-500" />
    },
    {
      title: "Data-Driven Decisions",
      description: "Every feature we build is backed by real market data and user feedback from actual investors.",
      icon: <Target className="h-8 w-8 text-green-500" />
    },
    {
      title: "Community Focused",
      description: "We're building for real people - from first-time investors to seasoned professionals.",
      icon: <Users className="h-8 w-8 text-purple-500" />
    },
    {
      title: "Continuous Innovation",
      description: "The real estate market evolves, and so do we. We're constantly improving to serve you better.",
      icon: <Rocket className="h-8 w-8 text-orange-500" />
    }
  ];

  const stats = [
    { number: "10,000+", label: "Properties Analyzed", icon: <Building className="h-6 w-6 text-blue-500" /> },
    { number: "5,000+", label: "Happy Investors", icon: <Users className="h-6 w-6 text-green-500" /> },
    { number: "50+", label: "Markets Covered", icon: <MapPin className="h-6 w-6 text-purple-500" /> },
    { number: "99.2%", label: "Accuracy Rate", icon: <Award className="h-6 w-6 text-yellow-500" /> }
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
                  <BreadcrumbPage>Our Story</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2 px-8">
            <DarkLightSwitch className="place-content-center" />
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-8 p-4 pt-0">
          <div className="max-w-5xl mx-auto w-full space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Heart className="h-10 w-10 text-red-500" />
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Our Story
                </h1>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Born from frustration, built with passion, and driven by the belief that smart real estate investing should be accessible to everyone.
              </p>
            </div>

            {/* Main Story */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Reana was born out of a simple realization: <strong>real estate investing is hard</strong>—especially if you're short on time, financial know-how, or technical skills.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Whether you're a mom-and-pop investor, a first-time flipper, or a busy realtor, we believe you shouldn't need a finance degree to analyze deals with confidence. Our founders, frustrated with the complexity of spreadsheets and disconnected tools, envisioned a smarter way.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    That vision became <strong>Reana</strong>—an AI-powered real estate analyst that makes investment analysis simple, fast, and personalized.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Today, Reana delivers tailored property insights, cash flow breakdowns, and market data with minimal input from users—helping you spot the right opportunity, at the right time, for the right price.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Stats Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-2xl">Our Impact in Numbers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-3">
                        {stat.icon}
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Calendar className="h-6 w-6 text-blue-500" />
                  Our Journey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          {milestone.icon}
                        </div>
                        {index < milestones.length - 1 && (
                          <div className="w-0.5 h-16 bg-gray-200 mt-4"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {milestone.year}
                          </span>
                          <h3 className="text-xl font-semibold text-gray-900">{milestone.title}</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Values Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-2xl">What Drives Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        {value.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mission Statement */}
            <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-xl text-purple-100 mb-6 max-w-3xl mx-auto">
                  To democratize real estate investing by making professional-grade property analysis accessible, affordable, and actionable for everyone.
                </p>
                <div className="flex justify-center">
                  <div className="bg-white/20 backdrop-blur rounded-lg p-4 inline-flex items-center gap-2">
                    <Rocket className="h-6 w-6" />
                    <span className="font-medium">Building the future of real estate investing</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Story</h2>
                <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                  Every property you analyze, every deal you close, and every success you achieve becomes part of the Reana story. We're honored to be part of your real estate journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="font-medium text-gray-900">Join thousands of investors</p>
                    <p className="text-sm text-gray-600">Making smarter decisions daily</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <p className="font-medium text-gray-900">Grow your portfolio</p>
                    <p className="text-sm text-gray-600">With data-driven insights</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <p className="font-medium text-gray-900">Built with care</p>
                    <p className="text-sm text-gray-600">For real estate investors</p>
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