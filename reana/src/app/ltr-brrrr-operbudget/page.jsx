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

export default function BudgetTablePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [showIncomeSelector, setShowIncomeSelector] = useState(false);

  const [gsi, setGsi] = useState(2550);
  const [vacancyRate, setVacancyRate] = useState(9.9);
  const [otherIncome, setOtherIncome] = useState(200);
  const [taxRate, setTaxRate] = useState(2.16);
  const [insurance, setInsurance] = useState(100);
  const [hoa, setHoa] = useState(0);
  const [miscFixed, setMiscFixed] = useState(0);
  const [propertyMgmtProRate, setPropertyMgmtProRate] = useState(15);
  const [propertyMgmtSelfRate, setPropertyMgmtSelfRate] = useState(5);
  const propertyMgmtSelfMonthly = 0;
  const propertyMgmtSelfAnnual = 0;
  const [utilities, setUtilities] = useState(350);
  const [repairsRate, setRepairsRate] = useState(7);
  const [turnoverRate, setTurnoverRate] = useState(5);
  const [adminRate, setAdminRate] = useState(2);
  const [miscVariable, setMiscVariable] = useState(300);

  const debtServiceMonthly = 755;
  const capexMonthly = 1526;

  const annualGSI = gsi * 12;
  const vacancyMonthly = (vacancyRate / 100) * gsi;
  const vacancyAnnual = vacancyMonthly * 12;
  const rentalMonthly = gsi - vacancyMonthly;
  const rentalAnnual = rentalMonthly * 12;
  const otherIncomeAnnual = otherIncome * 12;
  const grossOperatingIncome = rentalAnnual + otherIncomeAnnual;

  const taxMonthly = (taxRate / 1000) * gsi;
  const taxAnnual = taxMonthly * 12;
  const insuranceAnnual = insurance * 12;
  const hoaAnnual = hoa * 12;
  const miscFixedAnnual = miscFixed * 12;
  const fixedTotalMonthly = taxMonthly + insurance + hoa + miscFixed;
  const fixedTotalAnnual = fixedTotalMonthly * 12;

  const mgmtMonthly = (propertyMgmtProRate / 100) * gsi;
  const mgmtAnnual = mgmtMonthly * 12;
  const utilitiesAnnual = utilities * 12;
  const repairsAnnual = (repairsRate / 100) * annualGSI;
  const turnoverAnnual = (turnoverRate / 100) * annualGSI;
  const adminAnnual = (adminRate / 100) * annualGSI;
  const miscVariableAnnual = miscVariable * 12;
  const variableTotalAnnual = mgmtAnnual + utilitiesAnnual + repairsAnnual + turnoverAnnual + adminAnnual + miscVariableAnnual;
  const variableTotalMonthly = variableTotalAnnual / 12;

  const totalOperatingAnnual = fixedTotalAnnual + variableTotalAnnual;
  const totalOperatingMonthly = totalOperatingAnnual / 12;
  const noiAnnual = grossOperatingIncome - totalOperatingAnnual;
  const noiMonthly = noiAnnual / 12;
  const debtAnnual = debtServiceMonthly * 12;
  const capexAnnual = capexMonthly * 12;
  const cashFlowAnnual = noiAnnual - debtAnnual - capexAnnual;
  const cashFlowMonthly = cashFlowAnnual / 12;

  const formatUSD = (num) => `${Number(num).toLocaleString(undefined, { minimumFractionDigits: 0 })}`;
  const formatPercent = (value) => `${value.toFixed(2)}%`;

  const editableCell = (value, setter, unit = "", width = "w-20") => (
    isEditing ? (
      <input
        type="number"
        className={`border rounded p-1 text-right ${width}`}
        value={value}
        onChange={(e) => setter(Number(e.target.value))}
      />
    ) : (
      unit ? `${value}${unit}` : value
    )
  );

  const handleSelectIncome = () => {
    // Mock function for select income button
    setShowIncomeSelector(!showIncomeSelector);
  };

  const TableHeader = ({ title, backgroundColor = "bg-blue-100" }) => (
    <tr>
      <td colSpan="5" className={`font-bold text-left px-4 py-2 ${backgroundColor}`}>
        {title}
      </td>
    </tr>
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
                <BreadcrumbLink>Operating Budget</BreadcrumbLink>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="px-8">
            <DarkLightSwitch className="place-content-center" />
          </div>
        </header>

        <div className="flex flex-col gap-6 px-8 pt-0 pb-12">
          <header className="mt-4">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold">LTR / Brrr Operating Budget Projections (1 Yr.)</h1>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
          </header>

          <div className="overflow-x-auto rounded border border-gray-300 shadow-sm bg-white">
            <table className="min-w-full text-sm divide-y divide-gray-300">
              <thead className="bg-blue-100">
                <tr>
                  <th className="border px-4 py-2 text-center" colSpan="5">
                    LTR / Brrr Operating Budget Projections (1 Yr.)
                  </th>
                </tr>
                <tr>
                    <th className="border px-4 py-2 text-center text-xs italic text-gray-600" colSpan="5">
                        DISCLAIMER: The calculations below are not complete and may not reflect accurate results. Data from income unit mix, property analysis, databases, real estate data, AI APIs, and user inputs have not been fully integrated.
                    </th>
                </tr>
                <tr>
                  <th className="border px-2 py-1">Item</th>
                  <th className="border px-2 py-1">Rule of Thumb % of GSI</th>
                  <th className="border px-2 py-1">Monthly</th>
                  <th className="border px-2 py-1">Annual</th>
                  <th className="border px-2 py-1">% of GSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {/* Income Selection Button */}
                <tr>
                  <td colSpan="2" className="border px-2 py-1 bg-blue-50">
                    <button 
                      className="bg-blue-50 hover:bg-blue-100 py-1 px-4 w-full text-left"
                      onClick={handleSelectIncome}
                    >
                      Select Income
                    </button>
                  </td>
                  <td colSpan="3" className="border px-2 py-1 bg-blue-50">
                    {showIncomeSelector && (
                      <div className="flex space-x-2">
                        <button className="bg-blue-200 hover:bg-blue-300 px-2 py-1 rounded">
                          Preset 1
                        </button>
                        <button className="bg-blue-200 hover:bg-blue-300 px-2 py-1 rounded">
                          Preset 2
                        </button>
                        <button className="bg-blue-200 hover:bg-blue-300 px-2 py-1 rounded">
                          Custom
                        </button>
                      </div>
                    )}
                  </td>
                </tr>

                {/* Income Section */}
                <tr><td className="border px-2 py-1">Gross Scheduled Income (GSI)</td><td></td><td>${editableCell(gsi, setGsi)}</td><td>{formatUSD(annualGSI)}</td><td>100%</td></tr>
                <tr><td className="border px-2 py-1">Less Vacancy Rate</td><td className="border px-2 py-1 bg-blue-50">{editableCell(vacancyRate, setVacancyRate, "%", "w-16")}</td><td>${formatUSD(vacancyMonthly)}</td><td>{formatUSD(vacancyAnnual)}</td><td>{formatPercent(vacancyAnnual / annualGSI * 100)}</td></tr>
                <tr><td className="border px-2 py-1">Gross Rental Income</td><td></td><td>${formatUSD(rentalMonthly)}</td><td>{formatUSD(rentalAnnual)}</td><td>{formatPercent(rentalAnnual / annualGSI * 100)}</td></tr>
                <tr><td className="border px-2 py-1">Plus Other Inc.</td><td></td><td>${editableCell(otherIncome, setOtherIncome)}</td><td>{formatUSD(otherIncomeAnnual)}</td><td>{formatPercent(otherIncomeAnnual / annualGSI * 100)}</td></tr>
                <tr className="bg-gray-100">
                  <td className="border px-2 py-1 font-bold">Gross Operating Income</td>
                  <td></td>
                  <td className="border px-2 py-1 font-bold">${formatUSD(grossOperatingIncome / 12)}</td>
                  <td className="border px-2 py-1 font-bold">{formatUSD(grossOperatingIncome)}</td>
                  <td className="border px-2 py-1 font-bold">{formatPercent(grossOperatingIncome / annualGSI * 100)}</td>
                </tr>

                {/* Fixed Expenses Section */}
                <TableHeader title="Fixed Operating Expenses" />
                <tr><td className="border px-2 py-1">Taxes (Rate)</td><td className="border px-2 py-1 bg-green-50">{editableCell(taxRate, setTaxRate, "%", "w-16")}</td><td>${formatUSD(taxMonthly)}</td><td>{formatUSD(taxAnnual)}</td><td>{formatPercent(taxAnnual / annualGSI * 100)}</td></tr>
                <tr><td className="border px-2 py-1">Insurance</td><td></td><td>${editableCell(insurance, setInsurance)}</td><td>{formatUSD(insuranceAnnual)}</td><td>{formatPercent(insuranceAnnual / annualGSI * 100)}</td></tr>
                <tr><td className="border px-2 py-1">HOA</td><td></td><td>${editableCell(hoa, setHoa)}</td><td>{formatUSD(hoaAnnual)}</td><td>{formatPercent(hoaAnnual / annualGSI * 100)}</td></tr>
                <tr><td className="border px-2 py-1">Misc. Fixed Costs</td><td></td><td>${editableCell(miscFixed, setMiscFixed)}</td><td>{formatUSD(miscFixedAnnual)}</td><td>{formatPercent(miscFixedAnnual / annualGSI * 100)}</td></tr>
                <tr className="bg-gray-100">
                  <td className="border px-2 py-1 font-bold">Total Fixed Operating Expenses</td>
                  <td></td>
                  <td className="border px-2 py-1 font-bold">${formatUSD(fixedTotalMonthly)}</td>
                  <td className="border px-2 py-1 font-bold">{formatUSD(fixedTotalAnnual)}</td>
                  <td className="border px-2 py-1 font-bold">{formatPercent(fixedTotalAnnual / annualGSI * 100)}</td>
                </tr>

                {/* Variable Expenses Section */}
                <TableHeader title="Variable Operating Expenses" />
                <tr><td className="border px-2 py-1">Property Management Fees (Pro)</td><td className="border px-2 py-1 bg-green-50">{editableCell(propertyMgmtProRate, setPropertyMgmtProRate, "%", "w-16")}</td><td>${formatUSD(mgmtMonthly)}</td><td>{formatUSD(mgmtAnnual)}</td><td>{formatPercent(mgmtAnnual / annualGSI * 100)}</td></tr>
                <tr><td className="border px-2 py-1">Property Management Fees (self)</td><td className="border px-2 py-1 bg-green-50">{editableCell(propertyMgmtSelfRate, setPropertyMgmtSelfRate, "%", "w-16")}</td><td>${formatUSD(propertyMgmtSelfMonthly)}</td><td>{formatUSD(propertyMgmtSelfAnnual)}</td><td>{formatPercent(propertyMgmtSelfAnnual / annualGSI * 100)}</td></tr>
                <tr><td className="border px-2 py-1">Utilities</td><td></td><td>${editableCell(utilities, setUtilities)}</td><td>{formatUSD(utilitiesAnnual)}</td><td>{formatPercent(utilitiesAnnual / annualGSI * 100)}</td></tr>
                <tr><td className="border px-2 py-1">Repairs & Maintenance</td><td className="border px-2 py-1 bg-green-50">{editableCell(repairsRate, setRepairsRate, "%", "w-16")}</td><td>${formatUSD((repairsAnnual / 12))}</td><td>{formatUSD(repairsAnnual)}</td><td>{formatPercent(repairsAnnual / annualGSI * 100)}</td></tr>
                <tr><td className="border px-2 py-1">Tenant Turnover Costs</td><td className="border px-2 py-1 bg-green-50">{editableCell(turnoverRate, setTurnoverRate, "%", "w-16")}</td><td>${formatUSD(turnoverAnnual / 12)}</td><td>{formatUSD(turnoverAnnual)}</td><td>{formatPercent(turnoverAnnual / annualGSI * 100)}</td></tr>
                <tr><td className="border px-2 py-1">Administrative Costs</td><td className="border px-2 py-1 bg-green-50">{editableCell(adminRate, setAdminRate, "%", "w-16")}</td><td>${formatUSD(adminAnnual / 12)}</td><td>{formatUSD(adminAnnual)}</td><td>{formatPercent(adminAnnual / annualGSI * 100)}</td></tr>
                <tr><td className="border px-2 py-1">Misc. Variable Costs (Lawn Care, Snow Removal, Pool Maint. etc.)</td><td></td><td>${editableCell(miscVariable, setMiscVariable)}</td><td>{formatUSD(miscVariableAnnual)}</td><td>{formatPercent(miscVariableAnnual / annualGSI * 100)}</td></tr>
                <tr className="bg-gray-100">
                  <td className="border px-2 py-1 font-bold">Total Variable Operating Costs</td>
                  <td></td>
                  <td className="border px-2 py-1 font-bold">${formatUSD(variableTotalMonthly)}</td>
                  <td className="border px-2 py-1 font-bold">{formatUSD(variableTotalAnnual)}</td>
                  <td className="border px-2 py-1 font-bold">{formatPercent(variableTotalAnnual / annualGSI * 100)}</td>
                </tr>

                {/* Summary Section */}
                <tr className="bg-gray-200">
                  <td className="border px-2 py-1 font-bold">Total Operating Expenses</td>
                  <td></td>
                  <td className="border px-2 py-1 font-bold">${formatUSD(totalOperatingMonthly)}</td>
                  <td className="border px-2 py-1 font-bold">{formatUSD(totalOperatingAnnual)}</td>
                  <td className="border px-2 py-1 font-bold">{formatPercent(totalOperatingAnnual / annualGSI * 100)}</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="border px-2 py-1 font-bold">Net Operating Income (NOI)</td>
                  <td></td>
                  <td className="border px-2 py-1 font-bold">${formatUSD(noiMonthly)}</td>
                  <td className="border px-2 py-1 font-bold">{formatUSD(noiAnnual)}</td>
                  <td className="border px-2 py-1 font-bold">{formatPercent(noiAnnual / annualGSI * 100)}</td>
                </tr>
                <tr><td className="border px-2 py-1">Less Debt Service</td><td></td><td>${formatUSD(debtServiceMonthly)}</td><td>{formatUSD(debtAnnual)}</td><td>{formatPercent(debtAnnual / annualGSI * 100)}</td></tr>
                <tr><td className="border px-2 py-1">Less Non-Financed Capital Expenditures</td><td></td><td>${formatUSD(capexMonthly)}</td><td>{formatUSD(capexAnnual)}</td><td>{formatPercent(capexAnnual / annualGSI * 100)}</td></tr>
                <tr className={`font-bold ${cashFlowAnnual < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  <td className="border px-2 py-1">Cash Flow (Year 1)</td>
                  <td></td>
                  <td className="border px-2 py-1">${formatUSD(cashFlowMonthly)}</td>
                  <td className="border px-2 py-1">{formatUSD(cashFlowAnnual)}</td>
                  <td className="border px-2 py-1">{formatPercent(cashFlowAnnual / annualGSI * 100)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}