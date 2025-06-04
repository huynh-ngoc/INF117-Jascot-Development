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
import { Card, CardContent } from "@/components/ui/card";

export default function TermsPage() {
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
                  <BreadcrumbPage>Terms & Conditions</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Terms & Conditions</h1>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><strong>Use of Service:</strong> Reana provides real estate investment tools for informational purposes only.</li>
                <li><strong>Data Sources:</strong> Populated from third-party APIs and AI models, accuracy is not guaranteed.</li>
                <li><strong>User Responsibility:</strong> You must verify data before making investment decisions.</li>
                <li><strong>Account Access:</strong> Keep your login credentials secure.</li>
                <li><strong>Limitations:</strong> We are not liable for investment losses based on Reana’s insights.</li>
                <li><strong>Privacy:</strong> We handle your data according to our privacy policy.</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                Continued use of the service implies acceptance of these terms. Terms may be updated from time to time.
              </p>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}