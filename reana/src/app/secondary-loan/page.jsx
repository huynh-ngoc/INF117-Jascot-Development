"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export default function SecondaryLoanPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/existing-loan");
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center justify-between px-8 border-b border-[#4F5D75]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/dashboard"
                  className="text-[#00A3E0] font-montserrat hover:text-[#0077AC]"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/existing-loan"
                  className="text-[#00A3E0] font-montserrat hover:text-[#0077AC]"
                >
                  Existing Loan
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="#"
                  className="text-[#2D3142] font-montserrat"
                >
                  Secondary Loan
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-center space-y-6 max-w-md">
            <div className="bg-[#F8F9FA] border border-[#4F5D75] rounded-lg p-8">
              <h1 className="text-3xl font-bold text-[#2D3142] font-montserrat mb-4">
                Secondary Loan
              </h1>

              <div className="text-6xl mb-4">🚧</div>

              <p className="text-lg text-[#2D3142] font-lato mb-6">To Do</p>

              <p className="text-sm text-gray-600 font-lato">
                This page is under construction. Secondary loan functionality
                will be implemented soon.
              </p>
            </div>

            <Button
              variant="outline"
              onClick={handleBack}
              className="font-montserrat"
            >
              Back to Existing Loan
            </Button>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
