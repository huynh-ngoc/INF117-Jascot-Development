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
import { Card, CardContent } from "@/components/ui/card";

export default function OurStoryPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">About Us</BreadcrumbLink>
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
        <div className="max-w-3xl mx-auto p-6">
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-6 space-y-4">
              <h1 className="text-3xl font-bold">Our Story</h1>
              <p>
                Reana was born out of a simple realization: real estate investing is hard—especially if you're short on time, financial know-how, or technical skills.
              </p>
              <p>
                Whether you're a mom-and-pop investor, a first-time flipper, or a busy realtor, we believe you shouldn't need a finance degree to analyze deals with confidence. Our founders, frustrated with the complexity of spreadsheets and disconnected tools, envisioned a smarter way.
              </p>
              <p>
                That vision became Reana—an AI-powered real estate analyst that makes investment analysis simple, fast, and personalized.
              </p>
              <p>
                Today, Reana delivers tailored property insights, cash flow breakdowns, and market data with minimal input from users—helping you spot the right opportunity, at the right time, for the right price.
              </p>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}