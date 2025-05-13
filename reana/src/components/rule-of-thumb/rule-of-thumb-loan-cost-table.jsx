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
        <h2 className="text-xl font-semibold">Costs by Rule of Thumb</h2>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200 rounded-lg bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left font-bold">Item</th>
                <th className="p-3 text-left font-bold">%</th>
                <th className="p-3 text-left font-bold">Amount ($)</th>
              </tr>
            </thead>
            <tbody>
              {costs.map((row, idx) => (
                <tr key={row.key} className="border-t">
                  <td className="p-3">{row.label}</td>
                  <td className="p-3 flex items-center gap-1">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={row.percent}
                      onChange={e => handleCostChange(idx, 'percent', e.target.value)}
                      className="w-20 bg-green-100 border-green-300 focus:ring-green-200"
                    />
                    <span className="ml-1">%</span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-baseline gap-0.5">
                      <span>$</span>
                      <span>{row.amount}</span>
                    </div>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-semibold">
                <td className="p-3">Total Acquisition (Buying) Closing Costs</td>
                <td className="p-3"></td>
                <td className="p-3">${totalAcquisition.toLocaleString()}</td>
              </tr>
              <tr className="bg-white font-semibold">
                <td className="p-3">Total Disposition (Selling) Closing Costs</td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={disposition.percent}
                      onChange={e => handleDispositionChange('percent', e.target.value)}
                      className="w-20 bg-green-100 border-green-300 focus:ring-green-200 font-normal"
                    />
                    <span className="ml-1">%</span>
                  </div>
                </td>
                <td className="p-3 font-bold">
                  <div className="flex items-center gap-0.5">
                    <span>$</span>
                    <span>{disposition.amount}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex flex-col gap-2 mt-6">
            <Button variant="outline" className="w-full font-bold">Go To Detailed Lender Fees 1st Mtg</Button>
            <Button variant="outline" className="w-full font-bold">Go To Detailed Lender Fees 2nd Mtg</Button>
            <Button variant="outline" className="w-full font-bold">Go To Detailed Settlement Fees</Button>
            <Button variant="outline" className="w-full font-bold">Go To Detailed Inspection Costs</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 