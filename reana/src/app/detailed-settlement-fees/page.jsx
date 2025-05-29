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

  const parseNum = str => parseFloat(str.replace(/[^\d.-]/g, '')) || 0;
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
          <h1 className="text-2xl font-bold">Purch &amp; Rehab Settlement Costs</h1>

          <Card className="space-y-4">
            <CardHeader>
              <CardTitle>Settlement Costs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label>Settlement Agent + Process Fee</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(settlementAgentFee)}`}
                    onChange={e => setSettlementAgentFee(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Lender Title/Endorsements/ICPL/Enforcement</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(lenderTitleFees)}`}
                    onChange={e => setLenderTitleFees(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Notary</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(notaryFee)}`}
                    onChange={e => setNotaryFee(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Recording</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(recordingFee)}`}
                    onChange={e => setRecordingFee(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Transfer Tax</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(transferTax)}`}
                    onChange={e => setTransferTax(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Tax Proration</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(taxProration)}`}
                    onChange={e => setTaxProration(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>HOA Dues Proration</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(hoaDuesProration)}`}
                    onChange={e => setHoaDuesProration(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>HOA Transfer Fee</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(hoaTransferFee)}`}
                    onChange={e => setHoaTransferFee(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Property Tax Reserves</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(propertyTaxReserves)}`}
                    onChange={e => setPropertyTaxReserves(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>New Ins Policy (1 year)</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(newInsurancePolicy)}`}
                    onChange={e => setNewInsurancePolicy(parseNum(e.target.value))}
                  />
                </div>

                <div>
                  <Label>1st Mtg Prepaid Interest (Days)</Label>
                  <Input
                    type="text"
                    className="pl-2 pr-10"
                    value={`${firstPreDays}`}
                    onChange={e => setFirstPreDays(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>1st Mtg Prepaid Interest ($)</Label>
                  <p className="px-3 py-2 border rounded">${fmt(firstPreDays * 15)}</p>
                </div>

                <div>
                  <Label>2nd Mtg Prepaid Interest (Days)</Label>
                  <Input
                    type="text"
                    className="pl-2 pr-10"
                    value={`${secondPreDays}`}
                    onChange={e => setSecondPreDays(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>2nd Mtg Prepaid Interest ($)</Label>
                  <p className="px-3 py-2 border rounded">${fmt(secondPreDays * 7)}</p>
                </div>

                <div>
                  <Label>Total Settlement Costs</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={totalSettlementCosts}
                    onChange={e => setTotalSettlementCosts(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Total Lender and Settlement Costs</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={totalLenderAndSettlement}
                    onChange={e => setTotalLenderAndSettlement(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Costs Paid by Seller (Check with your lender on what's allowed)</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(costsPaidBySeller)}`}
                    onChange={e => setCostsPaidBySeller(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Net Lender and Settlement Costs</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={netLenderAndSettlement}
                    onChange={e => setNetLenderAndSettlement(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Tenant Rent Prorations</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(tenantRentProrations)}`}
                    onChange={e => setTenantRentProrations(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Transfer of Tenant Security Deposits</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(tenantSecurityDeposits)}`}
                    onChange={e => setTenantSecurityDeposits(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Down Payment</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(downPayment)}`}
                    onChange={e => setDownPayment(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Total Cash to Close</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={totalCashToClose}
                    onChange={e => setTotalCashToClose(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <Link href="/detailed-lender-fees-1st">
                <button className="w-full py-2 px-4 bg-gray-100 rounded-md hover:bg-gray-200">
                  Go to Detailed Lender Fees
                </button>
              </Link>
              <Link href="/detailed-inspection-fees">
                <button className="w-full py-2 px-4 bg-gray-100 rounded-md hover:bg-gray-200">
                  Go to Detailed Inspection Costs
                </button>
              </Link>
            </CardFooter>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
