'use client';

import React from "react";
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettlementCostsActions() {
  const router = useRouter();

  return (
    <Card className="mb-6">
      <CardHeader>
        <h3 className="text-lg font-bold">Settlement Costs</h3>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3 py-2">
          <Button
            variant="secondary"
            className="w-full font-bold"
            onClick={() => {
              router.push('/rule-of-thumb-metrics');
            }}
          >
            Use "Rule of Thumb" Default
          </Button>

          <Button
            variant="secondary"
            className="w-full font-bold"
            onClick={() => {
              router.push('/detailed-settlement-fees');
            }}
          >
            Use Detailed Settlement Fees
          </Button>

          <Button
            variant="secondary"
            className="w-full font-bold"
            onClick={() => {
              router.push('/detailed-inspection-fees');
            }}
          >
            Use Detailed Inspection Costs
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
