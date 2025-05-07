// src/app/investor-cash/page.jsx
'use client';

import React, { useState } from 'react';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function InvestorCashPage() {
  const [budget, setBudget] = useState({
    downPayment: '',
    closingCosts: '',
    inspections: '',
    upfrontCosts: '',
    rehabCosts: '',
    carryingCosts: '',
  });

  const handleChange = (field) => (e) => {
    setBudget((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const totalCash = Object.values(budget)
    .map((v) => Number(v) || 0)
    .reduce((sum, n) => sum + n, 0);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex-1 flex flex-col gap-4 px-8 py-6">
          <h1 className="text-4xl font-bold">
            Total Cash Budget for this Investment to include:
          </h1>

          <div className="overflow-x-auto">
            {/* add a black outline around the table */}
            <table className="w-full table-auto border-collapse border-2 border-black">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2">Item</th>
                  <th className="text-right p-2">Amount ($)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Down Payment', 'downPayment'],
                  ['Closing Costs', 'closingCosts'],
                  ['Inspections, Contractors Bids, etc.', 'inspections'],
                  ['Upfront Tax, Insurance & HOA', 'upfrontCosts'],
                  ['Out of Pocket rehab year one', 'rehabCosts'],
                  ['Carrying cost during rehab and rent', 'carryingCosts'],
                ].map(([label, key]) => (
                  <tr key={key} className="even:bg-white odd:bg-gray-50">
                    <td className="p-2">{label}</td>
                    <td className="p-2 text-right">
                      <input
                        type="number"
                        placeholder="0"
                        value={budget[key]}
                        onChange={handleChange(key)}
                        className="w-32 text-right border rounded px-2 py-1"
                      />
                    </td>
                  </tr>
                ))}

                <tr className="border-t font-semibold bg-gray-100">
                  <td className="p-2">Total Cash Budget</td>
                  <td className="p-2 text-right">
                    ${totalCash.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-600 mt-2">
            Note: We use this to notify you when your numbers exceed your budget.
          </p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
