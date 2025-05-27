"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import LoanTermsCard from "@/components/loans/LoanTermsCard";
import { Button } from "@/components/ui/button";
import SettlementCostsActions from "@/components/loans/SettlementCostsActions";

const initialFields = [
  { label: "Existing Loan Balance", value: "$94,000", editable: true },
  { label: "Interest Rate", value: "4.75%", editable: true },
  { label: "Ballon Payment Due (yrs)", value: "0", editable: true },
  { label: "Refi to this loan after ___ Months", value: "9", editable: true },
  { label: "Current Payment Schedule (Month)", value: "$490", editable: true },
  {
    label: "Current Payment Schedule (Annual)",
    value: "$5,880",
    editable: false,
  }, // calculated
];

function calculateAnnual(fields) {
  // Find the monthly payment field
  const monthlyField = fields.find(
    (f) => f.label === "Current Payment Schedule (Month)"
  );
  if (!monthlyField) return "";
  // Extract numeric value from $xxx
  const match = monthlyField.value.match(/\$?([\d,\.]+)/);
  if (!match) return "";
  const monthly = parseFloat(match[1].replace(/,/g, ""));
  if (isNaN(monthly)) return "";
  const annual = monthly * 12;
  // Format as $X,XXX
  return "$" + annual.toLocaleString();
}

