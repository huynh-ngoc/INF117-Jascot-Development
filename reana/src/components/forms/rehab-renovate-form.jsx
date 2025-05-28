import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export const RehabRenovateData = [
  {
    amountPaid: 0,
    totalRehabBudget: 0,
  },
];

export default function RehabRenovateForm({ amountFinanced = 0, arv =  0}) {
  const [costOfMaterials, setCostOfMaterials] = useState(15150);
  const [holdingCost, setHoldingCost] = useState(1500);
  const [overRunsPct, setOverRunsPct] = useState(10);

  const { subTotal, overRuns, totalBudget, amountPaid } = useMemo(() => {
    const subTotalCalc = Number(costOfMaterials) + Number(holdingCost);
    const overRunsCalc = Number(overRunsPct) * 0.01 * subTotalCalc;
    const totalBudgetCalc = subTotalCalc + overRunsCalc;
    const amountPaidCalc = totalBudgetCalc - Number(amountFinanced);

    return {
      subTotal: subTotalCalc,
      overRuns: overRunsCalc,
      totalBudget: totalBudgetCalc,
      amountPaid: amountPaidCalc,
    };
  }, [costOfMaterials, holdingCost, overRunsPct, amountFinanced]);

  useEffect(() => {
    RehabRenovateData[0] = {
      amountPaid,
      totalBudget,
    };
  }, [totalBudget, amountPaid]);

  return (
    <Card className="w-full h-full mt-2">
      <CardContent className="space-y-4">
        <div>
          <label>Cost of Materials and Labor for Rehab</label>
          <Input
            type="number"
            value={costOfMaterials}
            onChange={(e) => setCostOfMaterials(e.target.value)}
          />
        </div>

        <div>
          <label>Holding Cost during Rehab</label>
          <Input
            type="number"
            value={holdingCost}
            onChange={(e) => setHoldingCost(e.target.value)}
          />
        </div>

        <div>
          <label>Overruns (%)</label>
          <Input
            type="number"
            step="0.1"
            min="10"
            max="15"
            value={overRunsPct}
            onChange={(e) => setOverRunsPct(e.target.value)}
          />
        </div>

        <hr />

        <div>
          <strong>Sub-Total:</strong> ${Math.round(subTotal).toLocaleString()}
        </div>
        <div>
          <strong>Overruns:</strong> ${Math.round(overRuns).toLocaleString()}
        </div>
        <div>
          <strong>Total Rehab Budget:</strong> ${Math.round(totalBudget).toLocaleString()}
        </div>
        <div>
          <strong>Amount Financed:</strong> ${amountFinanced.toLocaleString()}
        </div>
        <div>
          <strong>Amount Paid in Cash:</strong> ${Math.round(amountPaid).toLocaleString()}
        </div>
        <div>
          <strong>After Rehab Value (ARV):</strong> ${arv.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}
