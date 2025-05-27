"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function SubscriptionManager({ onDataChange }) {
  const [mounted, setMounted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [previousPlan, setPreviousPlan] = useState("pro");
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Send data to parent whenever selectedPlan changes
  useEffect(() => {
    if (onDataChange && mounted) {
      const subscriptionData = {
        selectedPlan,
        previousPlan,
        showWarning,
        timestamp: new Date().toISOString(),
      };
      onDataChange(subscriptionData);
    }
  }, [selectedPlan, previousPlan, showWarning, mounted]);

  const handlePlanChange = (value) => {
    if (
      (previousPlan === "pro" || previousPlan === "enterprise") &&
      value === "free"
    ) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
    setSelectedPlan(value);
    console.log("Selected plan:", value);
  };

  if (!mounted) {
    return null;
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Subscription Plan</h2>
      <RadioGroup
        defaultValue={selectedPlan}
        onValueChange={handlePlanChange}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="free" id="free" />
          <Label htmlFor="free">Free Plan</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="pro" id="pro" />
          <Label htmlFor="pro">Pro Plan</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="enterprise" id="enterprise" />
          <Label htmlFor="enterprise">Enterprise Plan</Label>
        </div>
      </RadioGroup>

      {showWarning && (
        <div className="mt-4 p-4 text-sm text-yellow-800 bg-yellow-100 rounded-md border border-yellow-300">
          ⚠️ If you move from a subscription to the free plan, all of your data
          beyond the Quick Check information will become unavailable. Your data
          will be retained in the system in case you upgrade again at a later
          date.
        </div>
      )}

      <Button className="mt-4">Update Subscription</Button>
    </Card>
  );
}
