// src/app/dscr-bridge-rehab/page.jsx
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

export default function DSCRBridgeRehabPage() {
  // Loan terms
  const [maxLTV, setMaxLTV] = useState(90);
  const [isIO, setIsIO] = useState(true);
  const [rate, setRate] = useState(11.0);
  const [balloon, setBalloon] = useState(5);
  const [firstDraw, setFirstDraw] = useState(50000);

  // RTransaction
  const [asIs, setAsIs] = useState(135000);
  const [rehab, setRehab] = useState(15000);
  const [optionalDown, setOptionalDown] = useState(0);
  const [userLoanAmt, setUserLoanAmt] = useState(0);

  // Fee Option Selection
  const feeOptions = [
    { key: 'rule',       label: 'Use "Rule of Thumb" Default' },
    { key: 'lender',     label: 'Use Detailed Lender Fees' },
    { key: 'settlement', label: 'Use Detailed Settlement Fees' },
    { key: 'inspection', label: 'Use Detailed Inspection Costs' },
  ];
  const [selectedFee, setSelectedFee] = useState('rule');

  // Calculations
  const {
    total,
    maxLoanAmt,
    loanAmt,
    downPayment,
    actualLTV,
    paymentMonthly,
    annualDebtService,
  } = useMemo(() => {
    const total = asIs + rehab;
    const maxLoanAmt = (maxLTV / 100) * total;

    // loan amount precedence: optional down override → user loan override → max loan
    const loanAmt =
      optionalDown > 0
        ? total - optionalDown
        : userLoanAmt > 0
        ? userLoanAmt
        : maxLoanAmt;

    const downPayment = total - loanAmt;
    const actualLTV = total > 0 ? (loanAmt / total) * 100 : 0;

    const monthlyRate = rate / 100 / 12;
    let paymentMonthly;
    if (isIO) {
      paymentMonthly = loanAmt * monthlyRate;
    } else {
      const n = balloon * 12;
      paymentMonthly =
        (loanAmt * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -n));
    }
    const annualDebtService = paymentMonthly * 12;

    return {
      total,
      maxLoanAmt,
      loanAmt,
      downPayment,
      actualLTV,
      paymentMonthly,
      annualDebtService,
    };
  }, [
    asIs,
    rehab,
    optionalDown,
    userLoanAmt,
    maxLTV,
    rate,
    balloon,
    isIO,
  ]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">
            DSCR Purch/Rehab Bridge Loan (Brrr)
          </h1>

          {/* ---- Loan Terms ---- */}
          <Card className="space-y-4">
            <CardHeader>
              <CardTitle>Loan Terms (Check with your lender)</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label>Max Loan-to-Value (%)</Label>
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
                  <option value="IO">Interest Only</option>
                  <option value="AM">Amortizing</option>
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
                <Label>Balloon Payment Due (yrs)</Label>
                <Input
                  type="number"
                  value={balloon}
                  onChange={e => setBalloon(+e.target.value)}
                />
              </div>
              <div>
                <Label>First Draw Minimum ($)</Label>
                <Input
                  type="number"
                  value={firstDraw}
                  onChange={e => setFirstDraw(+e.target.value)}
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
                <Label>Today’s “As-Is” Value ($)</Label>
                <Input
                  type="number"
                  value={asIs}
                  onChange={e => setAsIs(+e.target.value)}
                />
              </div>
              <div>
                <Label>Your Rehab Costs ($)</Label>
                <Input
                  type="number"
                  value={rehab}
                  onChange={e => setRehab(+e.target.value)}
                />
              </div>
            </CardContent>

            <CardContent className="space-y-2">
              <p>
                Total Acquisition plus Rehab:{' '}
                <strong>${total.toLocaleString()}</strong>
              </p>
              <p>
                Required Down Payment:{' '}
                <strong>${downPayment.toLocaleString()}</strong>
              </p>
            </CardContent>

            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Optional Down Payment (If Different)</Label>
                <Input
                  type="number"
                  value={optionalDown}
                  onChange={e => setOptionalDown(+e.target.value)}
                />
              </div>
              <div>
                <Label>Loan Amount (you wish to finance)</Label>
                <Input
                  type="number"
                  value={userLoanAmt}
                  onChange={e => setUserLoanAmt(+e.target.value)}
                />
              </div>
            </CardContent>

            <CardContent className="space-y-2">
              <p>
                Actual Loan to Value: <strong>{actualLTV.toFixed(2)}%</strong>
              </p>
              <p>
                Max Acquisition & Rehab Loan Amount:{' '}
                <strong>${maxLoanAmt.toLocaleString()}</strong>
              </p>
              <p>
                Payment Amount (Monthly):{' '}
                <strong>
                  ${paymentMonthly.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </p>
              <p>
                Payment Amount (Annual Debt Service):{' '}
                <strong>
                  ${annualDebtService.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </p>
            </CardContent>

            {/* ---- Navigation Buttons ---- */}
            <CardFooter className="flex gap-4">
              <button
                type="button"
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Bridge to Perm Loan
              </button>
              <button
                type="button"
                className="flex-1 py-2 px-4 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50"
              >
                Add Another Loan
              </button>
            </CardFooter>
          </Card>

          {/* ---- Loan Fees & Settlement Costs ---- */}
          <Card className="space-y-4">
            <CardHeader>
              <CardTitle>Loan Fees and Settlement Costs</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-2">
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
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
