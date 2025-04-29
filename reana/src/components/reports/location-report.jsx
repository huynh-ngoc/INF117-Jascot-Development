"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  HomeIcon,
  DollarSign,
  BarChart2,
  Percent,
  Users,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  MapPin,
} from "lucide-react";

const reports = [
  {
    id: 1,
    neighborhood: "Neiborhood A",
    city: "Los Angelas",
    state: "CA",
    why: [
      "Excellent rent-to-price ratios for 1–4 unit homes",
      "Younger, renter-heavy population (UAB proximity)",
      "Safer than surrounding areas",
      "Strong tenant demand for duplexes and triplexes",
    ],
    stats: {
      medianPrice: "$165,000",
      avgRent: "$975",
      capRate: "7.9%",
      cashOnCash: "9.3%",
      popGrowth: "+2.1%",
      crime: "Low",
      schoolScore: "6.5/10",
      walkability: "Moderate",
    },
    investorGrade: "A",
    popularStreets: ["40th St S", "6th Ave S", "43rd Pl"],
    cautionZones: [
      "North of Messer Airport Hwy (flood risk)",
      "Near industrial corridor (noise)",
    ],
    tenantMix: ["Medical residents", "Service workers", "Students"],
    localHighlights: [
      "Close to UAB Medical Center",
      "Avondale Park & restaurants",
      "Low property taxes",
    ],
  },
  {
    id: 2,
    neighborhood: "Neiborhood B",
    city: "New York",
    state: "NY",
    why: [
      "Excellent rent-to-price ratios for 1–4 unit homes",
      "Younger, renter-heavy population (UAB proximity)",
      "Safer than surrounding areas",
      "Strong tenant demand for duplexes and triplexes",
    ],
    stats: {
      medianPrice: "$165,000",
      avgRent: "$975",
      capRate: "7.9%",
      cashOnCash: "9.3%",
      popGrowth: "+2.1%",
      crime: "Low",
      schoolScore: "6.5/10",
      walkability: "Moderate",
    },
    investorGrade: "A-",
    popularStreets: ["40th St S", "6th Ave S", "43rd Pl"],
    cautionZones: [
      "North of Messer Airport Hwy (flood risk)",
      "Near industrial corridor (noise)",
    ],
    tenantMix: ["Medical residents", "Service workers", "Students"],
    localHighlights: [
      "Close to UAB Medical Center",
      "Avondale Park & restaurants",
      "Low property taxes",
    ],
  },
  {
    id: 3,
    neighborhood: "Neiborhood C",
    city: "Miami",
    state: "FL",
    why: [
      "Excellent rent-to-price ratios for 1–4 unit homes",
      "Younger, renter-heavy population (UAB proximity)",
      "Safer than surrounding areas",
      "Strong tenant demand for duplexes and triplexes",
    ],
    stats: {
      medianPrice: "$165,000",
      avgRent: "$975",
      capRate: "7.9%",
      cashOnCash: "9.3%",
      popGrowth: "+2.1%",
      crime: "Low",
      schoolScore: "6.5/10",
      walkability: "Moderate",
    },
    investorGrade: "B+",
    popularStreets: ["40th St S", "6th Ave S", "43rd Pl"],
    cautionZones: [
      "North of Messer Airport Hwy (flood risk)",
      "Near industrial corridor (noise)",
    ],
    tenantMix: ["Medical residents", "Service workers", "Students"],
    localHighlights: [
      "Close to UAB Medical Center",
      "Avondale Park & restaurants",
      "Low property taxes",
    ],
  },
];

export function LocationReport() {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reports.map((report) => (
          <div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: report.id * 0.1 }}
          >
            <Card className="flex flex-col h-full transition-transform shadow-lg hover:scale-103">
              <CardHeader className="flex flex-col items-center justify-center space-y-2 p-4">
                <MapPin className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-bold text-center">
                  {report.neighborhood}, {report.city}
                </h2>
                <h2 className="text-2xl font-bold text-center">
                  {report.state}
                </h2>
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                <section>
                  <h3 className="text-lg font-semibold mb-2">Why It Fits:</h3>
                  <ul className="space-y-1">
                    {report.why.map((w, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <div className="flex-none w-5 h-5">
                          <ShieldCheck className="w-5 h-5 text-green-500 mt-3" />
                        </div>
                        <div className="mt-2">
                          <span className="flex-1 text-sm leading-snug">
                            {w}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="grid content-normal gap-4">
                  <h3 className="text-lg font-semibold">Quick Stats</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <Stat
                      icon={<DollarSign />}
                      label="Median Price"
                      value1={report.stats.medianPrice}
                    />
                    <Stat
                      icon={<Percent />}
                      label="Cash-on-Cash"
                      value1={report.stats.cashOnCash}
                    />
                    <Stat
                      icon={<AlertTriangle />}
                      label="Crime Level"
                      value1={report.stats.crime}
                    />
                    <Stat
                      icon={<BarChart2 />}
                      label="Walkability"
                      value1={report.stats.walkability}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Stat
                      icon={<DollarSign />}
                      label="Avg Rent"
                      value2={report.stats.avgRent}
                    />
                    <Stat
                      icon={<Percent />}
                      label="Cap Rate"
                      value2={report.stats.capRate}
                    />
                    <Stat
                      icon={<TrendingUp />}
                      label2="3-yr Growth"
                      value2={report.stats.popGrowth}
                    />
                    <Stat
                      icon={<Users />}
                      label2="School Score"
                      value2={report.stats.schoolScore}
                    />
                  </div>
                </section>

                <section className="space-y-1">
                  <h3 className="text-lg font-semibold">Investor Grade</h3>
                  <Badge className="h-15 w-15 bg-slate-700 dark:bg-slate-400 text-2xl font-bold p-2">
                    {report.investorGrade}
                  </Badge>
                </section>

                <section className="text-sm space-y-1">
                  <h3 className="font-semibold">Popular Streets</h3>
                  <p>{report.popularStreets.join(", ")}</p>
                  <h3 className="font-semibold">Caution Zones</h3>
                  <p>{report.cautionZones.join(", ")}</p>
                  <h3 className="font-semibold">Tenant Mix</h3>
                  <p>{report.tenantMix.join(", ")}</p>
                </section>

                <section className="text-sm space-y-1">
                  <h3 className="font-semibold">Local Highlights</h3>
                  <ul className="list-disc list-inside">
                    {report.localHighlights.map((l, i) => (
                      <li key={i}>{l}</li>
                    ))}
                  </ul>
                </section>
              </CardContent>

              <CardFooter className="p-4">
                <Button className="dark:bg-zinc-300 w-full" size="lg">
                  Find Your Target Properties in this Area
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ icon, label, label2, value1, value2 }) {
  return (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-2 bg-white dark:bg-gray-700 rounded-full shadow">
        {React.cloneElement(icon, { className: "w-5 h-5 text-blue-500" })}
      </div>
      <div>
        <div className="text-2xl font-extrabold text-gray-900 dark:text-white">
          {value1}
        </div>
        <div className="text-xl font-extrabold text-gray-900 dark:text-white">
          {value2}
        </div>
        <div className="text-xs text-muted-foreground dark:text-gray-300">
          {label}
        </div>
        <div className="text-[10px] text-muted-foreground dark:text-gray-300">
          {label2}
        </div>
      </div>
    </div>
  );
}
