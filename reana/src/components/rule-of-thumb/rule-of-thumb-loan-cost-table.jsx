import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const defaultData = [
  {
    label: 'Rule of Thumb Lender Fees (2-5%) 1st Mtg.',
    key: 'lenderFee1st',
    percent: 5,
    amount: 4025,
  },
  {
    label: 'Rule of Thumb Lender Fees (2-5%) 2nd Mtg.',
    key: 'lenderFee2nd',
    percent: 5,
    amount: 1150,
  },
  {
    label: 'Rule of Thumb Settlement Costs (3-6%)',
    key: 'settlementFee',
    percent: 3,
    amount: 3450,
  },
  {
    label: 'Optional Inspection Fees',
    key: 'inspectionFee',
    percent: 2,
    amount: 2300,
  },
];

const defaultDisposition = {
  percent: 8,
  amount: 14000,
};

export default function RuleOfThumbLoanCostTable() {
  const [costs, setCosts] = useState(defaultData);
  const [disposition, setDisposition] = useState(defaultDisposition);

  const handleCostChange = (index, field, value) => {
    const updated = [...costs];
    updated[index][field] = value;
    setCosts(updated);
  };

  const handleDispositionChange = (field, value) => {
    setDisposition({ ...disposition, [field]: value });
  };

  const totalAcquisition = costs.reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-montserrat font-semibold text-[#2D3142]">Loan Costs by Rule of Thumb</h2>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-[#4F5D75] rounded-lg bg-white">
            <thead className="bg-[#4F5D75] text-white">
              <tr>
                <th className="p-3 text-left font-montserrat">Item</th>
                <th className="p-3 text-left font-montserrat">%</th>
                <th className="p-3 text-left font-montserrat">Amount ($)</th>
              </tr>
            </thead>
            <tbody>
              {costs.map((row, idx) => (
                <tr key={row.key} className="border-t border-[#4F5D75]">
                  <td className="p-3 font-lato">{row.label}</td>
                  <td className="p-3">
                    <div className="relative w-32">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={row.percent}
                        onChange={e => handleCostChange(idx, 'percent', e.target.value)}
                        className="w-32 text-right bg-white border border-[#4F5D75] rounded-lg font-lato text-base focus:ring-[#00A3E0] focus:border-[#00A3E0] pr-8"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4F5D75] font-lato pointer-events-none">
                        %
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="relative w-32">
                      <Input
                        type="text"
                        value={row.amount.toLocaleString()}
                        className="w-32 text-right bg-white border border-[#4F5D75] rounded-lg font-lato text-base focus:ring-[#00A3E0] focus:border-[#00A3E0] pl-6"
                        readOnly
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4F5D75] font-lato pointer-events-none">
                        $
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
              <tr className="bg-[#F8F9FA] font-semibold border-t border-[#4F5D75]">
                <td className="p-3 font-montserrat">Total Acquisition (Buying) Closing Costs</td>
                <td className="p-3"></td>
                <td className="p-3">
                  <div className="relative w-32">
                    <Input
                      type="text"
                      value={totalAcquisition.toLocaleString()}
                      className="w-32 text-right bg-white border border-[#4F5D75] rounded-lg font-lato text-base focus:ring-[#00A3E0] focus:border-[#00A3E0] pl-6"
                      readOnly
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4F5D75] font-lato pointer-events-none">
                      $
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="bg-white font-semibold border-t border-[#4F5D75]">
                <td className="p-3 font-montserrat">Total Disposition (Selling) Closing Costs</td>
                <td className="p-3">
                  <div className="relative w-32">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={disposition.percent}
                      onChange={e => handleDispositionChange('percent', e.target.value)}
                      className="w-32 text-right bg-white border border-[#4F5D75] rounded-lg font-lato text-base focus:ring-[#00A3E0] focus:border-[#00A3E0] pr-8"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4F5D75] font-lato pointer-events-none">
                      %
                    </span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="relative w-32">
                    <Input
                      type="text"
                      value={disposition.amount.toLocaleString()}
                      className="w-32 text-right bg-white border border-[#4F5D75] rounded-lg font-lato text-base focus:ring-[#00A3E0] focus:border-[#00A3E0] pl-6"
                      readOnly
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4F5D75] font-lato pointer-events-none">
                      $
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex flex-col gap-2 mt-6">
            <Button variant="outline" className="w-full font-montserrat text-[#2D3142] border-[#4F5D75] hover:bg-[#F8F9FA]">Go To Detailed Lender Fees 1st Mtg</Button>
            <Button variant="outline" className="w-full font-montserrat text-[#2D3142] border-[#4F5D75] hover:bg-[#F8F9FA]">Go To Detailed Lender Fees 2nd Mtg</Button>
            <Button variant="outline" className="w-full font-montserrat text-[#2D3142] border-[#4F5D75] hover:bg-[#F8F9FA]">Go To Detailed Settlement Fees</Button>
            <Button variant="outline" className="w-full font-montserrat text-[#2D3142] border-[#4F5D75] hover:bg-[#F8F9FA]">Go To Detailed Inspection Costs</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 