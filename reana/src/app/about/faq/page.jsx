// File: app/about/faq/page.jsx
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

export default function FAQPage() {
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
                  <BreadcrumbPage>Q&A</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
              <ul className="space-y-4">
                <li>
                  <strong>Do I need to know real estate math to use Reana?</strong>
                  <p>No! Reana was designed for users who find spreadsheets overwhelming. Just enter a property address, and we handle the math.</p>
                </li>
                <li>
                  <strong>Can I use Reana for both rentals and flips?</strong>
                  <p>Yes. Reana supports various strategies including long-term rentals and fix-and-flips.</p>
                </li>
                <li>
                  <strong>Where does Reana get its data from?</strong>
                  <p>We pull data from trusted third-party providers and AI tools.</p>
                </li>
                <li>
                  <strong>Is my data saved?</strong>
                  <p>Yes, you can save, edit, and return to your reports at any time.</p>
                </li>
                <li>
                  <strong>Can I access Reana on mobile?</strong>
                  <p>Yes! While optimized for desktop, our mobile experience is supported and evolving.</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
