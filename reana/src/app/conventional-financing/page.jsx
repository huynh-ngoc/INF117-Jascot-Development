'use client'

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
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import DarkLightSwitch from '@/components/mode-toggle/dark-light-switch';
import { useRouter } from 'next/navigation';

function pmt(rate, nper, pv, fv = 0, type = 0) {
    if (rate === 0) return -(pv + fv) / nper;
    const r1 = Math.pow(1 + rate, nper);
    const payment = 
      -(rate * (pv * r1 + fv)) / 
      ((1 + rate * type) * (r1 - 1));
    return payment;
}
  
export default function ConventionalFinancingPage() {
  const router = useRouter();

  // Loan terms
  const [maxLTV, setMaxLTV] = useState(70);
  const [isIO, setIsIO] = useState(true);
  const [rate, setRate] = useState(7);
  const [balloon, setBalloon] = useState(5);

  // This Transaction
  const [asIs, setAsIs] = useState(115000);
  const [reqDownPay, setReqDownPay] = useState(0);
  const [optDownPay, setOptDownPay] = useState(11500);
  const [actualLTV, setActualLTV] = useState(70);
  const [maxLoan, setMaxLoan] = useState(80500)
  const [userLoanAmt, setUserLoanAmt] = useState(0);
  const[monthlyPayment, setMonthlyPayment] = useState(0);
  const[annualPayment, setAnnualPayment] = useState(0);

  // Fee Option Selection
  const feeOptions = [
    { key: 'rule', label: 'Use "Rule of Thumb" Default' },
    { key: 'lender', label: 'Use Detailed Lender Fees' },
    { key: 'settlement', label: 'Use Detailed Settlement Fees' },
    { key: 'inspection', label: 'Use Detailed Inspection Costs' },
  ];
  const [selectedFee, setSelectedFee] = useState('rule');

  // Calculations
  const {
    maxLoanAmt,
    loanAmt,
    downPayment,
    paymentMonthly,
    annualDebtService,
  } = useMemo(() => {
    const maxLoanAmt = maxLTV * asIs;
    const loanAmt = userLoanAmt > 0 ? userLoanAmt : maxLoanAmt;
    const downPayment = asIs - (asIs * maxLTV * 0.01);
    const annualRate = 0.07;
    const monthlyRate = annualRate / 12;
    const totalPeriods = 30 * 12;
    const loanAmount = 80500;
    const payment = pmt(monthlyRate, totalPeriods, loanAmount);
    let paymentMonthly;
    paymentMonthly = Math.abs(payment).toFixed(0);
    const annualDebtService = Math.abs(payment * 12).toFixed(0);
    setReqDownPay(downPayment);
    setMaxLoan(maxLoanAmt);
    setMonthlyPayment(paymentMonthly);
    setAnnualPayment(annualDebtService);
    return {
      maxLoanAmt,
      loanAmt,
      downPayment,
      paymentMonthly,
      annualDebtService,
    };
  }, [asIs, maxLTV, rate, balloon, isIO, userLoanAmt]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-8">
          <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink onClick={() => router.back()}>
                      Property Analysis Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbLink >
                    Conventional Financing
                  </BreadcrumbLink>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="px-8">
            <DarkLightSwitch className="place-content-center" />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 px-8 p-4 pt-0">
            
          <header >
            <h1 className="text-5xl font-bold">Conventional Financing</h1>
          </header>

          {/* ---- Loan Terms ---- */}
          <Card className="space-y-4">
            <CardHeader>
              <CardTitle>Loan Terms (Check with your lender)</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <Label>Max Loan-to-Value (%)</Label>
                <Input
                  type="number"
                  value={maxLTV}
                  onChange={e => setMaxLTV(+e.target.value)}
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
            </CardContent>
          </Card>

          {/* ---- This Transaction ---- */}
          <Card className="space-y-4">
            <CardHeader>
              <CardTitle>This Transaction</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <Label>Today’s “As-Is” Value</Label>
                <p className="mt-1">${asIs.toLocaleString()}</p>
              </div>
              <div>
                <Label>Required Down Payment</Label>
                <p className="mt-1">${downPayment.toLocaleString()}</p>
              </div>
              <div>
                <Label>Optional Down Payment (If Different) ($)</Label>
                <Input
                  type="number"
                  value={optDownPay}
                  onChange={e => setOptDownPay(+e.target.value)}
                />
              </div>
              <div>
                <Label> Actual LTV</Label>
                <p className="mt-1">{actualLTV.toFixed(2)} %</p>
              </div>
              <div>
                <Label>Max Loan Amount </Label>
                <p className="mt-1">${maxLoanAmt.toLocaleString()}</p>
              </div>
              <div>
              <Label>Loan Amount (you wish to finance) ($)</Label>
                <Input
                  type="number"
                  value={loanAmt}
                  onChange={e => setUserLoanAmt(+e.target.value)}
                />
              </div>
              <div>
                <Label>Payment Amount (Monthly) </Label>
                <p className="mt-1">${paymentMonthly.toLocaleString()}</p>
              </div>
              <div>
                <Label>Payment Amount (Annual Debt Service)</Label>
                <p className="mt-1">${annualDebtService.toLocaleString()}</p>
              </div>
            </CardContent>

            {/* ---- Add Another Loan ---- */}
            <CardFooter>
              <Button
                type="button"
                className="w-full py-2 px-4"
                variant="secondary"
                onClick={() => router.push(`/additional-financing`)}
              >
                Add Another Loan (Secondary Financing)
              </Button>
            </CardFooter>
          </Card>

          {/* ---- Loan Fees and Settlement Costs ---- */}
          <Card className="space-y-4">
            <CardHeader>
              <CardTitle>Loan Fees and Settlement Costs</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-2">
              {feeOptions.map(({ key, label }) => (
                <Button
                  key={key}
                  onClick={() => setSelectedFee(key)}
                  className={`w-full py-2 px-4 rounded-md font-medium transition`}
                  variant={selectedFee === key ? "default" : "disabled"}
                >
                  {label}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
