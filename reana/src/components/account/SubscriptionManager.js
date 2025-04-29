'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function SubscriptionManager() {
  const [mounted, setMounted] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('free')

  useEffect(() => {
    setMounted(true)
  }, [])

  const handlePlanChange = (value) => {
    setSelectedPlan(value)
  }

  if (!mounted) {
    return null
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
      <Button className="mt-4">Update Subscription</Button>
    </Card>
  )
}