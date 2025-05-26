"use client"

import React, { Suspense } from 'react';
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
import PropAnalysisDashboard from '@/components/prop-analysis/prop-analysis-dashboard';
import { useSearchParams } from "next/navigation";

function InnerPropAnalysisDashboardPage() {
  const params = useSearchParams();
  const address = params.get("address") ?? "Unknown";
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-8">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/prop-analysis-list">
                      Property List
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbLink href="#">
                    Property Analysis Dashboard
                  </BreadcrumbLink>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          <div className="px-8">
            <DarkLightSwitch className="place-content-center" />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 px-8 p-4 pt-0">
          <header >
            <h1 className="text-5xl font-bold">Property Analysis Dashboard</h1>
            <p className="mt-0 text-xl"></p>
          </header>
            <div>
                <PropAnalysisDashboard address={address}/>
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function PropAnalysisDashboardPage() {
    return (
      <Suspense fallback={<div>Loading…</div>}>
        <InnerPropAnalysisDashboardPage />
      </Suspense>
    );
  }