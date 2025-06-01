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
import { Button } from '@/components/ui/button';

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

  const parseNum = (str) => parseFloat(str.replace(/[^\d.-]/g, '')) || 0;
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
          <h1 className="text-2xl font-bold text-black">
            Detailed Lender Fees (2nd Mtg)
          </h1>

          <Card className="space-y-4 bg-white border border-[#4F5D75] shadow-md rounded-lg">
            <CardHeader>
              <CardTitle className="text-black">Fees</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label className="text-black">Origination Fee (Points)</Label>
                  <Input
                    type="text"
                    className="pl-2 pr-7 border border-[#4F5D75] text-black font-lato rounded"
                    value={`${fmt(origPoints, 2)}%`}
                    onChange={(e) => setOrigPoints(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label className="text-black">Origination Fee ($)</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(origFee)}`}
                    onChange={(e) => setOrigFee(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label className="text-black">Underwriting Fee ($)</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(underwriting)}`}
                    onChange={(e) => setUnderwriting(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label className="text-black">Processing Fee ($)</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(processing)}`}
                    onChange={(e) => setProcessing(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label className="text-black">Lender Funding Fee ($)</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(lenderFunding)}`}
                    onChange={(e) => setLenderFunding(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label className="text-black">Document Prep Fee ($)</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(docPrep)}`}
                    onChange={(e) => setDocPrep(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label className="text-black">Overnight Delivery Fee ($)</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(overnight)}`}
                    onChange={(e) => setOvernight(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label className="text-black">Credit Report ($)</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(creditReport)}`}
                    onChange={(e) => setCreditReport(parseNum(e.target.value))}
                  />
                </div>
              </div>

              <div className="mt-4 text-center font-semibold text-black">
                Total Lender Costs: ${fmt(total)}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-3">
              <Button asChild variant="secondary">
                <button onClick={() => router.push('/detailed-settlement-fees')}>
                  <span className="text-white">Go to Detailed Settlement Fees</span>
                </button>
              </Button>
              <Button asChild variant="secondary">
                <button onClick={() => router.push('/detailed-inspection-fees')}>
                  <span className="text-white">Go to Detailed Inspection Costs</span>
                </button>
              </Button>
            </CardFooter>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
