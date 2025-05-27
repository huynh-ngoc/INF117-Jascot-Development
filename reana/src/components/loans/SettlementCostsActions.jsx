import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";

export default function SettlementCostsActions() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <h3 className="text-lg font-bold">Settlement Costs</h3>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3 py-2">
          <Button variant="secondary" className="w-full font-bold">
            Use "Rule of Thumb" Default
          </Button>
          <Button variant="secondary" className="w-full font-bold">
            Use Detailed Settlement Fees
          </Button>
          <Button variant="secondary" className="w-full font-bold">
            Use Detailed Inspection Costs
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
