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
    <Card className="mb-6">
      <CardHeader>
        <h3 className="text-lg font-semibold">{title}</h3>
      </CardHeader>
      <CardContent>
        <table className="min-w-full text-sm mb-4">
          <tbody>
            {fields.map((field, idx) => {
              if (field.editable) {
                const { symbolPrefix, symbolSuffix, coreValue } = extractSymbolAndValue(field.value);
                const isPercent = symbolSuffix === '%';
                const isNumber = isNumeric(coreValue);
                // Step: 0.01 for percent, 1 otherwise
                const step = isPercent ? 0.01 : 1;
                // Use type number only if value is numeric or percent, otherwise text
                const inputType = (isNumber || isPercent) && coreValue !== '' ? 'number' : 'text';
                return (
                  <tr key={field.label} className="border-t">
                    <td className="p-2 font-medium w-2/5">{field.label}</td>
                    <td className="p-2 w-3/5">
                      <div className="flex items-center gap-1">
                        {/* Only $ symbol gets fixed width for alignment */}
                        {symbolPrefix === '$' ? (
                          <div className="min-w-[20px] text-right">$</div>
                        ) : (
                          <div className="min-w-[20px]" />
                        )}
                        <Input
                          type={inputType}
                          step={inputType === 'number' ? step : undefined}
                          value={coreValue}
                          onChange={e => {
                            let newValue = e.target.value;
                            if (symbolPrefix) newValue = symbolPrefix + newValue;
                            if (symbolSuffix) newValue = newValue + symbolSuffix;
                            onFieldChange(idx, newValue);
                          }}
                          onBlur={e => {
                            if (isPercent) {
                              let val = e.target.value;
                              if (!isNaN(val) && val !== '') {
                                val = parseFloat(val).toFixed(2);
                                let newValue = val;
                                if (symbolPrefix) newValue = symbolPrefix + newValue;
                                if (symbolSuffix) newValue = newValue + symbolSuffix;
                                onFieldChange(idx, newValue);
                              }
                            }
                          }}
                          className="w-20 text-center"
                        />
                        {symbolSuffix && <span>{symbolSuffix}</span>}
                      </div>
                    </td>
                  </tr>
                );
              } else {
                // Align static value with input fields
                const { symbolPrefix, symbolSuffix, coreValue } = extractSymbolAndValue(field.value);
                return (
                  <tr key={field.label} className="border-t">
                    <td className="p-2 font-medium w-2/5">{field.label}</td>
                    <td className="p-2 w-3/5">
                      <div className="flex items-center gap-1">
                        {symbolPrefix === '$' ? (
                          <div className="min-w-[20px] text-right">$</div>
                        ) : (
                          <div className="min-w-[20px]" />
                        )}
                        <span className="pl-2">{coreValue}{symbolSuffix}</span>
                      </div>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        <Button className="w-full font-bold" variant="outline" onClick={onEnterClose}>
          Enter & Close
        </Button>
      </CardContent>
    </Card>
  );
} 