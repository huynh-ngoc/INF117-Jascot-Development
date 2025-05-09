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
        {/* … your header / breadcrumb / toggle … */}

        <div className="flex-1 flex flex-col gap-4 px-8 py-6">
          {/* … title / subtitle … */}

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
