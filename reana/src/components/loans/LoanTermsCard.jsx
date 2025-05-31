import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function isMoneyField(label) {
  // Add more money field labels as needed
  const moneyFieldLabels = [
    'Loan Amount',
    'Monthly Payment',
    'Annual Payment',
    'Balloon Payment',
    'First Draw',
    'Asking Price',
    'Rehab Costs',
    'Max Loan Amount',
    'User Loan Amount',
    'Existing Loan Balance',
    'Current Payment Schedule'
  ];
  return moneyFieldLabels.some(moneyLabel => label.includes(moneyLabel));
}

function isNumeric(val) {
  return !isNaN(val) && val !== '' && isFinite(val);
}

export default function LoanTermsCard({ title, fields, onFieldChange, onEnterClose }) {
  return (
    <Card className="mb-6 border border-[#4F5D75]">
      <CardContent>
        <div className="space-y-4">
          {fields.map((field, index) => {
            const isMoney = isMoneyField(field.label);
            const value = field.value.replace(/[$,]/g, ''); // Remove $ and commas from stored value
            
            return (
              <div key={index} className="flex items-center justify-between">
                <label className="font-lato text-[#2D3142]">{field.label}</label>
                <div className="relative flex items-center">
                  {/* Show $ for money fields */}
                  {isMoney && (
                    <span className="absolute left-2 text-[#4F5D75] font-lato">$</span>
                  )}
                  <Input
                    type="text"
                    value={value}
                    onChange={(e) => {
                      // Remove any $ or commas from input
                      const rawValue = e.target.value.replace(/[$,]/g, '');
                      onFieldChange(index, rawValue);
                    }}
                    onBlur={() => {
                      // Format with commas on blur for money fields
                      if (isMoney) {
                        let raw = value.replace(/,/g, '');
                        if (raw) {
                          const parts = raw.split('.');
                          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                          raw = parts.join('.');
                        }
                        onFieldChange(index, raw);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && isMoney) {
                        let raw = value.replace(/,/g, '');
                        if (raw) {
                          const parts = raw.split('.');
                          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                          raw = parts.join('.');
                        }
                        onFieldChange(index, raw);
                      }
                    }}
                    className={`w-32 text-right bg-white border border-[#4F5D75] rounded-lg font-lato text-base focus:ring-[#00A3E0] focus:border-[#00A3E0] ${
                      isMoney ? 'pl-6' : ''
                    }`}
                    disabled={!field.editable}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
} 