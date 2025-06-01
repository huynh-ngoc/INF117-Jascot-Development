'use client'
export const dynamic = "force-dynamic";
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
import { useRouter, useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();
  const propertyId = 'addr_052939197dfa6b29';
  const [hasChanges, setHasChanges] = useState(false);
  const [hasAdditionalFinancing, setHasAdditionalFinancing] = useState(false);

  // Loan terms (percent fields as whole numbers for UI)
  const [maxLTV, setMaxLTV] = useState(70); // e.g., 70 for 70%
  const [isIO, setIsIO] = useState(true);
  const [rate, setRate] = useState(7); // e.g., 7 for 7%
  const [balloon, setBalloon] = useState(5);

  // This Transaction
  const [asIs, setAsIs] = useState(115000);
  const [reqDownPay, setReqDownPay] = useState(0);
  const [optDownPay, setOptDownPay] = useState(11500);
  const [actualLTV, setActualLTV] = useState(70); // e.g., 70 for 70%
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

  // Load data from Firebase when component mounts
  useEffect(() => {
    const fetchData = async () => {
      if (!propertyId) {
        console.error('No propertyId provided');
        return;
      }

      try {
        // Fetch conventional financing data
        const conventionalResponse = await fetch(`/api/conventional-financing`);
        if (!conventionalResponse.ok) {
          throw new Error('Failed to fetch conventional financing data');
        }
        const conventionalData = await conventionalResponse.json();
        
        // Fetch additional financing data
        const additionalResponse = await fetch(`/api/additional-financing`);
        if (!additionalResponse.ok) {
          throw new Error('Failed to fetch additional financing data');
        }
        const additionalData = await additionalResponse.json();

        if (conventionalData.success && conventionalData.conventionalFinancing) {
          const {
            maxLTV: savedMaxLTV,
            isIO: savedIsIO,
            rate: savedRate,
            balloon: savedBalloon,
            asIs: savedAsIs,
            reqDownPay: savedReqDownPay,
            optDownPay: savedOptDownPay,
            actualLTV: savedActualLTV,
            maxLoan: savedMaxLoan,
            userLoanAmt: savedUserLoanAmt,
            monthlyPayment: savedMonthlyPayment,
            annualPayment: savedAnnualPayment,
          } = conventionalData.conventionalFinancing;

          if (savedMaxLTV !== undefined) setMaxLTV(savedMaxLTV * 100); // decimal to whole
          if (savedIsIO !== undefined) setIsIO(savedIsIO);
          if (savedRate !== undefined) setRate(savedRate * 100); // decimal to whole
          if (savedBalloon !== undefined) setBalloon(savedBalloon);
          if (savedAsIs !== undefined) setAsIs(savedAsIs);
          if (savedReqDownPay !== undefined) setReqDownPay(savedReqDownPay);
          if (savedOptDownPay !== undefined) setOptDownPay(savedOptDownPay);
          if (savedActualLTV !== undefined) setActualLTV(savedActualLTV * 100); // decimal to whole
          if (savedMaxLoan !== undefined) setMaxLoan(savedMaxLoan);
          if (savedUserLoanAmt !== undefined) setUserLoanAmt(savedUserLoanAmt);
          if (savedMonthlyPayment !== undefined) setMonthlyPayment(savedMonthlyPayment);
          if (savedAnnualPayment !== undefined) setAnnualPayment(savedAnnualPayment);
        }

        // Set additional financing status
        setHasAdditionalFinancing(additionalData.success && Object.keys(additionalData.additionalFinancing || {}).length > 0);
      } catch (error) {
        console.error('Error fetching financing data:', error);
      }
    };
    fetchData();
  }, [propertyId]);

  // Handle input changes
  const handleInputChange = (setter) => (e) => {
    setter(+e.target.value);
    setHasChanges(true);
  };

  // Save data to Firebase
  const handleSave = async () => {
    if (!propertyId) {
      console.error('No propertyId provided');
      return;
    }

    try {
      const response = await fetch(`/api/conventional-financing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          maxLTV,
          isIO,
          rate,
          balloon,
          asIs,
          reqDownPay,
          optDownPay,
          actualLTV,
          maxLoan,
          userLoanAmt,
          monthlyPayment,
          annualPayment
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
      console.error('Error saving conventional financing data:', error);
      alert('Failed to save data. Please try again.');
    }
  };

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
            
          <header>
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
                  onChange={handleInputChange(setMaxLTV)}
                />
              </div>
              <div>
                <Label>Amortization or IO</Label>
                <select
                  className="mt-1 block w-full rounded border-gray-300"
                  value={isIO ? 'IO' : 'AM'}
                  onChange={(e) => {
                    setIsIO(e.target.value === 'IO');
                    setHasChanges(true);
                  }}
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
            </CardContent>
          </Card>

          {/* ---- This Transaction ---- */}
          <Card className="space-y-4">
            <CardHeader>
              <CardTitle>This Transaction</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <Label>Today's "As-Is" Value</Label>
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
                  onChange={handleInputChange(setOptDownPay)}
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
                  onChange={handleInputChange(setUserLoanAmt)}
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
                {hasAdditionalFinancing ? 'Edit Additional Financing' : 'Add Another Loan (Secondary Financing)'}
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
                  onClick={() => {
                    setSelectedFee(key);
                    setHasChanges(true);
                  }}
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
