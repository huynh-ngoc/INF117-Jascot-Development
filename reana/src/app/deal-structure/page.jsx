"use client"

import React, { useState, useMemo } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { Card } from '@/components/ui/card';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from '@/components/ui/input';
import DarkLightSwitch from '@/components/mode-toggle/dark-light-switch';
import { useRouter } from 'next/navigation';

export default function DealStructurePage() {
  const router = useRouter();
  const [costOfSalePrc, setCostOfSalePrc] = useState(8);

  const offerPrice = 115000; // prop-analysis: Offer Price
  const lessRehabCost = 18315; // prop-analysis: less Rehab Cost
  const lessAcqCost = 8625; // prop-analysis: less Appreciation Cost
  const ARV = 175000; // prop-analysis: ARV
  const areaApprRate = 0.06; // prop-analysis: Area Appreciation Rate

  // Calculations
  const {
    totalInvestment,
    appreciation,
    totalSalePrice,
    lessCostOfSale,
    totalNet,
    netOpt,
    profitMargin,
    profitMarginPrc
  } = useMemo(() => {
    const totalInvestment   = offerPrice + lessRehabCost + lessAcqCost;
    const appreciation      = ARV * areaApprRate;
    const totalSalePrice    = appreciation + ARV;
    const lessCostOfSale    = totalSalePrice * (costOfSalePrc / 100);
    const totalNet          = totalSalePrice - lessCostOfSale;
    const netOpt            = 0;
    const profitMargin      = totalNet - totalInvestment + netOpt;
    const profitMarginPrc   = ((profitMargin / totalInvestment)*100).toFixed(2);
    return {
      totalInvestment,
      appreciation,
      totalSalePrice,
      lessCostOfSale,
      totalNet,
      netOpt,
      profitMargin,
      profitMarginPrc
    };
  }, [offerPrice, lessRehabCost, lessAcqCost, ARV, areaApprRate, costOfSalePrc]);

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
                    Deal Structure
                  </BreadcrumbLink>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="px-8">
            <DarkLightSwitch className="place-content-center" />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 px-8 p-4 mb-6">
          <header >
            <h1 className="text-5xl font-bold">Deal Structure</h1>
          </header>
          <div className="w-full mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-slate-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Profit Margin Calculation @ 1 yr.</h2>

            <Card className="p-6 rounded-lg shadow-inner mb-4">
                <div className="flex justify-between items-center text-xl border-b">
                    <span className="text-gray-600 dark:text-gray-300 mb-2">My offer Price:</span> 
                    <span className="font-medium">${offerPrice}</span>
                </div>
                <div className="flex justify-between items-center text-xl border-b">
                    <span className="text-gray-600 dark:text-gray-300 mb-2">Less Rehab Cost:</span> 
                    <span className="font-medium">${lessRehabCost}</span>
                </div>
                <div className="flex justify-between items-center text-xl border-b">
                    <span className="text-gray-600 dark:text-gray-300 mb-2">Less Acquisition Costs:</span> 
                    <span className="font-medium">${lessAcqCost}</span>
                </div>
                <div className="flex justify-between items-center text-xl border-b">
                    <span className="text-gray-600 dark:text-gray-300 mb-2">Total Investment:</span> 
                    <span className="font-medium">${totalInvestment}</span>
                </div>
            </Card>

            <Card className="p-6 rounded-lg shadow-inner mb-4">
                <h3 className="flex justify-between items-center text-xl font-bold">Sale Price 12 months</h3>
                <div className="flex justify-between items-center text-xl">
                    <span className="text-gray-600 dark:text-gray-300">ARV:</span>
                    <span className="font-medium">${ARV}</span>
                </div>
                <div className="flex justify-between items-center text-xl border-b">
                    <span className="text-gray-600 dark:text-gray-300 mb-2">Plus 1 yr Appreciation:</span>
                    <span className="font-medium">{appreciation}</span>
                </div>
                <div className="flex justify-between items-center text-xl">
                    <span className="text-gray-600 dark:text-gray-300">Total Sale Price:</span>
                    <span className="font-medium">${totalSalePrice}</span>
                </div>
                <div className="flex justify-between items-center text-xl">
                    <span className="text-gray-600 dark:text-gray-300">Less Cost of Sale:</span>
                    <span className="font-medium">${lessCostOfSale}</span>
                </div>
                <div className="flex justify-between items-center text-xl">
                    <span className="text-gray-600 dark:text-gray-300">Less Cost of Sale (%):</span>
                    <div className="flex gap-2 items-center">
                    <Input
                        type="number"
                        className="font-medium w-16 h-min"
                        value={costOfSalePrc}
                        min={1}
                        step={1}
                        onChange={e => {
                        const v = parseInt(e.target.value, 10);
                        setCostOfSalePrc(isNaN(v) ? 1 : v);
                        }}
                    />%
                    </div>
                </div>
            </Card>
            
            <Card className="p-6 rounded-lg shadow-inner">
                <div className="flex justify-between items-center text-xl font-bold border-b">
                    <span className="text-gray-600 dark:text-gray-300 mb-2">Total Net from Sale:</span> 
                    <span className="font-medium">${totalNet}</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold border-b">
                    <span className="text-gray-600 dark:text-gray-300 mb-2">Net from Operations:</span> 
                    <span className="font-medium">${netOpt}</span>
                </div>
                <div className="flex justify-between items-center mb-2 text-xl font-bold border-b">
                    <span className="text-gray-600 dark:text-gray-300 mb-2">Profit Margin:</span>
                    <div className="flex gap-2 items-center">
                        <span className="font-medium">${profitMargin}</span>
                        <span className="font-medium text-gray-500 dark:text-gray-300">|</span>
                        <span className="font-medium">{profitMarginPrc}%</span>
                    </div> 
                </div>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
