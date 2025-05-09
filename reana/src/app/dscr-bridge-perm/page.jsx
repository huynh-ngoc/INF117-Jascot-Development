'use client';

import React, { useState, useMemo } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DSCRAfterRehabPermPage() {
  // Loan Terms
  const [maxLTV, setMaxLTV] = useState(75);
  const [isIO, setIsIO] = useState(false);
  const [amortYears, setAmortYears] = useState(30);
  const [rate, setRate] = useState(7.0);
  const [refiMonths, setRefiMonths] = useState(9);
  const [totalFees, setTotalFees] = useState(3.0);

  // This Transaction
  const [afterRehab, setAfterRehab] = useState(175000);
  const [userLoanAmt, setUserLoanAmt] = useState(0);

  // Fee Option Selection
  const feeOptions = [
    { key: 'rule',       label: 'Use "Rule of Thumb" Default' },
    { key: 'lender',     label: 'Use Detailed Lender Fees' },
    { key: 'settlement', label: 'Use Detailed Settlement Fees' },
  ];
  const [selectedFee, setSelectedFee] = useState('rule');

  // Derived Calculations
  const {
    maxPermLoanAmt,
    paymentMonthly,
    annualDebtService,
  } = useMemo(() => {
    const maxPermLoanAmt = (maxLTV / 100) * afterRehab;
    const loanAmt = userLoanAmt > 0 ? userLoanAmt : maxPermLoanAmt;
    const monthlyRate = rate / 100 / 12;
    let paymentMonthly;
    if (isIO) {
      paymentMonthly = loanAmt * monthlyRate;
    } else {
      const n = amortYears * 12;
      paymentMonthly =
        (loanAmt * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -n));
    }
    const annualDebtService = paymentMonthly * 12;
    return { maxPermLoanAmt, paymentMonthly, annualDebtService };
  }, [afterRehab, maxLTV, rate, amortYears, isIO, userLoanAmt]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">
            DSCR “After Rehab” Perm Loan
          </h1>

          {/* ---- Loan Terms ---- */}
          <Card className="space-y-4">
            <CardHeader>
              <CardTitle>Loan Terms (Check with your lender)</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label>Max Perm Loan LTV (%)</Label>
                <Input
                  type="number"
                  value={maxLTV}
                  onChange={e => setMaxLTV(+e.target.value)}
                />
              </div>
              <div>
                <Label>Amortization (yrs) or IO</Label>
                <select
                  className="mt-1 block w-full rounded border-gray-300"
                  value={isIO ? 'IO' : 'AM'}
                  onChange={e => setIsIO(e.target.value === 'IO')}
                >
                  <option value="AM">Amortizing</option>
                  <option value="IO">Interest Only</option>
                </select>
              </div>
              <div>
                <Label>Interest Rate (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={rate}
                  onChange={e => setRate(+e.target.value)}
                />
              </div>
              <div>
                <Label>Refi to this loan after (months)</Label>
                <Input
                  type="number"
                  value={refiMonths}
                  onChange={e => setRefiMonths(+e.target.value)}
                />
              </div>
              <div>
                <Label>Total Lender Fees (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={totalFees}
                  onChange={e => setTotalFees(+e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* ---- This Transaction ---- */}
          <Card className="space-y-4">
            <CardHeader>
              <CardTitle>This Transaction</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>After Rehab Value (ARV) ($)</Label>
                <Input
                  type="number"
                  value={afterRehab}
                  onChange={e => setAfterRehab(+e.target.value)}
                />
              </div>
            </CardContent>

            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Max Perm Loan Amount</Label>
                <p className="mt-1">${maxPermLoanAmt.toLocaleString()}</p>
              </div>
            </CardContent>

            <CardContent className="space-y-2">
              <p>
                Payment Amount (Monthly):{' '}
                <strong>
                  $
                  {paymentMonthly.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </p>
              <p>
                Payment Amount (Annual Debt Service):{' '}
                <strong>
                  $
                  {annualDebtService.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </p>
            </CardContent>

            {/* ---- Styled Button Group ---- */}
            <CardFooter className="flex flex-col space-y-3">
              {feeOptions.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedFee(key)}
                  className={`
                    w-full py-2 px-4 rounded-md font-medium transition
                    ${
                      selectedFee === key
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </CardFooter>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
