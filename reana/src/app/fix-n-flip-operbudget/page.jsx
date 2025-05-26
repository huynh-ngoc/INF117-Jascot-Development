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

export default function FixNFlipBudgetPage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [showIncomeSelector, setShowIncomeSelector] = useState(false);

  const [miscIncome, setMiscIncome] = useState(200);
  const grossIncome = miscIncome * 12;

  const [taxRate, setTaxRate] = useState(2.16);
  const taxMonthly = 207;
  const taxAnnual = taxMonthly * 12;

  const [insurance, setInsurance] = useState(100);
  const insuranceAnnual = insurance * 12;

  const [hoa, setHoa] = useState(0);
  const hoaAnnual = hoa * 12;

  const [miscFixed, setMiscFixed] = useState(0);
  const miscFixedAnnual = miscFixed * 12;

  const totalFixedMonthly = taxMonthly + insurance + hoa + miscFixed;
  const totalFixedAnnual = totalFixedMonthly * 12;

  const [utilities, setUtilities] = useState(350);
  const utilitiesAnnual = utilities * 12;

  const [miscVariable, setMiscVariable] = useState(0);
  const miscVariableAnnual = miscVariable * 12;

  const totalVariableMonthly = utilities + miscVariable;
  const totalVariableAnnual = totalVariableMonthly * 12;

  const totalOperatingMonthly = totalFixedMonthly + totalVariableMonthly;
  const totalOperatingAnnual = totalFixedAnnual + totalVariableAnnual;

  const netOperatingIncomeAnnual = grossIncome - totalOperatingAnnual;
  const netOperatingIncomeMonthly = netOperatingIncomeAnnual / 12;

  const [capex, setCapex] = useState(18315);

  const cashFlowAnnual = netOperatingIncomeAnnual - capex;
  const cashFlowMonthly = cashFlowAnnual / 12;

  const formatUSD = (val) => `$${Number(val).toLocaleString(undefined, { minimumFractionDigits: 0 })}`;

  const editable = (value, setter) => (
    isEditing ? (
      <input
        type="number"
        value={value}
        onChange={(e) => setter(Number(e.target.value))}
        className="border rounded px-2 py-1 w-24 text-right"
      />
    ) : (
      formatUSD(value)
    )
  );

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
                <BreadcrumbLink>Fix-n-Flip Budget</BreadcrumbLink>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="px-8">
            <DarkLightSwitch className="place-content-center" />
          </div>
        </header>

        <div className="flex flex-col gap-6 px-8 pt-0 pb-12">
          <header className="mt-4 flex justify-between items-center">
            <h1 className="text-4xl font-bold">Fix-n-Flip Operating Budget</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm text-blue-600 hover:underline"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </header>

          <div className="mb-4">
            <button
              className="bg-blue-100 hover:bg-blue-200 text-sm px-3 py-1 rounded"
              onClick={() => setShowIncomeSelector(!showIncomeSelector)}
            >
              Select Income
            </button>
            {showIncomeSelector && (
              <div className="mt-2 flex gap-2">
                <button
                  className="bg-blue-200 hover:bg-blue-300 px-2 py-1 rounded"
                  onClick={() => setMiscIncome(300)}
                >
                  Preset 1 ($300/mo)
                </button>
                <button
                  className="bg-blue-200 hover:bg-blue-300 px-2 py-1 rounded"
                  onClick={() => setMiscIncome(150)}
                >
                  Preset 2 ($150/mo)
                </button>
                <button
                  className="bg-blue-200 hover:bg-blue-300 px-2 py-1 rounded"
                  onClick={() => setMiscIncome(0)}
                >
                  Custom ($0/mo)
                </button>
              </div>
            )}
          </div>

          <div className="overflow-x-auto rounded border border-gray-300 shadow-sm bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2 text-left">Item</th>
                  <th className="px-4 py-2 text-right">Monthly</th>
                  <th className="px-4 py-2 text-right">Annual</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50 font-semibold">
                  <td className="px-4 py-2">Misc. Income</td>
                  <td className="px-4 py-2 text-right">{editable(miscIncome, setMiscIncome)}</td>
                  <td className="px-4 py-2 text-right">{formatUSD(grossIncome)}</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="px-4 py-2">Gross Operating Income</td>
                  <td className="px-4 py-2 text-right">{formatUSD(miscIncome)}</td>
                  <td className="px-4 py-2 text-right">{formatUSD(grossIncome)}</td>
                </tr>
                <tr><td colSpan={3} className="px-4 py-2 font-bold bg-blue-50">Fixed Operating Expenses</td></tr>
                <tr>
                  <td className="px-4 py-2">Taxes (Rate {taxRate}%)</td>
                  <td className="px-4 py-2 text-right">{formatUSD(taxMonthly)}</td>
                  <td className="px-4 py-2 text-right">{formatUSD(taxAnnual)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Insurance</td>
                  <td className="px-4 py-2 text-right">{editable(insurance, setInsurance)}</td>
                  <td className="px-4 py-2 text-right">{formatUSD(insuranceAnnual)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">HOA</td>
                  <td className="px-4 py-2 text-right">{editable(hoa, setHoa)}</td>
                  <td className="px-4 py-2 text-right">{formatUSD(hoaAnnual)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Misc. Fixed Costs</td>
                  <td className="px-4 py-2 text-right">{editable(miscFixed, setMiscFixed)}</td>
                  <td className="px-4 py-2 text-right">{formatUSD(miscFixedAnnual)}</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="px-4 py-2">Total Fixed Operating Expenses</td>
                  <td className="px-4 py-2 text-right">{formatUSD(totalFixedMonthly)}</td>
                  <td className="px-4 py-2 text-right">{formatUSD(totalFixedAnnual)}</td>
                </tr>
                <tr><td colSpan={3} className="px-4 py-2 font-bold bg-blue-50">Variable Operating Expenses</td></tr>
                <tr>
                  <td className="px-4 py-2">Utilities</td>
                  <td className="px-4 py-2 text-right">{editable(utilities, setUtilities)}</td>
                  <td className="px-4 py-2 text-right">{formatUSD(utilitiesAnnual)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Misc. Variable Costs</td>
                  <td className="px-4 py-2 text-right">{editable(miscVariable, setMiscVariable)}</td>
                  <td className="px-4 py-2 text-right">{formatUSD(miscVariableAnnual)}</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="px-4 py-2">Total Variable Operating Costs</td>
                  <td className="px-4 py-2 text-right">{formatUSD(totalVariableMonthly)}</td>
                  <td className="px-4 py-2 text-right">{formatUSD(totalVariableAnnual)}</td>
                </tr>
                <tr className="bg-blue-50 font-bold">
                  <td className="px-4 py-2">Total Operating Expenses</td>
                  <td className="px-4 py-2 text-right">{formatUSD(totalOperatingMonthly)}</td>
                  <td className="px-4 py-2 text-right">{formatUSD(totalOperatingAnnual)}</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="px-4 py-2">Net Operating Income (NOI)</td>
                  <td className="px-4 py-2 text-right">{formatUSD(netOperatingIncomeMonthly)}</td>
                  <td className="px-4 py-2 text-right">{formatUSD(netOperatingIncomeAnnual)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Less Non-Financed Capital Expenditures</td>
                  <td className="px-4 py-2 text-right">{editable(capex, setCapex)}</td>
                  <td className="px-4 py-2 text-right">{formatUSD(capex)}</td>
                </tr>
                <tr className={`font-bold ${cashFlowAnnual < 0 ? "text-red-600" : "text-green-700"}`}>
                  <td className="px-4 py-2">Cash Flow (Year 1)</td>
                  <td className="px-4 py-2 text-right">{formatUSD(cashFlowMonthly)}</td>
                  <td className="px-4 py-2 text-right">{formatUSD(cashFlowAnnual)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}