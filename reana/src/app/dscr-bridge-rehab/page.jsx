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
  const [maxLTV, setMaxLTV] = useState(90);
  const [isIO, setIsIO] = useState(true);
  const [rate, setRate] = useState(11.0);
  const [balloon, setBalloon] = useState(5);
  const [firstDraw, setFirstDraw] = useState(50000);
  const [amortYears, setAmortYears] = useState(30);
  const [asIs, setAsIs] = useState(135000);
  const [rehab, setRehab] = useState(15000);
  const [optionalDown, setOptionalDown] = useState(0);
  const [userLoanAmt, setUserLoanAmt] = useState(0);

  const feeOptions = [
    { key: 'rule', label: 'Use "Rule of Thumb" Default' },
    { key: 'lender', label: 'Use Detailed Lender Fees' },
    { key: 'settlement', label: 'Use Detailed Settlement Fees' },
    { key: 'inspection', label: 'Use Detailed Inspection Costs' },
  ];
  const [selectedFee, setSelectedFee] = useState('rule');

  const parseNum = str => parseFloat(str.replace(/[^\d.-]/g, '')) || 0;
  const fmt = (num, dec = 0) =>
    num.toLocaleString(undefined, {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    });

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
      const n = amortYears * 12;
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
    amortYears,
  ]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">
            DSCR Purchase/Rehab Bridge Loan (Brrr)
          </h1>

          <Card className="space-y-4">
            <CardHeader>
              <CardTitle>Loan Terms (Check with your lender)</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="relative">
                <Label>Max Loan-to-Value</Label>
                <Input
                  type="text"
                  className="pl-2 pr-7"
                  value={`${fmt(maxLTV, 2)}%`}
                  onChange={e => setMaxLTV(parseNum(e.target.value))}
                />
              </div>
              <div>
                <Label>Amortization or IO</Label>
                <select
                  className="mt-1 block w-full rounded border-gray-300"
                  value={isIO ? 'IO' : 'AM'}
                  onChange={e => setIsIO(e.target.value === 'IO')}
                >
                  <option value="IO">Interest Only</option>
                  <option value="AM">Amortizing</option>
                </select>
              </div>
              {!isIO && (
                <div className="relative">
                <Label>Term (Years)</Label>
                <input
                  type="range"
                  min={1}
                  max={30}
                  value={amortYears}
                  onChange={e => setAmortYears(+e.target.value)}
                  className="w-full"
                />
                <div className="mt-1 text-sm">{amortYears}</div>
              </div>
              )}
              <div className="relative">
                <Label>Interest Rate</Label>
                <Input
                  type="text"
                  className="pl-2 pr-7"
                  value={`${fmt(rate, 2)}%`}
                  onChange={e => setRate(parseNum(e.target.value))}
                />
              </div>
              <div className="relative">
                <Label>Balloon Payment Due</Label>
                <Input
                  type="text"
                  className="pl-2 pr-2"
                  value={`${fmt(balloon, 0)}`}
                  onChange={e => setBalloon(parseNum(e.target.value))}
                />
              </div>
              <div className="relative">
                <Label>First Draw Minimum</Label>
                <Input
                  type="text"
                  className="pl-7 pr-2"
                  value={`$${fmt(firstDraw)}`}
                  onChange={e => setFirstDraw(parseNum(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="space-y-4">
            <CardHeader>
              <CardTitle>This Transaction</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Today’s “As-Is” Value</Label>
                <Input
                  type="text"
                  className="pl-7 pr-2"
                  value={`$${fmt(asIs)}`}
                  onChange={e => setAsIs(parseNum(e.target.value))}
                />
              </div>
              <div>
                <Label>Your Rehab Costs</Label>
                <Input
                  type="text"
                  className="pl-7 pr-2"
                  value={`$${fmt(rehab)}`}
                  onChange={e => setRehab(parseNum(e.target.value))}
                />
              </div>
            </CardContent>

            <CardContent className="space-y-2">
              <p>
                Total Acquisition plus Rehab: <strong>${fmt(total)}</strong>
              </p>
              <p>
                Required Down Payment: <strong>${fmt(downPayment)}</strong>
              </p>
            </CardContent>

            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Optional Down Payment (If Different)</Label>
                <Input
                  type="text"
                  className="pl-7 pr-2"
                  value={`$${fmt(optionalDown)}`}
                  onChange={e => setOptionalDown(parseNum(e.target.value))}
                />
              </div>
              <div>
                <Label>Loan Amount (you wish to finance)</Label>
                <Input
                  type="text"
                  className="pl-7 pr-2"
                  value={`$${fmt(userLoanAmt)}`}
                  onChange={e => setUserLoanAmt(parseNum(e.target.value))}
                />
              </div>
            </CardContent>

            <CardContent className="space-y-2">
              <p>
                Actual Loan to Value: <strong>{fmt(actualLTV, 2)}%</strong>
              </p>
              <p>
                Max Acquisition & Rehab Loan Amount:{' '}
                <strong>${fmt(maxLoanAmt)}</strong>
              </p>
              <p>
                Payment Amount (Monthly):{' '}
                <strong>${fmt(paymentMonthly, 2)}</strong>
              </p>
              <p>
                Payment Amount (Annual Debt Service):{' '}
                <strong>${fmt(annualDebtService, 2)}</strong>
              </p>
            </CardContent>

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
                  className={`w-full py-2 px-4 rounded-md font-medium transition ${
                    selectedFee === key
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
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
