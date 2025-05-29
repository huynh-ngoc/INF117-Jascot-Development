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

export default function DetailedLenderFees2ndPage() {
  const router = useRouter();

  const [origPoints, setOrigPoints] = useState(1.5);
  const [origFee, setOrigFee] = useState(345);
  const [underwriting, setUnderwriting] = useState(595);
  const [processing, setProcessing] = useState(374);
  const [lenderFunding, setLenderFunding] = useState(80);
  const [docPrep, setDocPrep] = useState(250);
  const [overnight, setOvernight] = useState(25);
  const [creditReport, setCreditReport] = useState(87);

  const parseNum = str => parseFloat(str.replace(/[^\d.-]/g, '')) || 0;
  const fmt = (n, dec = 0) =>
    n.toLocaleString(undefined, {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    });

  const total = useMemo(
    () =>
      origFee +
      underwriting +
      processing +
      lenderFunding +
      docPrep +
      overnight +
      creditReport,
    [origFee, underwriting, processing, lenderFunding, docPrep, overnight, creditReport]
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">Detailed Lender Fees (2nd Mtg)</h1>

          <Card className="space-y-4">
            <CardHeader>
              <CardTitle>Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label>Origination Fee (Points)</Label>
                  <Input
                    type="text"
                    className="pl-2 pr-7"
                    value={`${fmt(origPoints, 2)}%`}
                    onChange={e => setOrigPoints(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Origination Fee</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(origFee)}`}
                    onChange={e => setOrigFee(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Underwriting Fee</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(underwriting)}`}
                    onChange={e => setUnderwriting(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Processing Fee</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(processing)}`}
                    onChange={e => setProcessing(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Lender Funding Fee</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(lenderFunding)}`}
                    onChange={e => setLenderFunding(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Document Prep Fee</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(docPrep)}`}
                    onChange={e => setDocPrep(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Overnight Delivery Fee</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(overnight)}`}
                    onChange={e => setOvernight(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Credit Report</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(creditReport)}`}
                    onChange={e => setCreditReport(parseNum(e.target.value))}
                  />
                </div>
              </div>

              <div className="mt-4 text-center font-semibold">
                Total Lender Costs: ${fmt(total)}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-3">
              <button
                type="button"
                className="w-full py-2 px-4 bg-gray-100 rounded-md hover:bg-gray-200"
                onClick={() => {
                  router.push('/detailed-settlement-fees');
                }}
              >
                Go to Detailed Settlement Fees
              </button>
              <button
                type="button"
                className="w-full py-2 px-4 bg-gray-100 rounded-md hover:bg-gray-200"
                onClick={() => {
                  router.push('/detailed-inspection-fees');
                }}
              >
                Go to Detailed Inspection Costs
              </button>
            </CardFooter>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}