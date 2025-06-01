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
import { Button } from '@/components/ui/button';

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

  const parseNum = (str) => parseFloat(str.replace(/[^\d.-]/g, '')) || 0;
  const fmt = (n, dec = 0) =>
    n.toLocaleString(undefined, {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    });

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
          {/* 1. Main Heading: Montserrat, black text */}
          <h1 className="text-4xl font-montserrat font-bold text-black">
            Detailed Inspection Fees
          </h1>

          {/* 2. Card: White background, Steel Gray border */}
          <Card className="space-y-4 bg-white border border-[#4F5D75] shadow-md rounded-lg">
            <CardHeader>
              <CardTitle className="font-montserrat text-black">
                Inspection Fees
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Appraisal */}
                <div>
                  <Label className="font-lato text-black">Appraisal</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(appraisal)}`}
                    onChange={(e) => setAppraisal(parseNum(e.target.value))}
                  />
                </div>

                {/* General Property Inspection */}
                <div>
                  <Label className="font-lato text-black">
                    General Property Inspection
                  </Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(generalInspection)}`}
                    onChange={(e) =>
                      setGeneralInspection(parseNum(e.target.value))
                    }
                  />
                </div>

                {/* Section Header: Structural (light gray bg, black text, Steel Gray bottom border) */}
                <div className="col-span-full bg-[#E5E5E5] px-2 py-1 border-b border-[#4F5D75] font-montserrat font-semibold text-black">
                  Structural
                </div>

                {/* Structural Engineer */}
                <div>
                  <Label className="font-lato text-black">
                    Structural Engineer
                  </Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(structuralEngineer)}`}
                    onChange={(e) =>
                      setStructuralEngineer(parseNum(e.target.value))
                    }
                  />
                </div>

                {/* Foundation Specialist */}
                <div>
                  <Label className="font-lato text-black">
                    Foundation Specialist
                  </Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(foundationSpecialist)}`}
                    onChange={(e) =>
                      setFoundationSpecialist(parseNum(e.target.value))
                    }
                  />
                </div>

                {/* Pest and Termite */}
                <div>
                  <Label className="font-lato text-black">
                    Pest and Termite
                  </Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(pestTermite)}`}
                    onChange={(e) => setPestTermite(parseNum(e.target.value))}
                  />
                </div>

                {/* Zoning & Code Compliance */}
                <div>
                  <Label className="font-lato text-black">
                    Zoning &amp; Code Compliance
                  </Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(zoningCode)}`}
                    onChange={(e) => setZoningCode(parseNum(e.target.value))}
                  />
                </div>

                {/* Section Header: Systems (light gray bg, black text, Steel Gray bottom border) */}
                <div className="col-span-full bg-[#E5E5E5] px-2 py-1 border-b border-[#4F5D75] font-montserrat font-semibold text-black">
                  Systems
                </div>

                {/* Plumbing */}
                <div>
                  <Label className="font-lato text-black">Plumbing</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(plumbing)}`}
                    onChange={(e) => setPlumbing(parseNum(e.target.value))}
                  />
                </div>

                {/* Electrical */}
                <div>
                  <Label className="font-lato text-black">Electrical</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(electrical)}`}
                    onChange={(e) => setElectrical(parseNum(e.target.value))}
                  />
                </div>

                {/* HVAC */}
                <div>
                  <Label className="font-lato text-black">HVAC</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(hvac)}`}
                    onChange={(e) => setHvac(parseNum(e.target.value))}
                  />
                </div>

                {/* Roof */}
                <div>
                  <Label className="font-lato text-black">Roof</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(roof)}`}
                    onChange={(e) => setRoof(parseNum(e.target.value))}
                  />
                </div>

                {/* Sewer & Septic */}
                <div>
                  <Label className="font-lato text-black">
                    Sewer &amp; Septic
                  </Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(sewerSeptic)}`}
                    onChange={(e) => setSewerSeptic(parseNum(e.target.value))}
                  />
                </div>

                {/* Environmental */}
                <div>
                  <Label className="font-lato text-black">Environmental</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(environmental)}`}
                    onChange={(e) => setEnvironmental(parseNum(e.target.value))}
                  />
                </div>

                {/* Section Header: Safety (light gray bg, black text, Steel Gray bottom border) */}
                <div className="col-span-full bg-[#E5E5E5] px-2 py-1 border-b border-[#4F5D75] font-montserrat font-semibold text-black">
                  Safety
                </div>

                {/* Mold Inspector */}
                <div>
                  <Label className="font-lato text-black">Mold Inspector</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(moldInspector)}`}
                    onChange={(e) => setMoldInspector(parseNum(e.target.value))}
                  />
                </div>

                {/* Asbestos Inspector */}
                <div>
                  <Label className="font-lato text-black">
                    Asbestos Inspector
                  </Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(asbestosInspector)}`}
                    onChange={(e) => setAsbestosInspector(parseNum(e.target.value))}
                  />
                </div>

                {/* Lead-Based Paint */}
                <div>
                  <Label className="font-lato text-black">
                    Lead-Based Paint
                  </Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(leadBasedPaint)}`}
                    onChange={(e) => setLeadBasedPaint(parseNum(e.target.value))}
                  />
                </div>

                {/* Fire & Safety */}
                <div>
                  <Label className="font-lato text-black">Fire &amp; Safety</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(fireSafety)}`}
                    onChange={(e) => setFireSafety(parseNum(e.target.value))}
                  />
                </div>

                {/* Radon Inspector */}
                <div>
                  <Label className="font-lato text-black">Radon Inspector</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(radonInspector)}`}
                    onChange={(e) => setRadonInspector(parseNum(e.target.value))}
                  />
                </div>

                {/* Well Water */}
                <div>
                  <Label className="font-lato text-black">Well Water</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(wellWater)}`}
                    onChange={(e) => setWellWater(parseNum(e.target.value))}
                  />
                </div>

                {/* Other 1 */}
                <div>
                  <Label className="font-lato text-black">Other</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(other1)}`}
                    onChange={(e) => setOther1(parseNum(e.target.value))}
                  />
                </div>

                {/* Other 2 */}
                <div>
                  <Label className="font-lato text-black">Other</Label>
                  <Input
                    type="text"
                    className="pl-7 pr-2 border border-[#4F5D75] text-black font-lato rounded"
                    value={`$${fmt(other2)}`}
                    onChange={(e) => setOther2(parseNum(e.target.value))}
                  />
                </div>

                {/* Total line: Montserrat bold, black text */}
                <div className="col-span-full mt-4 text-center font-montserrat text-xl font-bold text-black">
                  Total Lender Costs: ${fmt(totalInspection)}
                </div>
              </div>
            </CardContent>

            {/* Footer buttons use shared Button component with asChild */}
            <CardFooter className="flex flex-col space-y-3">
              <Button asChild variant="secondary">
                <Link href="/detailed-lender-fees-2nd">
                  <span className="text-white">Go to Detailed Lender Fees</span>
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/detailed-settlement-fees">
                  <span className="text-white">Go to Detailed Settlement Costs</span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
