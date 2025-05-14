'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

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
    <Card className="border border-[#4F5D75]">
      <CardHeader>
        <h2 className="text-xl font-montserrat font-semibold text-[#2D3142]">Operating Budget Projections (1 Yr.)</h2>
        <p className="text-sm font-lato text-[#4F5D75]">
          This table summarizes your 1-year operating budget based on your current assumptions and inputs.
        </p>
      </CardHeader>
      <CardContent>
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
                const isNegative = row.monthly.includes('(') || row.annual.includes('(');
                
                return (
                  <tr key={index} className="border-t border-[#4F5D75]">
                    <td className={`p-3 font-lato ${(isNOI || isCashFlow || isTotalOpEx) ? 'font-semibold' : ''}`}>
                      {row.title}
                    </td>
                    <td className={`p-3 font-lato ${(isNOI || isCashFlow) ? 'font-semibold' : ''} ${row.ruleOfThumb.includes('%') ? 'text-[#00A3E0]' : ''}`}>
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