// Transaction summary for each loan
function TransactionSummary({ fields }) {
  const balance =
    fields.find((f) => f.label === "Existing Loan Balance")?.value || "";
  const rate = fields.find((f) => f.label === "Interest Rate")?.value || "";
  const monthPay =
    fields.find((f) => f.label === "Current Payment Schedule (Month)")?.value ||
    "";
  const annualPay =
    fields.find((f) => f.label === "Current Payment Schedule (Annual)")
      ?.value || "";

  // Don't show summary if no data entered
  if (!balance && !rate && !monthPay) return null;

  return (
    <div className="bg-[#F8F9FA] border border-[#4F5D75] rounded-lg p-4 mt-2 mb-6">
      <div className="font-montserrat text-[#2D3142] mb-2">
        Primary Loan Summary
      </div>
      <div className="grid grid-cols-2 gap-2 font-lato text-sm">
        <div>Loan Balance:</div>
        <div>{balance}</div>
        <div>Interest Rate:</div>
        <div>{rate}</div>
        <div>Monthly Payment:</div>
        <div>{monthPay}</div>
        <div>Annual Payment:</div>
        <div>{annualPay}</div>
      </div>
    </div>
  );
}
export default function AssumeExistingLoanPage() {
  const router = useRouter();

  // Single primary loan state
  const [primaryLoan, setPrimaryLoan] = useState({
    fields: initialFields,
    saved: false,
  });

  const handleFieldChange = (idx, newValue) => {
    setPrimaryLoan((prev) => {
      const updatedFields = [...prev.fields];
      updatedFields[idx] = { ...updatedFields[idx], value: newValue };

      // Auto-calculate annual payment
      if (updatedFields[idx].label === "Current Payment Schedule (Month)") {
        const annualValue = calculateAnnual(updatedFields);
        const annualIdx = updatedFields.findIndex(
          (f) => f.label === "Current Payment Schedule (Annual)"
        );
        if (annualIdx !== -1) {
          updatedFields[annualIdx] = {
            ...updatedFields[annualIdx],
            value: annualValue,
          };
        }
      }

      return { ...prev, fields: updatedFields, saved: false };
    });
  };

  const handleSaveLoan = async () => {
    try {
      // Extract values from fields
      const loanData = {
        existingLoanBalance: parseFloat(
          primaryLoan.fields
            .find((f) => f.label === "Existing Loan Balance")
            ?.value.replace(/[$,]/g, "") || 0
        ),
        interestRate: parseFloat(
          primaryLoan.fields
            .find((f) => f.label === "Interest Rate")
            ?.value.replace("%", "") || 0
        ),
        balloonPaymentDue: parseFloat(
          primaryLoan.fields.find((f) => f.label === "Ballon Payment Due (yrs)")
            ?.value || 0
        ),
        refiAfterMonths: parseFloat(
          primaryLoan.fields.find(
            (f) => f.label === "Refi to this loan after ___ Months"
          )?.value || 0
        ),
        monthlyPayment: parseFloat(
          primaryLoan.fields
            .find((f) => f.label === "Current Payment Schedule (Month)")
            ?.value.replace(/[$,]/g, "") || 0
        ),
      };

      const response = await fetch("/api/existing-loan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loanData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save loan");
      }

      const result = await response.json();
      setPrimaryLoan((prev) => ({ ...prev, saved: true }));
      console.log("Primary loan saved successfully:", result);

      alert("Primary loan saved successfully!");
    } catch (error) {
      console.error("Error saving loan:", error);
      alert(`Error saving loan: ${error.message}`);
    }
  };

  const handleAddSecondaryLoan = () => {
    if (!primaryLoan.saved) {
      alert("Please save the primary loan before adding a secondary loan.");
      return;
    }
    router.push("/secondary-loan");
  };

  const handleNext = () => {
    if (!primaryLoan.saved) {
      alert("Please save your changes before proceeding.");
      return;
    }
    router.push("/loan-next-step");
  };

  const handleBack = () => {
    if (!primaryLoan.saved) {
      const confirmLeave = confirm(
        "You have unsaved changes. Are you sure you want to leave without saving?"
      );
      if (!confirmLeave) return;
    }
    router.push("/dashboard");
  };

  // Warn on page unload if unsaved
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!primaryLoan.saved) {
        e.preventDefault();
        e.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [primaryLoan.saved]);

  const loadLoanData = async () => {
    try {
      const response = await fetch("/api/existing-loan");
      if (response.ok) {
        const result = await response.json();
        const data = result.data;

        if (data.lastUpdated) {
          const updatedFields = [...initialFields];
          updatedFields[0].value =
            data.existingLoanBalance > 0
              ? `$${data.existingLoanBalance.toLocaleString()}`
              : "";
          updatedFields[1].value =
            data.interestRate > 0 ? `${data.interestRate}%` : "";
          updatedFields[2].value = data.balloonPaymentDue.toString();
          updatedFields[3].value = data.refiAfterMonths.toString();
          updatedFields[4].value =
            data.monthlyPayment > 0
              ? `$${data.monthlyPayment.toLocaleString()}`
              : "";
          updatedFields[5].value =
            data.annualPayment > 0
              ? `$${data.annualPayment.toLocaleString()}`
              : "";

          setPrimaryLoan({
            fields: updatedFields,
            saved: true,
          });
        }
      }
    } catch (error) {
      console.error("Error loading loan data:", error);
    }
  };

  useEffect(() => {
    loadLoanData();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center justify-between px-8 border-b border-[#4F5D75]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/dashboard"
                  className="text-[#00A3E0] font-montserrat hover:text-[#0077AC]"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="#"
                  className="text-[#2D3142] font-montserrat"
                >
                  Existing Loan
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="p-8 space-y-6">
          {/* Primary Loan */}
          <div>
            <LoanTermsCard
              title="Primary Loan (Assume/Subject to existing loan)"
              fields={primaryLoan.fields}
              onFieldChange={handleFieldChange}
              onEnterClose={handleSaveLoan}
            />
            <TransactionSummary fields={primaryLoan.fields} />
          </div>

          {/* Save Status Indicator */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div
              className={`flex items-center gap-2 text-sm ${
                primaryLoan.saved ? "text-green-600" : "text-orange-600"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  primaryLoan.saved ? "bg-green-600" : "bg-orange-600"
                }`}
              ></div>
              Primary Loan:{" "}
              {primaryLoan.saved
                ? "Saved"
                : "Unsaved - Please save your changes"}
            </div>
          </div>

          {/* Add Secondary Loan Button */}
          <Button
            variant="default"
            className="w-full  text-white font-montserrat hover:bg-[#0077AC] hover:shadow-md"
            onClick={handleAddSecondaryLoan}
            disabled={!primaryLoan.saved}
          >
            {primaryLoan.saved
              ? "Add Another Loan (Secondary Financing)"
              : "Save Primary Loan First to Add Secondary Financing"}
          </Button>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            <Button
              variant="primary"
              className="w-full font-montserrat mt-4 bg-[#00A3E0] text-white hover:bg-[#0077AC]"
              onClick={handleNext}
              variant={primaryLoan.saved ? "default" : "outline"}
              disabled={!primaryLoan.saved}
            >
              {primaryLoan.saved ? "Next Step" : "Save Changes to Continue"}
            </Button>
            <Button
              className="flex-1 font-montserrat"
              onClick={handleBack}
              variant="secondary"
            >
              Back to Dashboard
            </Button>
          </div>

          <SettlementCostsActions />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
