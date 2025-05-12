'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function RuleOfThumbOprBudgetTable() {
  // Mock data for now
    const budgetData = [
    {
        title: 'Gross Scheduled Income (GSI)',
        ruleOfThumb: '',
        monthly: '$2,550',
        annual: '$30,600',
    },
    {
      title: 'Total Operating Expenses',
      ruleOfThumb: '50.00%',
      monthly: '$1,275',
      annual: '$15,300',
    },
    {
      title: 'Net Operating Income (NOI)',
      ruleOfThumb: '',
      monthly: '$1,275',
      annual: '$15,300',
    },
    {
      title: 'Less Debt Service',
      ruleOfThumb: '',
      monthly: '$755',
      annual: '$9,055',
    },
    {
      title: 'Less Non-Financed Capital Expenditures',
      ruleOfThumb: '',
      monthly: '$1,526',
      annual: '$18,315',
    },
    {
      title: 'Cash Flow (Year 1)',
      ruleOfThumb: '',
      monthly: '($1,006)',
      annual: '($12,070)',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Operating Budget Projections (1 Yr.)</h2>
        <p className="text-sm text-muted-foreground">
          This table summarizes your 1-year operating budget based on your current assumptions and inputs.
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left font-semibold">Item</th>
                <th className="p-3 text-left font-semibold">Rule of Thumb</th>
                <th className="p-3 text-left font-semibold">Monthly</th>
                <th className="p-3 text-left font-semibold">Annual</th>
              </tr>
            </thead>
            <tbody>
              {budgetData.map((row, index) => {
                const isNOI = row.title === 'Net Operating Income (NOI)';
                const isCashFlow = row.title === 'Cash Flow (Year 1)';
                const isTotalOpEx = row.title === 'Total Operating Expenses';
                return (
                  <tr key={index} className="border-t">
                    <td className={`p-3 ${(isNOI || isCashFlow || isTotalOpEx) ? 'font-semibold' : ''}`}>
                      {row.title}
                    </td>
                    <td className={`p-3 ${(isNOI || isCashFlow) ? 'font-semibold' : ''}`}>
                      {row.ruleOfThumb}
                    </td>
                    <td className={`p-3 ${(isNOI || isCashFlow) ? 'font-semibold' : ''}`}>
                      {row.monthly}
                    </td>
                    <td className={`p-3 ${(isNOI || isCashFlow) ? 'font-semibold' : ''}`}>
                      {row.annual}
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
