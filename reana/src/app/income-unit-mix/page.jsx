'use client';

import React, { useState } from 'react';
import UnitRentTable from './UnitRentTable';     
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import DarkLightSwitch from '@/components/mode-toggle/dark-light-switch';

export default function IncomeUnitMixPage() {    
  const [unitCount, setUnitCount] = useState(5);

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
                    Income Unit Mix
                  </BreadcrumbLink>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          <div className="px-8">
            <DarkLightSwitch className="place-content-center" />
          </div>
        </header>

        <div className="flex-1 flex flex-col gap-4 px-8 py-6">
          <header >
            <h1 className="text-5xl font-bold">Income Unit Mix</h1>
            <p className="mt-1 text-xl"></p>
          </header>

          <div className="flex items-center gap-2">
            <label htmlFor="unitCount"># of Units:</label>
            <input
              id="unitCount"
              type="number"
              min={1}
              className="w-20 border rounded p-1"
              value={unitCount}
              onChange={(e) => setUnitCount(Number(e.target.value))}
            />
          </div>

          {/* render the table */}
          <UnitRentTable unitCount={unitCount} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
