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

  const formatUSD = (val) => {
    return `$ ${Number(val).toLocaleString(undefined, { minimumFractionDigits: 0 })}`;
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
          <header className="mt-4 flex justify-between items-center">
            <h1 className="text-4xl font-bold">Cash Considerations / My Investment</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm text-blue-600 hover:underline"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </header>

          <div className="overflow-x-auto rounded border border-gray-300 shadow-sm bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Item</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {investmentData.map(({ item, amount }, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2 text-gray-800">{item}</td>
                    <td className="px-4 py-2 text-right">
                      {isEditing ? (
                        <input
                          type="number"
                          className="border rounded px-2 py-1 w-32 text-right"
                          value={amount}
                          onChange={(e) => handleAmountChange(index, e.target.value)}
                        />
                      ) : (
                        <span
                          className={`font-semibold ${amount < 0 ? "text-red-600" : "text-green-700"}`}
                        >
                          {formatUSD(amount)}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
