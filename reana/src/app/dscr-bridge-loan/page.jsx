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

export default function DSCRBridgeLoanPage() {
  const router = useRouter();

  // ---- Loan Terms ----
  const [maxLTV, setMaxLTV] = useState(90);
  const [isIO, setIsIO] = useState(true);
  const [rate, setRate] = useState(11.0);
  const [balloon, setBalloon] = useState(5);
  const [firstDraw, setFirstDraw] = useState(50000);
  const [amortTerm, setAmortTerm] = useState(30); // 1–30 yrs term

  // ---- This Transaction ----
  const [asIs, setAsIs] = useState(135000);
  const [rehab, setRehab] = useState(0);
  const [userLoanAmt, setUserLoanAmt] = useState(0);

  // ---- Fee Option Selection ----
  const feeOptions = [
    {
      key: 'rule',
      label: 'Use "Rule of Thumb" Default',
      route: '/rule-of-thumb-metrics',       // TODO: update to your actual page path
    },
    {
      key: 'lender',
      label: 'Use Detailed Lender Fees',
      route: '/detailed-lender-fees-1st',        // TODO: update
    },
    {
      key: 'settlement',
      label: 'Use Detailed Settlement Fees',
      route: '/detailed-settlement-fees',    // TODO: update
    },
    {
      key: 'inspection',
      label: 'Use Detailed Inspection Costs',
      route: '/detailed-inspection-fees',   // TODO: update
    },
  ];
  const [selectedFee, setSelectedFee] = useState('rule');

  // Utility for parsing and formatting
  const parseNum = str => parseFloat(str.replace(/[^\d.-]/g, '')) || 0;
  const fmt = (num, dec = 0) =>
    num.toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec });

  // ---- Derived Calculations ----
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
    const loanAmt = userLoanAmt > 0 ? userLoanAmt : maxLoanAmt;
    const downPayment = total - loanAmt;
    const actualLTV = total > 0 ? (loanAmt / total) * 100 : 0;

    const monthlyRate = rate / 100 / 12;
    let paymentMonthly;
    if (isIO) {
      paymentMonthly = loanAmt * monthlyRate;
    } else {
      const n = amortTerm * 12;
      paymentMonthly =
        (loanAmt * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
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
  }, [asIs, rehab, maxLTV, rate, balloon, isIO, amortTerm, userLoanAmt]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">
            DSCR Purchase with Rehab, Fix n Flip Loan
          </h1>

          {/* ---- Loan Terms ---- */}
          <Card className="space-y-4">
            <CardHeader>
              <CardTitle>Loan Terms (Check with your lender)</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Max LTV % */}
              <div className="relative">
                <Label>Max Loan-to-Value</Label>
                <Input
                  type="text"
                  className="pl-2 pr-7"
                  value={`${fmt(maxLTV, 3)}%`}
                  onChange={e => setMaxLTV(parseNum(e.target.value))}
                />
              </div>
              {/* IO or AM */}
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
              {/* Balloon (yrs) */}
              <div className="relative">
                <Label>Balloon Payment Due</Label>
                <Input
                  type="text"
                  className="pl-2 pr-2"
                  value={`${fmt(balloon, 0)}`}
                  onChange={e => setBalloon(parseNum(e.target.value))}
                />
              </div>
              {/* First Draw $ */}
              <div className="relative">
                <Label>First Draw Minimum</Label>
                <Input
                  type="text"
                  className="pl-7 pr-2"
                  value={`$${fmt(firstDraw)}`}
                  onChange={e => setFirstDraw(parseNum(e.target.value))}
                />
              </div>
              {/* Term 1-30 */}
              {!isIO && (
                <div className="relative">
                  <Label>Term (Years)</Label>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    value={amortTerm}
                    onChange={e => setAmortTerm(+e.target.value)}
                    className="w-full"
                  />
                  <div className="mt-1 text-sm">{amortTerm} yrs</div>
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
              <div className="relative">
                <Label>Asking Price / Your Offer</Label>
                <Input
                  type="text"
                  className="pl-7 pr-2"
                  value={`$${fmt(asIs)}`}
                  onChange={e => setAsIs(parseNum(e.target.value))}
                />
              </div>
              <div className="relative">
                <Label>Rehab Costs Financed</Label>
                <Input
                  type="text"
                  className="pl-7 pr-2"
                  value={`$${fmt(rehab)}`}
                  onChange={e => setRehab(parseNum(e.target.value))}
                />
              </div>
            </CardContent>

            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Max Acquisition + Rehab Loan Amt</Label>
                <p className="mt-1">${fmt(maxLoanAmt)}</p>
              </div>
              <div className="relative">
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
              <p>Total Acquisition + Rehab: <strong>${fmt(total)}</strong></p>
              <p>Required Down Payment: <strong>${fmt(downPayment)}</strong></p>
              <p>Actual LTV: <strong>{fmt(actualLTV, 3)}%</strong></p>
              <p>Max Loan Amount: <strong>${fmt(maxLoanAmt)}</strong></p>
              <p>Loan Amount: <strong>${fmt(loanAmt)}</strong></p>
              <p>Payment Amount (Monthly): <strong>${fmt(paymentMonthly, 2)}</strong></p>
              <p>Payment Amount (Annual Debt Service): <strong>${fmt(annualDebtService, 2)}</strong></p>
            </CardContent>

            {/* ---- Add Another Loan ---- */}
            <CardFooter>
              <button
                type="button"
                className="w-full py-2 px-4 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50"
                onClick={() => {
                  router.push('/additional-financing');
                }}
              >
                Add Another Loan (Secondary Financing)
              </button>
            </CardFooter>
          </Card>

          {/* ---- Loan Fees & Settlement Costs ---- */}
          <Card className="space-y-4">
            <CardHeader>
              <CardTitle>Loan Fees and Settlement Costs</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-2">
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
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
