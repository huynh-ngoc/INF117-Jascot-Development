import React from 'react';
import Link from 'next/link';
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
import NeighborhoodMap from '@/components/map/neighborhood-map';

function neighborhoodMap() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-8">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/dashboard">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbLink href="#">
                      Neighborhood Map
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
            <h1 className="text-5xl font-bold">Neighborhood Map</h1>
            <p className="mt-1 text-xl"></p>
          </header>
            <div>
              {/* Example address */}
              <NeighborhoodMap address={"315 W Broadway, Fulton, NY 13069"} range={10}/>
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default neighborhoodMap;