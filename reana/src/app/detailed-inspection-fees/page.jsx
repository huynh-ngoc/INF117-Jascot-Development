// src/app/detailed-inspection-fees/page.jsx
'use client';

import React, { useState, useMemo } from 'react';
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

export default function DetailedInspectionFeesPage() {
  const [appraisal, setAppraisal] = useState(650);
  const [generalInspection, setGeneralInspection] = useState(650);

  const [structuralEngineer, setStructuralEngineer] = useState(0);
  const [foundationSpecialist, setFoundationSpecialist] = useState(0);
  const [pestTermite, setPestTermite] = useState(0);
  const [zoningCode, setZoningCode] = useState(0);

  const [plumbing, setPlumbing] = useState(0);
  const [electrical, setElectrical] = useState(0);
  const [hvac, setHvac] = useState(0);
  const [roof, setRoof] = useState(0);
  const [sewerSeptic, setSewerSeptic] = useState(0);

  const [environmental, setEnvironmental] = useState(0);
  const [moldInspector, setMoldInspector] = useState(0);
  const [asbestosInspector, setAsbestosInspector] = useState(0);
  const [leadBasedPaint, setLeadBasedPaint] = useState(0);
  const [fireSafety, setFireSafety] = useState(0);
  const [radonInspector, setRadonInspector] = useState(0);
  const [wellWater, setWellWater] = useState(0);
  const [other1, setOther1] = useState(0);
  const [other2, setOther2] = useState(0);

  const parseNum = str => parseFloat(str.replace(/[^\d.-]/g, '')) || 0;
  const fmt = (n, dec = 0) =>
    n.toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec });

  const totalInspection = useMemo(() => {
    return (
      appraisal +
      generalInspection +
      structuralEngineer +
      foundationSpecialist +
      pestTermite +
      zoningCode +
      plumbing +
      electrical +
      hvac +
      roof +
      sewerSeptic +
      environmental +
      moldInspector +
      asbestosInspector +
      leadBasedPaint +
      fireSafety +
      radonInspector +
      wellWater +
      other1 +
      other2
    );
  }, [
    appraisal,
    generalInspection,
    structuralEngineer,
    foundationSpecialist,
    pestTermite,
    zoningCode,
    plumbing,
    electrical,
    hvac,
    roof,
    sewerSeptic,
    environmental,
    moldInspector,
    asbestosInspector,
    leadBasedPaint,
    fireSafety,
    radonInspector,
    wellWater,
    other1,
    other2,
  ]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">Detailed Inspection Fees</h1>

          <Card className="space-y-4">
            <CardHeader>
              <CardTitle>Inspection Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label>Appraisal</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(appraisal)}`}
                    onChange={e => setAppraisal(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>General Property Inspection</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(generalInspection)}`}
                    onChange={e => setGeneralInspection(parseNum(e.target.value))}
                  />
                </div>

                <div className="col-span-full bg-gray-100 px-2 py-1 font-semibold">
                  Structural
                </div>
                <div>
                  <Label>Structural Engineer</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(structuralEngineer)}`}
                    onChange={e => setStructuralEngineer(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Foundation Specialist</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(foundationSpecialist)}`}
                    onChange={e => setFoundationSpecialist(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Pest and Termite</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(pestTermite)}`}
                    onChange={e => setPestTermite(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Zoning &amp; Code Compliance</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(zoningCode)}`}
                    onChange={e => setZoningCode(parseNum(e.target.value))}
                  />
                </div>

                <div className="col-span-full bg-gray-100 px-2 py-1 font-semibold">
                  Systems
                </div>
                <div>
                  <Label>Plumbing</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(plumbing)}`}
                    onChange={e => setPlumbing(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Electrical</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(electrical)}`}
                    onChange={e => setElectrical(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>HVAC</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(hvac)}`}
                    onChange={e => setHvac(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Roof</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(roof)}`}
                    onChange={e => setRoof(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Sewer &amp; Septic</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(sewerSeptic)}`}
                    onChange={e => setSewerSeptic(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Environmental</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(environmental)}`}
                    onChange={e => setEnvironmental(parseNum(e.target.value))}
                  />
                </div>

                <div className="col-span-full bg-gray-100 px-2 py-1 font-semibold">
                  Safety
                </div>
                <div>
                  <Label>Mold Inspector</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(moldInspector)}`}
                    onChange={e => setMoldInspector(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Asbestos Inspector</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(asbestosInspector)}`}
                    onChange={e => setAsbestosInspector(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Lead-Based Paint</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(leadBasedPaint)}`}
                    onChange={e => setLeadBasedPaint(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Fire &amp; Safety</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(fireSafety)}`}
                    onChange={e => setFireSafety(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Radon Inspector</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(radonInspector)}`}
                    onChange={e => setRadonInspector(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Well Water</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(wellWater)}`}
                    onChange={e => setWellWater(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Other</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(other1)}`}
                    onChange={e => setOther1(parseNum(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Other</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2"
                    value={`$${fmt(other2)}`}
                    onChange={e => setOther2(parseNum(e.target.value))}
                  />
                </div>

                <div className="col-span-full mt-4 text-center font-semibold">
                  Total Lender Costs: ${fmt(totalInspection)}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <Link href="/detailed-lender-fees-2nd">
                <button className="w-full py-2 px-4 bg-gray-100 rounded-md hover:bg-gray-200">
                  Go to Detailed Lender Fees
                </button>
              </Link>
              <Link href="/detailed-settlement-fees">
                <button className="w-full py-2 px-4 bg-gray-100 rounded-md hover:bg-gray-200">
                  Go to detailed Settlement Costs
                </button>
              </Link>
            </CardFooter>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
