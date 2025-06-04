// File: app/about/help/page.jsx
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

export default function HelpCenterPage() {
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
                  <BreadcrumbPage>Help Center</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Help Center</h1>
              <ul className="space-y-3 text-gray-700">
                <li><strong>Getting Started:</strong> Enter an address to begin analysis. Reana autofills data from APIs.</li>
                <li><strong>Understanding Reports:</strong> Learn about ROI, cash flow, and financial assumptions.</li>
                <li><strong>Saving & Sharing:</strong> Save reports or share them (coming soon).</li>
                <li><strong>Notifications:</strong> Get alerts when saved properties change.</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                Still need help? Contact us at <a href="mailto:support@reana.ai" className="underline">support@reana.ai</a>
              </p>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
