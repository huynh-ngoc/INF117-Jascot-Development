// File: app/about/terms/page.jsx
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
  FileText,
  Shield,
  AlertTriangle,
  User,
  Database,
  Clock,
  Mail,
  CheckCircle,
  Lock,
  Scale,
  Globe,
  RefreshCw
} from "lucide-react";

export default function TermsPage() {
  const lastUpdated = "June 4, 2025";

  const termsSection = [
    {
      id: 1,
      title: "Acceptance of Terms",
      icon: <CheckCircle className="h-6 w-6 text-yellow-600" />,
      content: [
        "By accessing and using Reana's services, you agree to be bound by these Terms & Conditions.",
        "If you do not agree to these terms, please discontinue use of our platform immediately.",
        "These terms apply to all users, including visitors, registered users, and premium subscribers."
      ]
    },
    {
      id: 2,
      title: "Description of Service",
      icon: <Globe className="h-6 w-6 text-blue-600" />,
      content: [
        "Reana provides AI-powered real estate investment analysis tools and market insights.",
        "Our platform aggregates data from multiple sources to provide property analysis, cash flow projections, and market comparisons.",
        "Services include property analysis reports, market data visualization, investment calculators, and portfolio tracking tools."
      ]
    },
    {
      id: 3,
      title: "Data Sources & Accuracy",
      icon: <Database className="h-6 w-6 text-gray-500" />,
      content: [
        "Property data is populated from third-party APIs, public records, and AI-powered market analysis tools.",
        "While we strive for accuracy, we do not guarantee the completeness or accuracy of all data provided.",
        "Market conditions, property values, and other factors can change rapidly and may not be reflected in real-time.",
        "Users should verify all information independently before making investment decisions."
      ]
    },
    {
      id: 4,
      title: "User Responsibilities",
      icon: <User className="h-6 w-6 text-blue-600" />,
      content: [
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You must verify all data and perform your own due diligence before making any investment decisions.",
        "Users must not attempt to reverse engineer, hack, or compromise the platform's security.",
        "You agree to use the service only for lawful purposes and in accordance with these terms."
      ]
    },
    {
      id: 5,
      title: "Investment Disclaimer",
      icon: <AlertTriangle className="h-6 w-6 text-yellow-600" />,
      content: [
        "Reana provides informational tools only and does not constitute financial, investment, or legal advice.",
        "All investment decisions are made at your own risk and discretion.",
        "Past performance and projected returns do not guarantee future results.",
        "We strongly recommend consulting with qualified professionals before making significant investment decisions."
      ]
    },
    {
      id: 6,
      title: "Limitation of Liability",
      icon: <Shield className="h-6 w-6 text-gray-500" />,
      content: [
        "Reana and its affiliates are not liable for any investment losses based on platform insights or recommendations.",
        "Our liability is limited to the amount paid for our services in the preceding 12 months.",
        "We are not responsible for damages resulting from data inaccuracies, system downtime, or third-party service failures.",
        "Users acknowledge that real estate investing involves inherent risks and potential for loss."
      ]
    },
    {
      id: 7,
      title: "Privacy & Data Protection",
      icon: <Lock className="h-6 w-6 text-blue-600" />,
      content: [
        "We handle your personal data according to our Privacy Policy and applicable data protection laws.",
        "User data is encrypted and stored securely using industry-standard security measures.",
        "We do not sell personal information to third parties for marketing purposes.",
        "You have the right to access, modify, or delete your personal data as outlined in our Privacy Policy."
      ]
    },
    {
      id: 8,
      title: "Subscription & Billing",
      icon: <RefreshCw className="h-6 w-6 text-yellow-600" />,
      content: [
        "Subscription fees are billed according to the plan you select (monthly or annually).",
        "You may cancel your subscription at any time through your account settings.",
        "Refunds are provided according to our refund policy outlined in the billing section.",
        "Price changes will be communicated at least 30 days in advance."
      ]
    },
    {
      id: 9,
      title: "Intellectual Property",
      icon: <Scale className="h-6 w-6 text-gray-500" />,
      content: [
        "All content, software, and intellectual property on the Reana platform are owned by Reana or its licensors.",
        "Users are granted a limited, non-exclusive license to use the platform for its intended purpose.",
        "You may not copy, distribute, or create derivative works from our proprietary content without permission.",
        "User-generated content remains your property, but you grant us license to use it for platform improvement."
      ]
    },
    {
      id: 10,
      title: "Termination",
      icon: <AlertTriangle className="h-6 w-6 text-yellow-600" />,
      content: [
        "We reserve the right to terminate accounts that violate these terms or engage in prohibited activities.",
        "Upon termination, your access to the platform and associated data may be immediately revoked.",
        "You may terminate your account at any time by contacting customer support or through account settings.",
        "Termination does not relieve you of any outstanding payment obligations."
      ]
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
                  <BreadcrumbPage>Terms & Conditions</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2 px-8">
            <DarkLightSwitch className="place-content-center" />
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
          <div className="max-w-5xl mx-auto w-full space-y-6">
            {/* Header Section */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <FileText className="h-10 w-10 text-blue-600" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 via-blue-600 to-gray-500 bg-clip-text text-transparent">
                  Terms & Conditions
                </h1>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Please read these terms carefully before using Reana's property analysis platform.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Last updated: {lastUpdated}</span>
              </div>
            </div>

            {/* Quick Summary */}
            <Card className="bg-gradient-to-br from-yellow-50 via-blue-50 to-gray-50 border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Important Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Informational Tool Only</p>
                      <p className="text-sm text-gray-600">Reana provides analysis tools, not financial advice</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Verify All Data</p>
                      <p className="text-sm text-gray-600">Always confirm information before investing</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Limited Liability</p>
                      <p className="text-sm text-gray-600">We're not responsible for investment losses</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Privacy Protected</p>
                      <p className="text-sm text-gray-600">Your data is secure and confidential</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms Sections */}
            <div className="space-y-6">
              {termsSection.map((section, index) => (
                <Card key={section.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      {section.icon}
                      <span className="bg-gradient-to-r from-yellow-600 via-blue-600 to-gray-500 bg-clip-text text-transparent">
                        {index + 1}. {section.title}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {section.content.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Changes & Updates */}
            <Card className="bg-gradient-to-br from-blue-50 to-gray-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <RefreshCw className="h-5 w-5" />
                  Changes to Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  We reserve the right to modify these terms at any time. Material changes will be communicated to users via:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">Email notification</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                    <Globe className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">Platform announcement</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">30 days advance notice</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Continued use of the service after changes constitutes acceptance of the new terms.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-gradient-to-r from-yellow-600 via-blue-600 to-gray-500 text-white">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  If you have any questions about these Terms & Conditions, please don't hesitate to contact our legal team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="bg-white/20 backdrop-blur rounded-lg p-4 flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    <span>legal@reana.ai</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-lg p-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    <span>Privacy Policy Available</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Acceptance Notice */}
            <Card className="bg-gradient-to-br from-gray-50 to-yellow-50 border-2 border-yellow-200">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <CheckCircle className="h-6 w-6 text-yellow-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Acceptance Acknowledgment</h3>
                </div>
                <p className="text-gray-700">
                  By continuing to use Reana's services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}