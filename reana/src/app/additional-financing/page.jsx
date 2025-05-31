'use client'

import React, { useState, useMemo, useEffect } from 'react';
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
  const [hasChanges, setHasChanges] = useState(false);

  // Loan terms (percent fields as whole numbers for UI)
  const [maxLTV, setMaxLTV] = useState(90); // e.g., 90 for 90%
  const [isIO, setIsIO] = useState(true);
  const [rate, setRate] = useState(11); // e.g., 11 for 11%
  const [balloon, setBalloon] = useState(5);
  const [lenderFee, setlenderFee] = useState(0); // e.g., 1 for 1%

  // Get from database
  const [asIs, setAsIs] = useState(115000);
  const [maxLoanAmt, setMaxLoanAmt] = useState(80500);
  const [userLoanAmt, setUserLoanAmt] = useState(80500);

  // This Transaction
  const [reqDownPay, setReqDownPay] = useState(0);
  const [loanAmt2, setLoanAmt2] = useState(0);
  const [actualLTV, setActualLTV] = useState(0); // e.g., 90 for 90%
  const[monthlyPayment, setMonthlyPayment] = useState(0);
  const[annualPayment, setAnnualPayment] = useState(0);

  // Fee Option Selection
  const feeOptions = [
    { key: 'rule', label: 'Use "Rule of Thumb" Default' },
    { key: 'lender', label: 'Use Detailed Lender Fees' },
  ];
  const [selectedFee, setSelectedFee] = useState('rule');

  // Load data from Firebase when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch conventional financing data for reference
        const conventionalResponse = await fetch('/api/conventional-financing');
        if (!conventionalResponse.ok) {
          throw new Error('Failed to fetch conventional financing data');
        }
        const conventionalData = await conventionalResponse.json();

        // Fetch additional financing data
        const additionalResponse = await fetch('/api/additional-financing');
        if (!additionalResponse.ok) {
          throw new Error('Failed to fetch additional financing data');
        }
        const additionalData = await additionalResponse.json();

        if (conventionalData.success && conventionalData.conventionalFinancing) {
          const { asIs: savedAsIs, maxLoan: savedMaxLoan, userLoanAmt: savedUserLoanAmt } = conventionalData.conventionalFinancing;
          if (savedAsIs !== undefined) setAsIs(savedAsIs);
          if (savedMaxLoan !== undefined) setMaxLoanAmt(savedMaxLoan);
          if (savedUserLoanAmt !== undefined) setUserLoanAmt(savedUserLoanAmt);
        }

        if (additionalData.success && additionalData.additionalFinancing) {
          const {
            maxLTV: savedMaxLTV,
            isIO: savedIsIO,
            rate: savedRate,
            balloon: savedBalloon,
            lenderFee: savedLenderFee,
            reqDownPay: savedReqDownPay,
            loanAmt2: savedLoanAmt2,
            actualLTV: savedActualLTV,
            monthlyPayment: savedMonthlyPayment,
            annualPayment: savedAnnualPayment,
            selectedFee: savedSelectedFee,
          } = additionalData.additionalFinancing;

          if (savedMaxLTV !== undefined) setMaxLTV(savedMaxLTV * 100); // decimal to whole
          if (savedIsIO !== undefined) setIsIO(savedIsIO);
          if (savedRate !== undefined) setRate(savedRate * 100); // decimal to whole
          if (savedBalloon !== undefined) setBalloon(savedBalloon);
          if (savedLenderFee !== undefined) setlenderFee(savedLenderFee * 100); // decimal to whole
          if (savedReqDownPay !== undefined) setReqDownPay(savedReqDownPay);
          if (savedLoanAmt2 !== undefined) setLoanAmt2(savedLoanAmt2);
          if (savedActualLTV !== undefined) setActualLTV(savedActualLTV * 100); // decimal to whole
          if (savedMonthlyPayment !== undefined) setMonthlyPayment(savedMonthlyPayment);
          if (savedAnnualPayment !== undefined) setAnnualPayment(savedAnnualPayment);
          if (savedSelectedFee !== undefined) setSelectedFee(savedSelectedFee);
        }
      } catch (error) {
        console.error('Error fetching financing data:', error);
      }
    };
    fetchData();
  }, []);

  // Handle input changes
  const handleInputChange = (setter) => (e) => {
    setter(+e.target.value);
    setHasChanges(true);
  };

  // Save data to Firebase
  const handleSave = async () => {
    try {
      const response = await fetch('/api/additional-financing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          maxLTV,
          isIO,
          rate,
          balloon,
          lenderFee,
          asIs,
          maxLoanAmt,
          userLoanAmt,
          reqDownPay,
          loanAmt2,
          actualLTV,
          monthlyPayment,
          annualPayment,
          selectedFee
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      const data = await response.json();
      if (data.success) {
        setHasChanges(false);
        alert('Data saved successfully!');
      }
    } catch (error) {
      console.error('Error saving additional financing data:', error);
      alert('Failed to save data. Please try again.');
    }
  };

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
    const annualRate = rate / 100;
    const monthlyRate = annualRate / 12;
    const totalPeriods = balloon * 12;
    const payment = pmt(monthlyRate, totalPeriods, loanAmt);
    let paymentMonthly;
    paymentMonthly = Math.abs(payment).toFixed(0);
    const annualDebtService = Math.abs(payment * 12).toFixed(0);
    setReqDownPay(downPayment);
    setActualLTV(LTV);
    setLoanAmt2(loanAmt);
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
            
          <header>
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
                  onChange={handleInputChange(setMaxLTV)}
                />
              </div>
              <div>
                <Label>Amortization or IO</Label>
                <select
                  className="mt-1 block w-full rounded border-gray-300"
                  value={isIO ? 'IO' : 'AM'}
                  onChange={handleInputChange(setIsIO)}
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
                  onChange={handleInputChange(setRate)}
                />
              </div>
              <div>
                <Label>Balloon Payment Due (yrs)</Label>
                <Input
                  type="number"
                  value={balloon}
                  onChange={handleInputChange(setBalloon)}
                />
              </div>
              <div>
                <Label>Total Lender Fees (%)</Label>
                <Input
                  type="number"
                  value={lenderFee}
                  onChange={handleInputChange(setlenderFee)}
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
                <Label>Today's "As-Is" Value ($)</Label>
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

          {/* Save Changes Button */}
          {hasChanges && (
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                className="bg-[#00A3E0] hover:bg-[#0077AC] text-white px-4 py-2 rounded"
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
