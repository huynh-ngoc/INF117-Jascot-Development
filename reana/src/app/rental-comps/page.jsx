"use client"

import React, { Suspense }  from 'react';
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
import RentalComps from "@/components/maps/rental-comps"
import { useSearchParams, useRouter } from "next/navigation";

function InnerRentalCompsPage() {
  const router = useRouter();
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
                    <BreadcrumbLink onClick={() => router.back()}>
                      Property Analysis Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbLink >
                      Rental Comparables
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
            <h1 className="text-5xl font-bold">Rental Comparables</h1>
            <p className="mt-1 text-xl"></p>
          </header>
            <div>
              <RentalComps address={address}/>
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
export default function RentalCompsPage() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <InnerRentalCompsPage />
    </Suspense>
  );
}
