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

export default function AdditionalFinancingPage() {
  const router = useRouter();

  // Loan terms
  const [maxLTV, setMaxLTV] = useState(90);
  const [isIO, setIsIO] = useState(true);
  const [rate, setRate] = useState(11);
  const [balloon, setBalloon] = useState(5);
  const [lenderFee, setlenderFee] = useState(0);

  // Get from database
  const [asIs, setAsIs] = useState(115000);
  const [maxLoanAmt, setMaxLoanAmt] = useState(80500);
  const [userLoanAmt, setUserLoanAmt] = useState(80500);

  // This Transaction
  const [reqDownPay, setReqDownPay] = useState(0);
  const [loanAmt2, setLoanAmt2] = useState(0);
  const [actualLTV, setActualLTV] = useState(0);
  const[monthlyPayment, setMonthlyPayment] = useState(0);
  const[annualPayment, setAnnualPayment] = useState(0);

  // Fee Option Selection
  const feeOptions = [
    { key: 'rule', label: 'Use "Rule of Thumb" Default' },
    { key: 'lender', label: 'Use Detailed Lender Fees' },
  ];
  const [selectedFee, setSelectedFee] = useState('rule');

  // Calculations
  const {
    loanAmt,
    downPayment,
    LTV,
    paymentMonthly,
    annualDebtService,
  } = useMemo(() => {
    const downPayment = asIs - (asIs * maxLTV * 0.01);
    const loanAmt = asIs - downPayment - userLoanAmt;
    const LTV = (maxLoanAmt + loanAmt) / asIs;
    const annualRate = 0.07;
    const monthlyRate = annualRate / 12;
    const totalPeriods = 30 * 12;
    const loanAmount = 80500;
    const payment = pmt(monthlyRate, totalPeriods, loanAmount);
    let paymentMonthly;
    paymentMonthly = Math.abs(payment).toFixed(0);
    const annualDebtService = Math.abs(payment * 12).toFixed(0);
    setReqDownPay(downPayment);
    setActualLTV(LTV);
    setLoanAmt2(loanAmt)
    setMonthlyPayment(paymentMonthly);
    setAnnualPayment(annualDebtService);
    return {
      loanAmt,
      downPayment,
      LTV,
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
                      Conventional Financing
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbLink >
                    Additional Financing
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
            <h1 className="text-5xl font-bold">Additional Financing - 2nd Position</h1>
          </header>

          {/* ---- Loan Terms ---- */}
          <Card className="space-y-4">
            <CardHeader>
              <CardTitle>Loan Terms (Check with your lender)</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <Label>Combined Max LTV (%)</Label>
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
              <div>
                <Label>Total Lender Fees (%)</Label>
                <Input
                  type="number"
                  value={lenderFee}
                  onChange={e => setlenderFee(+e.target.value)}
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
                <Label>Today’s “As-Is” Value ($)</Label>
                <p className="mt-1">${asIs.toLocaleString()}</p>
              </div>
              <div>
                <Label>Required Down Payment ($)</Label>
                <p className="mt-1">${downPayment.toLocaleString()}</p>
              </div>
              <div>
                <Label>2nd Mtg. Loan Amount ($)</Label>
                <p className="mt-1">${loanAmt.toLocaleString()}</p>
              </div>
              <div>
                <Label>Actual Combined Loan to Value</Label>
                <p className="mt-1">{LTV.toFixed(2)} %</p>
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
