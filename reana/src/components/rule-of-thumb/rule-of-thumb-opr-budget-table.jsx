'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function RuleOfThumbOprBudgetTable({ propertyId }) {
  const [incomeType, setIncomeType] = useState('Projected Rent Per Comps');
  const incomeOptions = [
    'Projected Rent Per Comps',
    'Current Rent',
    'Scheduled Rent',
  ];
  const [unitMix, setUnitMix] = useState([]);
  const [gsi, setGsi] = useState({ monthly: 0, annual: 0 });
  const [operatingExpensesPct, setOperatingExpensesPct] = useState(0.5); // default 50%

  // Fetch property data from backend
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/property/${propertyId}`);
        if (!res.ok) throw new Error('Failed to fetch property');
        const data = await res.json();
        if (data.success && data.property) {
          setUnitMix(data.property.unitMix || []);
          if (data.property.incomeSelection) {
            setIncomeType(data.property.incomeSelection);
          }
          // Get the rule of thumb operating expenses percentage
          if (
            data.property['local-rule-of-thumb'] &&
            typeof data.property['local-rule-of-thumb'].operatingExpenses === 'number'
          ) {
            setOperatingExpensesPct(data.property['local-rule-of-thumb'].operatingExpenses);
          }
          // Set conventional and additional financing monthly payments
          setConventionalMonthlyPayment(
            data.property.conventionalFinancing?.monthlyPayment || 0
          );
          setAdditionalMonthlyPayment(
            data.property.additionalFinancing?.monthlyPayment || 0
          );
          // Set rehabData cashPaid
          setCashPaid(
            data.property.rehabData?.cashPaid || 0
          );
        }
      } catch (err) {
        setUnitMix([]);
      }
    };
    fetchProperty();
  }, []);

  // Calculate GSI
  useEffect(() => {
    setGsi(calculateGSI(unitMix, incomeType));
  }, [unitMix, incomeType]);

  // New state for financing and rehab
  const [conventionalMonthlyPayment, setConventionalMonthlyPayment] = useState(0);
  const [additionalMonthlyPayment, setAdditionalMonthlyPayment] = useState(0);
  const [cashPaid, setCashPaid] = useState(0);

  // --- Updated formulas ---
  const totalOperatingExpensesMonthly = gsi.monthly * operatingExpensesPct;
  const totalOperatingExpensesAnnual = totalOperatingExpensesMonthly * 12;
  const noiMonthly = gsi.monthly - totalOperatingExpensesMonthly;
  const noiAnnual = noiMonthly * 12;
  const debtServiceMonthly = Number(conventionalMonthlyPayment) + Number(additionalMonthlyPayment);
  const debtServiceAnnual = debtServiceMonthly * 12;
  const capexMonthly = cashPaid / 12;
  const capexAnnual = capexMonthly * 12;
  const cashFlowMonthly = noiMonthly - debtServiceMonthly - capexMonthly;
  const cashFlowAnnual = cashFlowMonthly * 12;

  // Persist selection and all operating budget fields to backend
  useEffect(() => {
    if (!unitMix.length) return;
    const saveSelection = async () => {
      await fetch(`/api/property/${propertyId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operatingBudget: {
            incomeSelection: incomeType,
            GSI_monthly: gsi.monthly,
            GSI_annual: gsi.annual,
            gsiSource: incomeType.toLowerCase().includes('projected') ? 'projected' : incomeType.toLowerCase().includes('current') ? 'current' : 'scheduled',
            totalOperatingExpensesMonthly,
            totalOperatingExpensesAnnual,
            NOI_monthly: noiMonthly,
            NOI_annual: noiAnnual,
            debtServiceMonthly,
            debtServiceAnnual,
            capexMonthly,
            capexAnnual,
            cashFlowMonthly,
            cashFlowAnnual,
            updatedAt: new Date().toISOString(),
          },
        }),
      });
    };
    saveSelection();
  }, [incomeType, gsi.monthly, gsi.annual, totalOperatingExpensesMonthly, totalOperatingExpensesAnnual, noiMonthly, noiAnnual, debtServiceMonthly, debtServiceAnnual, capexMonthly, capexAnnual, cashFlowMonthly, cashFlowAnnual]);

  const budgetData = [
    {
      title: 'Gross Scheduled Income (GSI)',
      ruleOfThumb: '',
      monthly: `$${gsi.monthly.toLocaleString()}`,
      annual: `$${gsi.annual.toLocaleString()}`,
    },
    {
      title: 'Total Operating Expenses',
      ruleOfThumb: `${(operatingExpensesPct * 100).toFixed(2)}%`,
      monthly: `$${totalOperatingExpensesMonthly.toLocaleString()}`,
      annual: `$${totalOperatingExpensesAnnual.toLocaleString()}`,
    },
    {
      title: 'Net Operating Income (NOI)',
      ruleOfThumb: '',
      monthly: `$${noiMonthly.toLocaleString()}`,
      annual: `$${noiAnnual.toLocaleString()}`,
    },
    {
      title: 'Less Debt Service',
      ruleOfThumb: '',
      monthly: `$${debtServiceMonthly.toLocaleString()}`,
      annual: `$${debtServiceAnnual.toLocaleString()}`,
    },
    {
      title: 'Less Non-Financed Capital Expenditures',
      ruleOfThumb: '',
      monthly: `$${capexMonthly.toLocaleString()}`,
      annual: `$${capexAnnual.toLocaleString()}`,
    },
    {
      title: 'Cash Flow (Year 1)',
      ruleOfThumb: '',
      monthly: cashFlowMonthly < 0 ? `$${Math.abs(cashFlowMonthly).toLocaleString()}` : `$${cashFlowMonthly.toLocaleString()}`,
      annual: cashFlowAnnual < 0 ? `$${Math.abs(cashFlowAnnual).toLocaleString()}` : `$${cashFlowAnnual.toLocaleString()}`,
      isNegative: cashFlowMonthly < 0 || cashFlowAnnual < 0,
    },
  ];

  return (
    <Card className="border border-[#4F5D75]">
      <CardHeader>
        <h2 className="text-xl font-montserrat font-semibold text-[#2D3142]">LTR / BRRR Operating Budget Projections (1 yr.) Using Rule of Thumb</h2>
        <p className="text-sm font-lato text-[#4F5D75]">
          This table summarizes your operating budget based on "rule of thumb" operating expenses and your other inputs.
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label className="block mb-1 font-montserrat text-[#2D3142]">Select Income</label>
          <select
            value={incomeType}
            onChange={e => setIncomeType(e.target.value)}
            className="px-4 py-2 bg-white border border-[#4F5D75] rounded-md font-montserrat text-[#2D3142] focus:ring-[#00A3E0] focus:border-[#00A3E0] shadow"
          >
            {incomeOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-[#4F5D75] rounded-lg">
            <thead className="bg-[#4F5D75] text-white">
              <tr>
                <th className="p-3 text-left font-montserrat">Item</th>
                <th className="p-3 text-left font-montserrat">Rule of Thumb</th>
                <th className="p-3 text-right font-montserrat">Monthly</th>
                <th className="p-3 text-right font-montserrat">Annual</th>
              </tr>
            </thead>
            <tbody>
              {budgetData.map((row, index) => {
                const isNOI = row.title === 'Net Operating Income (NOI)';
                const isCashFlow = row.title === 'Cash Flow (Year 1)';
                const isTotalOpEx = row.title === 'Total Operating Expenses';
                const isNegative = isCashFlow && (cashFlowMonthly < 0 || cashFlowAnnual < 0);
                
                return (
                  <tr key={index} className={`border-t border-[#4F5D75]`}>
                    <td className={`p-3 font-lato ${(isNOI || isCashFlow || isTotalOpEx) ? 'font-semibold' : ''}`}>
                      {row.title}
                    </td>
                    <td className={`p-3 font-lato ${(isNOI || isCashFlow) ? 'font-semibold' : ''} ${row.ruleOfThumb && row.ruleOfThumb.includes('%') ? 'text-[#00A3E0]' : ''}`}>
                      {row.ruleOfThumb && (
                        <div className="relative w-32">
                          <Input
                            type="number"
                            value={row.ruleOfThumb.replace(/[^0-9.]/g, '')}
                            className="w-32 text-right bg-white border border-[#4F5D75] rounded-lg font-lato text-base focus:ring-[#00A3E0] focus:border-[#00A3E0] pr-8"
                            readOnly
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4F5D75] font-lato pointer-events-none">
                            %
                          </span>
                        </div>
                      )}
                    </td>
                    <td className={`p-3 font-lato text-right ${(isNOI || isCashFlow) ? 'font-semibold' : ''} ${isNegative ? 'text-red-500' : ''}`}>
                      <div className="relative w-32 ml-auto">
                        <Input
                          type="text"
                          value={row.monthly.replace(/[$(),]/g, '')}
                          className="w-32 text-right bg-white border border-[#4F5D75] rounded-lg font-lato text-base focus:ring-[#00A3E0] focus:border-[#00A3E0] pl-6"
                          readOnly
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4F5D75] font-lato pointer-events-none">
                          $
                        </span>
                      </div>
                    </td>
                    <td className={`p-3 font-lato text-right ${(isNOI || isCashFlow) ? 'font-semibold' : ''} ${isNegative ? 'text-red-500' : ''}`}>
                      <div className="relative w-32 ml-auto">
                        <Input
                          type="text"
                          value={row.annual.replace(/[$(),]/g, '')}
                          className="w-32 text-right bg-white border border-[#4F5D75] rounded-lg font-lato text-base focus:ring-[#00A3E0] focus:border-[#00A3E0] pl-6"
                          readOnly
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4F5D75] font-lato pointer-events-none">
                          $
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function calculateGSI(unitMix, selection) {
  let monthly = 0;
  if (!Array.isArray(unitMix)) return { monthly: 0, annual: 0 };
  unitMix.forEach(unit => {
    if (selection === 'Projected Rent Per Comps') {
      monthly += Number(unit.perComps || 0);
    } else if (selection === 'Current Rent') {
      monthly += Number(unit.currentRent || 0);
    } else if (selection === 'Scheduled Rent') {
      monthly += Number(unit.scheduledRent || 0);
    }
  });
  return { monthly, annual: monthly * 12 };
}
