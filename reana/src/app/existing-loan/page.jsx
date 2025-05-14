'use client';

import React, { useState } from 'react';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import LoanTermsCard from '@/components/loans/LoanTermsCard';
import { Button } from '@/components/ui/button';
import SettlementCostsActions from '@/components/loans/SettlementCostsActions';

const initialFields = [
  { label: 'Existing Loan Balance', value: '$94,000', editable: true },
  { label: 'Interest Rate', value: '4.75%', editable: true },
  { label: 'Ballon Payment Due (yrs)', value: '0', editable: true },
  { label: 'Refi to this loan after ___ Months', value: '9', editable: true },
  { label: 'Current Payment Schedule (Month)', value: '$490', editable: true },
  { label: 'Current Payment Schedule (Annual)', value: '$5,880', editable: false }, // calculated
];

function calculateAnnual(fields) {
  // Find the monthly payment field
  const monthlyField = fields.find(f => f.label === 'Current Payment Schedule (Month)');
  if (!monthlyField) return '';
  // Extract numeric value from $xxx
  const match = monthlyField.value.match(/\$?([\d,\.]+)/);
  if (!match) return '';
  const monthly = parseFloat(match[1].replace(/,/g, ''));
  if (isNaN(monthly)) return '';
  const annual = monthly * 12;
  // Format as $X,XXX
  return '$' + annual.toLocaleString();
}

export default function AssumeExistingLoanPage() {
  const [fields, setFields] = useState(initialFields);

  const handleFieldChange = (idx, newValue) => {
    setFields(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], value: newValue };
      // If monthly payment changes, recalculate annual
      if (updated[idx].label === 'Current Payment Schedule (Month)') {
        const annualValue = calculateAnnual(updated);
        const annualIdx = updated.findIndex(f => f.label === 'Current Payment Schedule (Annual)');
        if (annualIdx !== -1) {
          updated[annualIdx] = { ...updated[annualIdx], value: annualValue };
        }
      }
      return updated;
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center justify-between px-8 border-b border-[#4F5D75]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard" className="text-[#00A3E0] font-montserrat hover:text-[#0077AC]">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="text-[#2D3142] font-montserrat">Existing Loan</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="p-8 space-y-6">
          <LoanTermsCard
            title="Assume/Subject to existing loan"
            fields={fields}
            onFieldChange={handleFieldChange}
            onEnterClose={() => {}}
          />
          <Button 
            variant="outline" 
            className="w-full font-montserrat text-[#2D3142] border-[#4F5D75] hover:bg-[#F8F9FA]"
          >
            Add Another Loan (Secondary Financing)
          </Button>
          <SettlementCostsActions />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
} 