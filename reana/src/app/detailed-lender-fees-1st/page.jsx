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
  CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DSCRBridgeRehabLenderFeesPage() {
  const router = useRouter();

  // ——— Inputs ———
  // Base amount (Total Acquisition + Rehab)
  const [baseAmt, setBaseAmt] = useState(150000);

  // Fees
  const [origPoints, setOrigPoints] = useState(1.5);       // %
  const [underwriting, setUnderwriting] = useState(595);   // $
  const [processing, setProcessing]     = useState(374);
  const [funding, setFunding]           = useState(80);
  const [docPrep, setDocPrep]           = useState(250);
  const [overnight, setOvernight]       = useState(25);
  const [appraisal, setAppraisal]       = useState(650);
  const [inspection, setInspection]     = useState(650);
  const [creditReport, setCreditReport] = useState(87);
  const [floodCert, setFloodCert]       = useState(10);
  const [titleUpdate, setTitleUpdate]   = useState(0);

  // ——— Derived ———
  const origFee = useMemo(
    () => (baseAmt * origPoints) / 100,
    [baseAmt, origPoints]
  );

  const totalLenderCosts = useMemo(() => {
    return (
      origFee +
      underwriting +
      processing +
      funding +
      docPrep +
      overnight +
      appraisal +
      inspection +
      creditReport +
      floodCert +
      titleUpdate
    );
  }, [
    origFee,
    underwriting,
    processing,
    funding,
    docPrep,
    overnight,
    appraisal,
    inspection,
    creditReport,
    floodCert,
    titleUpdate
  ]);

  // ——— Helpers ———
  const parseNum = (s) => parseFloat(s.replace(/[^\d.-]/g, '')) || 0;
  const fmt = (n, dec = 0) =>
    n.toLocaleString(undefined, {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec
    });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">
            Purch & Rehab Lender Fees — 1st Mtg
          </h1>

          <Card className="space-y-4">
            <CardHeader>
              <CardTitle>Fees Input</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* base amount */}
              <div className="relative">
                <Label>Origination Fee (WIP) ($)</Label>
                <Input
                  type="text"
                  className="pl-7"
                  value={`$${fmt(baseAmt)}`}
                  onChange={e => setBaseAmt(parseNum(e.target.value))}
                />
              </div>

              {/* origination points */}
              <div className="relative">
                <Label>Origination Fee (Points)</Label>
                <Input
                  type="text"
                  className="pr-7"
                  value={`${fmt(origPoints,2)}%`}
                  onChange={e => setOrigPoints(parseNum(e.target.value))}
                />
              </div>

              {/* underwriting */}
              <div className="relative">
                <Label>Underwriting Fee</Label>
                <Input
                  type="text"
                  className="pl-7"
                  value={`$${fmt(underwriting)}`}
                  onChange={e => setUnderwriting(parseNum(e.target.value))}
                />
              </div>

              {/* processing */}
              <div className="relative">
                <Label>Processing Fee</Label>
                <Input
                  type="text"
                  className="pl-7"
                  value={`$${fmt(processing)}`}
                  onChange={e => setProcessing(parseNum(e.target.value))}
                />
              </div>

              {/* funding */}
              <div className="relative">
                <Label>Lender Funding Fee</Label>
                <Input
                  type="text"
                  className="pl-7"
                  value={`$${fmt(funding)}`}
                  onChange={e => setFunding(parseNum(e.target.value))}
                />
              </div>

              {/* document prep */}
              <div className="relative">
                <Label>Document Prep Fee</Label>
                <Input
                  type="text"
                  className="pl-7"
                  value={`$${fmt(docPrep)}`}
                  onChange={e => setDocPrep(parseNum(e.target.value))}
                />
              </div>

              {/* overnight */}
              <div className="relative">
                <Label>Overnight Delivery Fee</Label>
                <Input
                  type="text"
                  className="pl-7"
                  value={`$${fmt(overnight)}`}
                  onChange={e => setOvernight(parseNum(e.target.value))}
                />
              </div>

              {/* appraisal */}
              <div className="relative">
                <Label>Appraisal</Label>
                <Input
                  type="text"
                  className="pl-7"
                  value={`$${fmt(appraisal)}`}
                  onChange={e => setAppraisal(parseNum(e.target.value))}
                />
              </div>

              {/* inspection */}
              <div className="relative">
                <Label>Property Inspection</Label>
                <Input
                  type="text"
                  className="pl-7"
                  value={`$${fmt(inspection)}`}
                  onChange={e => setInspection(parseNum(e.target.value))}
                />
              </div>

              {/* credit report */}
              <div className="relative">
                <Label>Credit Report</Label>
                <Input
                  type="text"
                  className="pl-7"
                  value={`$${fmt(creditReport)}`}
                  onChange={e => setCreditReport(parseNum(e.target.value))}
                />
              </div>

              {/* flood cert */}
              <div className="relative">
                <Label>Flood Cert</Label>
                <Input
                  type="text"
                  className="pl-7"
                  value={`$${fmt(floodCert)}`}
                  onChange={e => setFloodCert(parseNum(e.target.value))}
                />
              </div>

              {/* title update */}
              <div className="relative">
                <Label>Title Update Fee</Label>
                <Input
                  type="text"
                  className="pl-7"
                  value={`$${fmt(titleUpdate)}`}
                  onChange={e => setTitleUpdate(parseNum(e.target.value))}
                />
              </div>
            </CardContent>

            <CardContent className="space-y-2">
              <p>
                <strong>Total Lender Costs:</strong>{' '}
                ${fmt(totalLenderCosts,2)}
              </p>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <button
                className="w-full py-2 rounded bg-gray-100 hover:bg-gray-200"
                onClick={() => {
                  router.push('/detailed-settlement-fees');
                }}
              >
                Go To Detailed Settlement Fees
              </button>
              <button
                className="w-full py-2 rounded bg-gray-100 hover:bg-gray-200"
                onClick={() => {
                  router.push('/detailed-inspection-fees');
                }}
              >
                Go To Detailed Inspection Costs
              </button>
            </CardFooter>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}