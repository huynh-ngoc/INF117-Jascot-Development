'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  // ---- Loan Terms ----
  const [maxLTV, setMaxLTV] = useState(75);
  const [isIO, setIsIO] = useState(false);
  const [amortYears, setAmortYears] = useState(30);
  const [rate, setRate] = useState(7.0);
  const [refiMonths, setRefiMonths] = useState(9);
  const [totalFees, setTotalFees] = useState(3.0);

  // ---- This Transaction ----
  const [afterRehab, setAfterRehab] = useState(175000);
  const [userLoanAmt, setUserLoanAmt] = useState(0);

  // ---- Fee Option Selection ----
  const feeOptions = [
    {
      key: 'rule',
      label: 'Use "Rule of Thumb" Default',
      route: '/rule-of-thumb-metrics',       
    },
    {
      key: 'lender',
      label: 'Use Detailed Lender Fees',
      route: '/detailed-lender-fees-1st',      
    },
    {
      key: 'settlement',
      label: 'Use Detailed Settlement Fees',
      route: '/detailed-settlement-fees',   
    },
  ];
  const [selectedFee, setSelectedFee] = useState('rule');

  // ---- Utils to parse & format numbers ----
  const parseNum = str => parseFloat(str.replace(/[^\d.-]/g, '')) || 0;
  const fmt = (num, dec = 0) =>
    num.toLocaleString(undefined, {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    });

  // ---- Derived Calculations ----
  const { maxPermLoanAmt, paymentMonthly, annualDebtService } = useMemo(() => {
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
              {/* Max LTV % */}
              <div className="relative">
                <Label>Max Perm Loan LTV</Label>
                <Input
                  type="text"
                  className="pl-2 pr-7"
                  value={`${fmt(maxLTV, 2)}%`}
                  onChange={e => setMaxLTV(parseNum(e.target.value))}
                />
              </div>

              {/* Amort or IO */}
              <div>
                <Label>Amortization or IO</Label>
                <select
                  className="mt-1 block w-full rounded border-gray-300"
                  value={isIO ? 'IO' : 'AM'}
                  onChange={e => setIsIO(e.target.value === 'IO')}
                >
                  <option value="AM">Amortizing</option>
                  <option value="IO">Interest Only</option>
                </select>
              </div>

              {/* Interest Rate % */}
              <div className="relative">
                <Label>Interest Rate</Label>
                <Input
                  type="text"
                  className="pl-2 pr-7"
                  value={`${fmt(rate, 2)}%`}
                  onChange={e => setRate(parseNum(e.target.value))}
                />
              </div>

              {/* Refi (months) */}
              <div className="relative">
                <Label>Refi after (?) months</Label>
                <Input
                  type="text"
                  className="pl-2 pr-10"
                  value={`${fmt(refiMonths, 0)}`}
                  onChange={e => setRefiMonths(parseNum(e.target.value))}
                />
              </div>

              {/* Total Fees % */}
              <div className="relative">
                <Label>Total Lender Fees</Label>
                <Input
                  type="text"
                  className="pl-2 pr-7"
                  value={`${fmt(totalFees, 2)}%`}
                  onChange={e => setTotalFees(parseNum(e.target.value))}
                />
              </div>

              {/* Term input when amortizing */}
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
            </CardContent>
          </Card>

          {/* ---- This Transaction ---- */}
          <Card className="space-y-4">
            <CardHeader>
              <CardTitle>This Transaction</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* ARV $ */}
              <div className="relative">
                <Label>After Rehab Value (ARV) Per Appraiser</Label>
                <Input
                  type="text"
                  className="pl-7 pr-2"
                  value={`$${fmt(afterRehab)}`}
                  onChange={e => setAfterRehab(parseNum(e.target.value))}
                />
              </div>
            </CardContent>

            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Max Loan Amt */}
              <div>
                <Label>Max Perm Loan Amount</Label>
                <p className="mt-1">
                  ${fmt(maxPermLoanAmt)}
                </p>
              </div>
            </CardContent>

            <CardContent className="space-y-2">
              <p>
                Payment Amount (Monthly): <strong>${fmt(paymentMonthly, 2)}</strong>
              </p>
              <p>
                Payment Amount (Annual Debt Service): <strong>${fmt(annualDebtService, 2)}</strong>
              </p>
            </CardContent>

            {/* ---- Styled Fee Buttons ---- */}
            <CardFooter className="flex flex-col space-y-3">
              {feeOptions.map(({ key, label, route }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setSelectedFee(key);
                    router.push(route);
                  }}
                  className={`
                    w-full py-2 px-4 rounded-md font-medium transition
                    ${selectedFee === key
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
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
