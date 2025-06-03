// src/app/detailed-settlement-fees/page.jsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
import { Button } from '@/components/ui/button';

export default function DetailedSettlementFeesPage() {
  const [settlementAgentFee, setSettlementAgentFee] = useState(625);
  const [lenderTitleFees, setLenderTitleFees] = useState(1405);
  const [notaryFee, setNotaryFee] = useState(100);
  const [recordingFee, setRecordingFee] = useState(100);

  const [transferTax, setTransferTax] = useState(0);
  const [taxProration, setTaxProration] = useState(0);
  const [hoaDuesProration, setHoaDuesProration] = useState(0);
  const [hoaTransferFee, setHoaTransferFee] = useState(0);
  const [propertyTaxReserves, setPropertyTaxReserves] = useState(0);
  const [newInsurancePolicy, setNewInsurancePolicy] = useState(0);

  const [firstPreDays, setFirstPreDays] = useState(15);
  const [secondPreDays, setSecondPreDays] = useState(15);

  const [totalSettlementCosts, setTotalSettlementCosts] = useState('');
  const [totalLenderAndSettlement, setTotalLenderAndSettlement] = useState('');
  const [costsPaidBySeller, setCostsPaidBySeller] = useState(0);
  const [netLenderAndSettlement, setNetLenderAndSettlement] = useState('');

  const [tenantRentProrations, setTenantRentProrations] = useState(0);
  const [tenantSecurityDeposits, setTenantSecurityDeposits] = useState(2700);
  const [downPayment, setDownPayment] = useState(11500);
  const [totalCashToClose, setTotalCashToClose] = useState('');

  const parseNum = (str) => parseFloat(str.replace(/[^\d.-]/g, '')) || 0;
  const fmt = (n, dec = 0) =>
    n.toLocaleString(undefined, {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-black">
            Purch &amp; Rehab Settlement Costs
          </h1>

          <Card className="space-y-4 bg-white border border-[#4F5D75] shadow-md rounded-lg">

            {/* Basic Fees Section */}
            <CardHeader>
              <CardTitle className="text-black">Settlement Costs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label className="text-black">
                    Settlement Agent + Process Fee
                  </Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(settlementAgentFee)}`}
                    onChange={(e) =>
                      setSettlementAgentFee(parseNum(e.target.value))
                    }
                  />
                </div>
                <div>
                  <Label className="text-black">
                    Lender Title/Endorsements/ICPL/Enforcement
                  </Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(lenderTitleFees)}`}
                    onChange={(e) =>
                      setLenderTitleFees(parseNum(e.target.value))
                    }
                  />
                </div>
                <div>
                  <Label className="text-black">Notary</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(notaryFee)}`}
                    onChange={(e) => setNotaryFee(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label className="text-black">Recording</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(recordingFee)}`}
                    onChange={(e) => setRecordingFee(parseNum(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>

            {/* Prorations & Taxes Section */}
            <div className="col-span-full bg-[#E5E5E5] px-2 py-1 border-b border-[#4F5D75] font-montserrat font-semibold text-black">
              Prorations &amp; Taxes
            </div>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label className="text-black">Transfer Tax</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(transferTax)}`}
                    onChange={(e) => setTransferTax(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label className="text-black">Tax Proration</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(taxProration)}`}
                    onChange={(e) => setTaxProration(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label className="text-black">HOA Dues Proration</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(hoaDuesProration)}`}
                    onChange={(e) =>
                      setHoaDuesProration(parseNum(e.target.value))
                    }
                  />
                </div>
                <div>
                  <Label className="text-black">HOA Transfer Fee</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(hoaTransferFee)}`}
                    onChange={(e) => setHoaTransferFee(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label className="text-black">Property Tax Reserves</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(propertyTaxReserves)}`}
                    onChange={(e) =>
                      setPropertyTaxReserves(parseNum(e.target.value))
                    }
                  />
                </div>
                <div>
                  <Label className="text-black">New Ins Policy (1 year)</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(newInsurancePolicy)}`}
                    onChange={(e) =>
                      setNewInsurancePolicy(parseNum(e.target.value))
                    }
                  />
                </div>
              </div>
            </CardContent>

            {/* Prepaids Section */}
            <div className="col-span-full bg-[#E5E5E5] px-2 py-1 border-b border-[#4F5D75] font-montserrat font-semibold text-black">
              Prepaid Interest
            </div>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1st Mtg Prepaid Interest (Days) */}
                <div>
                  <Label className="text-black">
                    1st Mtg Prepaid Interest (Days)
                  </Label>
                  <Input
                    type="text"
                    className="pl-2 pr-10 border border-[#4F5D75] text-black font-lato rounded"
                    value={`${firstPreDays}`}
                    onChange={(e) => setFirstPreDays(parseNum(e.target.value))}
                  />
                </div>
                {/* 1st Mtg Prepaid Interest ($) */}
                <div>
                  <p className="text-black font-semibold">
                    1st Mtg Prepaid Interest ($): ${fmt(firstPreDays * 15)}
                  </p>
                </div>
                {/* 2nd Mtg Prepaid Interest (Days) */}
                <div>
                  <Label className="text-black">
                    2nd Mtg Prepaid Interest (Days)
                  </Label>
                  <Input
                    type="text"
                    className="pl-2 pr-10 border border-[#4F5D75] text-black font-lato rounded"
                    value={`${secondPreDays}`}
                    onChange={(e) => setSecondPreDays(parseNum(e.target.value))}
                  />
                </div>
                {/* 2nd Mtg Prepaid Interest ($) */}
                <div>
                  <p className="text-black font-semibold">
                    2nd Mtg Prepaid Interest ($): ${fmt(secondPreDays * 7)}
                  </p>
                </div>
              </div>
            </CardContent>

            {/* Totals & Adjustments Section */}
            <div className="col-span-full bg-[#E5E5E5] px-2 py-1 border-b border-[#4F5D75] font-montserrat font-semibold text-black">
              Totals &amp; Adjustments
            </div>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label className="text-black">Total Settlement Costs</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${totalSettlementCosts}`}
                    onChange={(e) =>
                      setTotalSettlementCosts(e.target.value.replace(/^\$/, ''))
                    }
                  />
                </div>
                <div>
                  <Label className="text-black">
                    Total Lender &amp; Settlement Costs
                  </Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${totalLenderAndSettlement}`}
                    onChange={(e) =>
                      setTotalLenderAndSettlement(e.target.value.replace(/^\$/, ''))
                    }
                  />
                </div>
                <div>
                  <Label className="text-black">
                    Costs Paid by Seller (Check with your lender on what's allowed)
                  </Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(costsPaidBySeller)}`}
                    onChange={(e) =>
                      setCostsPaidBySeller(parseNum(e.target.value))
                    }
                  />
                </div>
                <div>
                  <Label className="text-black">
                    Net Lender &amp; Settlement Costs
                  </Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${netLenderAndSettlement}`}
                    onChange={(e) =>
                      setNetLenderAndSettlement(e.target.value.replace(/^\$/, ''))
                    }
                  />
                </div>
                <div>
                  <Label className="text-black">Tenant Rent Prorations</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(tenantRentProrations)}`}
                    onChange={(e) =>
                      setTenantRentProrations(parseNum(e.target.value))
                    }
                  />
                </div>
                <div>
                  <Label className="text-black">
                    Transfer of Tenant Security Deposits
                  </Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(tenantSecurityDeposits)}`}
                    onChange={(e) =>
                      setTenantSecurityDeposits(parseNum(e.target.value))
                    }
                  />
                </div>
                <div>
                  <Label className="text-black">Down Payment</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(downPayment)}`}
                    onChange={(e) => setDownPayment(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label className="text-black">Total Cash to Close</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${totalCashToClose}`}
                    onChange={(e) =>
                      setTotalCashToClose(e.target.value.replace(/^\$/, ''))
                    }
                  />
                </div>
              </div>
            </CardContent>

            {/* Footer Buttons */}
            <CardFooter className="flex flex-col space-y-3">
              <Button asChild variant="secondary">
                <Link href="/detailed-lender-fees-1st">
                  <span className="text-white">Go to Detailed Lender Fees</span>
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/detailed-inspection-fees">
                  <span className="text-white">Go to Detailed Inspection Costs</span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
