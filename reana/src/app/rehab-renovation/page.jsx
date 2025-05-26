"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DarkLightSwitch from "@/components/mode-toggle/dark-light-switch";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export default function TotalInvestmentPage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const [investmentData, setInvestmentData] = useState([
    { item: "Down Payment", amount: 11500 },
    { item: "Loan Fees", amount: 5175 },
    { item: "Settlement/Attorney/Escrow Costs", amount: 3450 },
    { item: "Inspections", amount: 0 },
    { item: "Operating Cost through Yr 1 (Includes Capex)", amount: -17758 },
    { item: "Total Cash Investment Through Year One", amount: 37883 },
  ]);

  const handleAmountChange = (index, newAmount) => {
    const updatedData = [...investmentData];
    updatedData[index].amount = parseFloat(newAmount);
    setInvestmentData(updatedData);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center justify-between px-8">
          <div className="flex items-center gap-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink onClick={() => router.back()}>
                    Property Analysis Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbLink>Total Investment</BreadcrumbLink>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="px-8">
            <DarkLightSwitch className="place-content-center" />
          </div>
        </header>

        <div className="flex flex-col gap-6 px-8 pt-0 pb-12">
          <header className="mt-4">
            <h1 className="text-4xl font-bold">Cash Considerations / My Investment</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mt-2 text-blue-600 hover:underline text-sm"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </header>

          <div className="space-y-4">
            {investmentData.map(({ item, amount }, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4">
                  <div className="font-medium text-gray-800">{item}</div>
                  <div>
                    {isEditing ? (
                      <input
                        type="number"
                        className="border rounded px-2 py-1 w-32 text-right"
                        value={amount}
                        onChange={(e) => handleAmountChange(index, e.target.value)}
                      />
                    ) : (
                      <span
                        className={`text-lg font-semibold ${amount < 0 ? "text-red-600" : "text-green-700"}`}
                      >
                        $ {amount.toLocaleString()}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
