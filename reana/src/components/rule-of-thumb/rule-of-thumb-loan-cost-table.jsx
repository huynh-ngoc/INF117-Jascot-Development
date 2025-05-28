import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const defaultData = [
  {
    label: 'Rule of Thumb Lender Fees (2-5%) 1st Mtg.',
    key: 'lenderFee1st',
    percent: 5,
    amount: 0,
  },
  {
    label: 'Rule of Thumb Lender Fees (2-5%) 2nd Mtg.',
    key: 'lenderFee2nd',
    percent: 5,
    amount: 0,
  },
  {
    label: 'Rule of Thumb Settlement Costs (3-6%)',
    key: 'settlementFee',
    percent: 3,
    amount: 0,
  },
  {
    label: 'Optional Inspection Fees',
    key: 'inspectionFee',
    percent: 2,
    amount: 0,
  },
];

const defaultDisposition = {
  percent: 8,
  amount: 0,
};

export default function RuleOfThumbLoanCostTable() {
  const [costs, setCosts] = useState(defaultData);
  const [disposition, setDisposition] = useState(defaultDisposition);
  const [hasChanges, setHasChanges] = useState(false);
  const [maxLoan, setMaxLoan] = useState(0);
  const [asIs, setAsIs] = useState(0);
  const [loanAmt2, setLoanAmt2] = useState(0);
  // Placeholder for sale price (for disposition calculation)
  const [salePrice, setSalePrice] = useState(0); // TODO: Connect to actual sale price when available
  const router = useRouter();

  // Fetch from backend on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch conventional financing data
        const convRes = await fetch('/api/conventional-financing');
        if (convRes.ok) {
          const convData = await convRes.json();
          if (convData.success && convData.conventionalFinancing) {
            setMaxLoan(Number(convData.conventionalFinancing.maxLoan) || 0);
            setAsIs(Number(convData.conventionalFinancing.asIs) || 0);
          }
        }
        // Fetch additional financing data
        const addRes = await fetch('/api/additional-financing');
        if (addRes.ok) {
          const addData = await addRes.json();
          if (addData.success && addData.additionalFinancing) {
            setLoanAmt2(Number(addData.additionalFinancing.loanAmt2) || 0);
          }
        }
        // Fetch rule-of-thumb loan cost data
        const response = await fetch('/api/rule-of-thumb-loan-cost');
        if (!response.ok) throw new Error('Failed to fetch loan cost data');
        const data = await response.json();
        if (data.success && data.ruleOfThumbLoanCost) {
          const { costs: savedCosts, disposition: savedDisposition } = data.ruleOfThumbLoanCost;
          if (savedCosts && Array.isArray(savedCosts)) {
            setCosts(savedCosts.map(item => ({ ...item, percent: item.percent * 100 })));
          }
          if (savedDisposition) {
            setDisposition({ ...savedDisposition, percent: savedDisposition.percent * 100 });
          }
        }
      } catch (error) {
        console.error('Error fetching loan cost data:', error);
      }
    };
    fetchData();
  }, []);

  // Calculate all amounts dynamically
  const calculatedCosts = costs.map((row, idx) => {
    let amount = 0;
    const percent = Number(row.percent) / 100;
    if (row.key === 'lenderFee1st') {
      amount = percent * maxLoan;
    } else if (row.key === 'lenderFee2nd') {
      amount = percent * loanAmt2;
    } else if (row.key === 'settlementFee') {
      amount = percent * asIs;
    } else if (row.key === 'inspectionFee') {
      amount = percent * asIs;
    }
    return { ...row, amount: Math.round(amount) };
  });

  const totalAcquisition = calculatedCosts.reduce((sum, item) => sum + Number(item.amount), 0);

  // Disposition calculation: percent * salePrice (placeholder)
  const dispositionAmount = Math.round((Number(disposition.percent) / 100) * salePrice);

  // Update disposition amount for display
  const calculatedDisposition = { ...disposition, amount: dispositionAmount };

  const handleCostChange = (index, field, value) => {
    const updated = [...costs];
    updated[index][field] = value;
    setCosts(updated);
    setHasChanges(true);
  };

  const handleDispositionChange = (field, value) => {
    setDisposition({ ...disposition, [field]: value });
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/rule-of-thumb-loan-cost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          costs: costs.map(item => ({ ...item, percent: Number(item.percent) })),
          disposition: { ...disposition, percent: Number(disposition.percent) },
        }),
      });
      if (!response.ok) throw new Error('Failed to save loan cost data');
      const data = await response.json();
      if (data.success) {
        setHasChanges(false);
        alert('Loan cost data saved successfully!');
      }
    } catch (error) {
      console.error('Error saving loan cost data:', error);
      alert('Failed to save data. Please try again.');
    }
  };

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
              {calculatedCosts.map((row, idx) => (
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
                      value={calculatedDisposition.amount.toLocaleString()}
                      className="w-32 text-right bg-white border border-[#4F5D75] rounded-lg font-lato text-base focus:ring-[#00A3E0] focus:border-[#00A3E0] pl-6"
                      readOnly
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4F5D75] font-lato pointer-events-none">
                      $
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {/* TODO: Connect sale price (currently {salePrice}) to actual sale value from your database. */}
                    Uses placeholder sale price. Connect to actual sale value.
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex flex-col gap-2 mt-6">
            <Button variant="outline" className="w-full font-montserrat text-[#2D3142] border-[#4F5D75] hover:bg-[#F8F9FA]" onClick={() => router.push('/detailed-lender-fees-1st')}>Go To Detailed Lender Fees 1st Mtg</Button>
            <Button variant="outline" className="w-full font-montserrat text-[#2D3142] border-[#4F5D75] hover:bg-[#F8F9FA]" onClick={() => router.push('/detailed-lender-fees-2nd')}>Go To Detailed Lender Fees 2nd Mtg</Button>
            <Button variant="outline" className="w-full font-montserrat text-[#2D3142] border-[#4F5D75] hover:bg-[#F8F9FA]" onClick={() => router.push('/detailed-settlement-fees')}>Go To Detailed Settlement Fees</Button>
            <Button variant="outline" className="w-full font-montserrat text-[#2D3142] border-[#4F5D75] hover:bg-[#F8F9FA]" onClick={() => router.push('/detailed-inspection-fees')}>Go To Detailed Inspection Fees</Button>
          </div>
          {hasChanges && (
            <div className="flex justify-end mt-4">
              <Button onClick={handleSave} className="bg-[#00A3E0] hover:bg-[#0077AC] text-white px-4 py-2 rounded">
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 