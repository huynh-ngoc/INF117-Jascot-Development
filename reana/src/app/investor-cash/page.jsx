"use client";

import React, { useState, useEffect } from "react";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import ProgressBar, { useFormCompletion } from "@/components/ui/progress-bar";

export default function InvestorCashPage() {
  const [budget, setBudget] = useState({
    downPayment: "",
    closingCosts: "",
    inspections: "",
    upfrontCosts: "",
    rehabCosts: "",
    carryingCosts: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const completion = useFormCompletion(
    budget,
    null,
    (field, value) => value !== "" && Number(value) > 0
  );

  // Load existing data on component mount
  useEffect(() => {
    const loadBudgetData = async () => {
      try {
        const response = await fetch("/api/investor-cash-budget");
        if (response.ok) {
          const result = await response.json();
          const data = result.data;

          setBudget({
            downPayment: data.downPayment?.toString() || "",
            closingCosts: data.closingCosts?.toString() || "",
            inspections: data.inspectionsContractorBids?.toString() || "",
            upfrontCosts: data.upfrontTaxInsuranceHOA?.toString() || "",
            rehabCosts: data.outOfPocketRehabYearOne?.toString() || "",
            carryingCosts:
              data.carryingCostDuringRehabAndRent?.toString() || "",
          });

          if (data.lastUpdated) {
            setLastSaved(new Date(data.lastUpdated.seconds * 1000));
          }
        }
      } catch (error) {
        console.error("Error loading budget data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBudgetData();
  }, []);

  const parseNum = (str) => parseFloat(str.replace(/[^\d.-]/g, "")) || 0;
  const fmt = (n) =>
    n.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  const handleChange = (field) => (e) => {
    const num = parseNum(e.target.value);
    setBudget((prev) => ({ ...prev, [field]: num.toString() }));
  };

  const totalCash = Object.values(budget)
    .map((v) => Number(v) || 0)
    .reduce((sum, n) => sum + n, 0);

  // Save budget data button handler w/ backend API call
  const saveBudget = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/investor-cash-budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          downPayment: Number(budget.downPayment) || 0,
          closingCosts: Number(budget.closingCosts) || 0,
          inspectionsContractorBids: Number(budget.inspections) || 0,
          upfrontTaxInsuranceHOA: Number(budget.upfrontCosts) || 0,
          outOfPocketRehabYearOne: Number(budget.rehabCosts) || 0,
          carryingCostDuringRehabAndRent: Number(budget.carryingCosts) || 0,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setLastSaved(new Date());
        console.log("Budget saved successfully:", result);
        alert("Cash budget saved successfully!");
      } else {
        console.error("Failed to save budget");
        alert("Failed to save budget. Please try again.");
      }
    } catch (error) {
      console.error("Error saving budget:", error);
      alert("Error saving budget. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-lg">Loading budget data...</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex-1 flex flex-col gap-4 px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">
              Total Cash Budget for this Investment to include:
            </h1>

            <div className="text-sm text-gray-500">
              {lastSaved ? (
                <span className="text-green-600">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </span>
              ) : (
                <span className="text-gray-400">Not saved</span>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border-2 border-black">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2">Item</th>
                  <th className="text-right p-2">Amount ($)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Down Payment", "downPayment"],
                  ["Closing Costs", "closingCosts"],
                  ["Inspections, Contractors Bids, etc.", "inspections"],
                  ["Upfront Tax, Insurance & HOA", "upfrontCosts"],
                  ["Out of Pocket rehab year one", "rehabCosts"],
                  ["Carrying cost during rehab and rent", "carryingCosts"],
                ].map(([label, key]) => (
                  <tr key={key} className="even:bg-white odd:bg-gray-50">
                    <td className="p-2">{label}</td>
                    <td className="p-2 text-right">
                      <input
                        type="text"
                        placeholder="$0"
                        value={
                          budget[key] === ""
                            ? ""
                            : `$${fmt(Number(budget[key]))}`
                        }
                        onChange={handleChange(key)}
                        className="w-32 text-right border rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                  </tr>
                ))}

                <tr className="border-t font-semibold bg-gray-100">
                  <td className="p-2">Total Cash Budget</td>
                  <td className="p-2 text-right">${fmt(totalCash)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={saveBudget}
              disabled={isSaving}
              className={`
                px-8 py-3 rounded-lg font-semibold text-white text-lg
                transition-all duration-300 ease-in-out
                ${
                  completion.isComplete
                    ? "hover:shadow-lg hover:scale-105 animate-pulse"
                    : "opacity-50 cursor-not-allowed"
                }
                ${isSaving ? "opacity-50 cursor-not-allowed" : ""}
                disabled:hover:scale-100 disabled:hover:shadow-none
              `}
              style={{
                backgroundColor: completion.isComplete ? "#00A3E0" : "#9CA3AF",
                boxShadow:
                  completion.isComplete && !isSaving
                    ? "0 10px 25px rgba(0, 163, 224, 0.3)"
                    : "none",
              }}
              onMouseEnter={(e) => {
                if (completion.isComplete && !isSaving) {
                  e.target.style.backgroundColor = "#0087C1";
                  e.target.style.boxShadow =
                    "0 15px 35px rgba(0, 163, 224, 0.5)";
                }
              }}
              onMouseLeave={(e) => {
                if (completion.isComplete && !isSaving) {
                  e.target.style.backgroundColor = "#00A3E0";
                  e.target.style.boxShadow =
                    "0 10px 25px rgba(0, 163, 224, 0.3)";
                }
              }}
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save Cash Budget"
              )}
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-2 text-center">
            Note: We use this to notify you when your numbers exceed your
            budget.
          </p>

          <ProgressBar
            current={completion.completed}
            total={completion.total}
            label="Completion Progress"
            showPercentage={true}
            showFraction={true}
            size="medium"
            color="blue"
            completedColor="green"
            className="mt-4"
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
