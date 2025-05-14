import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function extractSymbolAndValue(value) {
  // Handles $123, 123%, $123%, etc.
  let symbolPrefix = '';
  let symbolSuffix = '';
  let coreValue = value;
  if (coreValue.startsWith('$')) {
    symbolPrefix = '$';
    coreValue = coreValue.slice(1);
  }
  if (coreValue.endsWith('%')) {
    symbolSuffix = '%';
    coreValue = coreValue.slice(0, -1);
  }
  return { symbolPrefix, symbolSuffix, coreValue };
}

function isNumeric(val) {
  return !isNaN(val) && val !== '' && isFinite(val);
}

export default function LoanTermsCard({ title, fields, onFieldChange, onEnterClose }) {
  return (
    <Card className="mb-6 border border-[#4F5D75]">
      <CardHeader>
        <h3 className="text-lg font-montserrat font-semibold text-[#2D3142]">{title}</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fields.map((field, index) => {
            const { symbolPrefix, symbolSuffix, coreValue } = extractSymbolAndValue(field.value);
            return (
              <div key={index} className="flex items-center justify-between">
                <label className="font-lato text-[#2D3142]">{field.label}</label>
                <div className="relative flex items-center">
                  {symbolPrefix && (
                    <span className="absolute left-2 text-[#4F5D75] font-lato">{symbolPrefix}</span>
                  )}
                  <Input
                    type="text"
                    value={coreValue}
                    onChange={(e) => {
                      let newValue = e.target.value;
                      if (isNumeric(newValue)) {
                        newValue = symbolPrefix + newValue + symbolSuffix;
                        onFieldChange(index, newValue);
                      }
                    }}
                    className={`w-32 text-right bg-white border border-[#4F5D75] rounded-lg font-lato text-base focus:ring-[#00A3E0] focus:border-[#00A3E0] ${
                      symbolPrefix ? 'pl-6' : ''
                    } ${symbolSuffix ? 'pr-6' : ''}`}
                    disabled={!field.editable}
                  />
                  {symbolSuffix && (
                    <span className="absolute right-2 text-[#4F5D75] font-lato">{symbolSuffix}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      {onEnterClose && (
        <div className="p-4 border-t border-[#4F5D75]">
          <Button
            onClick={onEnterClose}
            className="w-full bg-[#00A3E0] text-white font-montserrat hover:bg-[#0077AC] hover:shadow-md"
          >
            Save Changes
          </Button>
        </div>
      )}
    </Card>
  );
} 