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
import { House, HomeIcon, DollarSign, TrendingUp } from "lucide-react";

const reports = [
  {
    id: 1,
    icon: House,
    address: "315 W Broadway Fulton",
    distance: "0",
    dateSold: "0",
    price: "N/A",
    age: 1900,
    units: 3,
    sqFootage: 2156,
    bedrooms: 5,
    bathrooms: 3,
    condition: "Average",
    pricePerSqFt: 0,
    pricePerUnit: 0,
  },
  {
    id: 2,
    icon: House,
    address: "315 Hannibal St Fulton",
    distance: "0.5",
    dateSold: "22-Oct-24",
    price: "$175,000",
    age: 1900,
    units: 3,
    sqFootage: 2150,
    bedrooms: 5,
    bathrooms: 2.5,
    condition: "Above Average",
    pricePerSqFt: "$81.40",
    pricePerUnit: "$58,333",
  },
  {
    id: 3,
    icon: House,
    address: "316 Hannibal St Fulton",
    distance: "0.5",
    dateSold: "10-Oct-24",
    price: "$80,000",
    age: 1900,
    units: 3,
    sqFootage: 2200,
    bedrooms: 5,
    bathrooms: 2,
    condition: "Below Average",
    pricePerSqFt: "$36.36",
    pricePerUnit: "$26,667",
  },
  {
    id: 4,
    icon: House,
    address: "2782 County Route 45 Fulton",
    distance: "1",
    dateSold: "28-Oct-24",
    price: "$75,100",
    age: 1900,
    units: 3,
    sqFootage: 2496,
    bedrooms: 5,
    bathrooms: 2,
    condition: "Below Average",
    pricePerSqFt: "$30.09",
    pricePerUnit: "$25,033",
  },
];

export function SoldComps() {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {reports.map((report) => (
          <div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: report.id * 0.1 }}
          >
            <Card className="flex flex-col h-full transition-transform shadow-lg hover:scale-103">
              <CardHeader className="flex flex-col items-center justify-center space-y-2 p-4">
                <House className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-center">
                  {report.address}
                </h2>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <section className="grid content-normal gap-4">
                  <h3 className="text-lg font-semibold">Property Details</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <Stat
                      icon={<HomeIcon />}
                      label="Distance in Miles"
                      value1={report.distance}
                    />
                    <Stat
                      icon={<DollarSign />}
                      label="Date Sold"
                      value1={report.dateSold}
                    />
                    <Stat
                      icon={<TrendingUp />}
                      label="Price"
                      value1={report.price}
                    />
                    <Stat
                      icon={<TrendingUp />}
                      label="Age"
                      value1={report.age}
                    />
                    <Stat
                      icon={<TrendingUp />}
                      label="Condition"
                      value1={report.condition}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Stat
                      icon={<TrendingUp />}
                      label="# of Units"
                      value1={report.units}
                    />
                    <Stat
                      icon={<TrendingUp />}
                      label="Sqft"
                      value1={report.sqFootage}
                    />
                    <Stat
                      icon={<HomeIcon />}
                      label="Beds"
                      value1={report.bedrooms}
                    />
                    <Stat
                      icon={<HomeIcon />}
                      label="Baths"
                      value1={report.bathrooms}
                    />
                  </div>
                  <Stat
                    icon={<DollarSign />}
                    label="Price/SqFt"
                    value1={report.pricePerSqFt}
                  />
                  <Stat
                    icon={<DollarSign />}
                    label="Price/Unit"
                    value1={report.pricePerUnit}
                  />
                </section>
              </CardContent>

              <CardFooter className="p-4">
                <Button className="dark:bg-zinc-300 w-full" size="lg">
                  View Property Details
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      <div>
        <Card>
          <CardContent className="flex-1 space-y-4">
            <h2 className="text-xl font-semibold text-center">
              <p>Your ARV Estimate: $175,000</p>
            </h2>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Stat({ icon, label, label2, value1, value2 }) {
  return (
    <div className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
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
