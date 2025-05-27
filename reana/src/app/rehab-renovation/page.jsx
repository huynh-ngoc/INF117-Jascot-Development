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

export default function RehabRenovation() {
  const router = useRouter();
  const [materialLaborCost, setMaterialLaborCost] = useState(15150);
  const [holdingCost, setHoldingCost] = useState(1500);
  const [bufferPercent, setBufferPercent] = useState(10);
  const [amountFinanced, setAmountFinanced] = useState(0); 
  const [arv, setARV] = useState(175000);

  const [isEditing, setIsEditing] = useState(false);

  const subTotal = parseFloat(materialLaborCost) + parseFloat(holdingCost);
  const bufferAmount = (bufferPercent / 100) * subTotal;
  const totalBudget = subTotal + bufferAmount;
  const amountPaidInCash = totalBudget - amountFinanced;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Top header */}
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
                <BreadcrumbLink >Rehab & Renovation</BreadcrumbLink>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="px-8">
            <DarkLightSwitch className="place-content-center" />
          </div>
        </header>

        {/* Page content */}
        <div className="flex flex-col gap-6 px-8 pt-0 pb-12">
          <header className="mt-4">
            <h1 className="text-4xl font-bold">Rehab & Renovation Budget</h1>
          </header>

          <div className="overflow-x-auto rounded border border-gray-300 shadow-sm bg-white">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="px-4 py-3 text-left text-xl font-bold" colSpan={2}>
                    Rehab / Renovate
                  </th>
                  <th className="px-4 py-3 text-right">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {isEditing ? "Save" : "Edit"}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Cost of Materials */}
                <tr className="border-t">
                  <td className="px-4 py-2">Cost of Materials and Labor for Rehab</td>
                  <td className="px-4 py-2 text-right" colSpan={2}>
                    {isEditing ? (
                      <input
                        type="number"
                        className="border rounded p-1 w-32 text-right"
                        value={materialLaborCost}
                        onChange={(e) => setMaterialLaborCost(e.target.value)}
                      />
                    ) : (
                      `$${Number(materialLaborCost).toLocaleString()}`
                    )}
                  </td>
                </tr>

                {/* Holding Cost */}
                <tr>
                  <td className="px-4 py-2">Holding Cost during Rehab</td>
                  <td className="px-4 py-2 text-right" colSpan={2}>
                    {isEditing ? (
                      <input
                        type="number"
                        className="border rounded p-1 w-32 text-right"
                        value={holdingCost}
                        onChange={(e) => setHoldingCost(e.target.value)}
                      />
                    ) : (
                      `$${Number(holdingCost).toLocaleString()}`
                    )}
                  </td>
                </tr>

                {/* Subtotal */}
                <tr className="border-t font-semibold bg-gray-50">
                  <td className="px-4 py-2">Sub-Total</td>
                  <td className="px-4 py-2 text-right" colSpan={2}>
                    ${subTotal.toLocaleString()}
                  </td>
                </tr>

                {/* Buffer */}
                <tr>
                  <td className="px-4 py-2">Min 10% - 15% of above for the unknown/over runs</td>
                  <td className="px-4 py-2 text-right">
                    {isEditing ? (
                      <input
                        type="number"
                        className="border rounded p-1 w-16 text-right"
                        value={bufferPercent}
                        onChange={(e) => setBufferPercent(e.target.value)}
                        min={10}
                        max={15}
                      />
                    ) : (
                      `${bufferPercent}%`
                    )}
                  </td>
                  <td className="px-4 py-2 text-right">${bufferAmount.toLocaleString()}</td>
                </tr>

                {/* Total Budget */}
                <tr className="border-t-2 border-black font-bold bg-yellow-50">
                  <td className="px-4 py-2">Total Rehab Budget</td>
                  <td className="px-4 py-2 text-right" colSpan={2}>
                    ${totalBudget.toLocaleString()}
                  </td>
                </tr>

                {/* DSCR Loan */}
                <tr className="border-t">
                  <td className="px-4 py-2">
                    Amount Financed (If using DSCR Loan)<span className="text-red-500">*</span>
                  </td>
                  <td className="px-4 py-2 text-right" colSpan={2}>
                    {isEditing ? (
                      <input
                        type="number"
                        className="border rounded p-1 w-32 text-right"
                        value={amountFinanced}
                        onChange={(e) => setAmountFinanced(e.target.value)}
                      />
                    ) : (
                      amountFinanced > 0 ? `$${amountFinanced.toLocaleString()}` : "-"
                    )}
                  </td>
                </tr>

                {/* Cash Paid */}
                <tr>
                  <td className="px-4 py-2">Amount Paid in Cash</td>
                  <td className="px-4 py-2 text-right" colSpan={2}>
                    ${amountPaidInCash.toLocaleString()}
                  </td>
                </tr>

                {/* ARV */}
                <tr className="border-t">
                  <td className="px-4 py-2">After Rehab Value (ARV)</td>
                  <td className="px-4 py-2 text-right" colSpan={2}>
                    ${arv.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
