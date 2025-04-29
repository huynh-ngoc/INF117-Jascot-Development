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
    type: "Duplex",
    street: "1234 15th Ave S",
    city: "Birmingham",
    state: "AL",
    zip: "35205",
    stats: {
      price: "$179,000",
      estRent: "$2,000/month ($1,000 per unit)",
      units: "2BR/1BA",
      condition: "Light rehab (paint, flooring)",
      estCashFlow: "$420/m",
      estCoCReturn: "9.1%",
      notes:
        "Notes: Walking distance to UAB hospital, high rental demand, strong tenant pool.",
    },
  },
  {
    id: 2,
    type: "Triplex",
    street: "226 Highland View",
    city: "Birmingham",
    state: "AL",
    zip: "35222",
    stats: {
      price: "$219,000",
      estRent: "$2,700/month ($900 per unit)",
      units: "1BR/1BA each",
      condition: "Fully occupied, minor deferred maintenance",
      estCashFlow: "$510/m",
      estCoCReturn: "8.2%",
      notes: "Trendy neighborhood, stable tenants, near retail and cafes.",
    },
  },
  {
    id: 3,
    type: "Duplex",
    street: "847 40th St N",
    city: "Birmingham",
    state: "AL",
    zip: "35212",
    stats: {
      price: "$145,000",
      estRent: "$1,600/month ($800 per unit)",
      units: "2BR/1BA each",
      condition: "Recently renovated",
      estCashFlow: "$480/m",
      estCoCReturn: "11.5%",
      notes:
        "Eligible for Section 8, in improving neighborhood, utilities already split.",
    },
  },
];

export function PropertyReport() {
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
                  {report.type} - {report.street}
                </h2>
                <h2 className="text-xl font-semibold text-center">
                  {report.city}, {report.state} {report.zip}
                </h2>
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                <section className="grid content-normal gap-4">
                  <h3 className="text-lg font-semibold">Property Details</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <Stat
                      icon={<DollarSign />}
                      label="Price"
                      value1={report.stats.price}
                    />
                    <Stat
                      icon={<HomeIcon />}
                      label="Units"
                      value1={report.stats.units}
                    />
                    <Stat
                      icon={<DollarSign />}
                      label="Est. Rent"
                      value1={report.stats.estRent}
                    />
                    <Stat
                      icon={<TrendingUp />}
                      label="Condition"
                      value1={report.stats.condition}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Stat
                      icon={<BarChart2 />}
                      label="Est. Cash Flow"
                      value2={report.stats.estCashFlow}
                    />
                    <Stat
                      icon={<Percent />}
                      label="CoC Return"
                      value2={report.stats.estCoCReturn}
                    />
                  </div>
                </section>

                <section className="text-sm space-y-1">
                  <h3 className="text-lg font-semibold">Notes</h3>
                  <p>{report.stats.notes}</p>
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
