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

const initialSections = [
  {
    title: 'Conventional, Seller or Private Financing',
    fields: [
      { label: 'Max LTV', value: '70%', editable: true },
      { label: 'Amortization (Yrs) or Interest Only (I.O)', value: '30', editable: true },
      { label: 'Interest Rate', value: '7.00%', editable: true },
      { label: 'Ballon Payment Due (yrs)', value: '5', editable: true },
    ],
  },
  {
    title: 'DSCR Puri with Rehab Bridge Loan (Flips)',
    fields: [
      { label: 'Max Loan-to-Value LTV as a % of Purchase Price plus Rehab.', value: '90%', editable: true },
      { label: 'Amortization (Yrs) or Interest Only (I.O)', value: 'I.O.', editable: true },
      { label: 'Interest Rate', value: '11.00%', editable: true },
      { label: 'Ballon Payment Due (yrs)', value: '5', editable: true },
      { label: 'First Draw Minimum (Property Purchase)', value: '$50,000', editable: true },
    ],
  },
  {
    title: 'Assume/Subject to existing loan',
    fields: [
      { label: 'Existing Loan Balance', value: '$94,000', editable: true },
      { label: 'Interest Rate', value: '4.75%', editable: true },
      { label: 'Ballon Payment Due (yrs)', value: '0', editable: true },
      { label: 'Refi to this loan after ___ Months', value: '9', editable: true },
      { label: 'Current Payment Schedule (Month)', value: '$490', editable: true },
      { label: 'Current Payment Schedule (Annual)', value: '$5,880', editable: true },
    ],
  },
  {
    title: 'Additional Financing - 2nd Position',
    fields: [
      { label: 'Combined Max LTV', value: '90%', editable: true },
      { label: 'Amortization (Yrs) or Interest Only (I.O)', value: '30', editable: true },
      { label: 'Interest Rate', value: '11.00%', editable: true },
      { label: 'Ballon Payment Due (yrs)', value: '5', editable: true },
      { label: 'Total Lender Fees', value: '0.00%', editable: true },
    ],
  },
];

export default function LoanTermsPage() {
  const [sections, setSections] = useState(initialSections);

  const handleFieldChange = (sectionIdx, fieldIdx, newValue) => {
    setSections(prev => {
      const updated = [...prev];
      updated[sectionIdx] = {
        ...updated[sectionIdx],
        fields: updated[sectionIdx].fields.map((f, i) =>
          i === fieldIdx ? { ...f, value: newValue } : f
        ),
      };
      return updated;
    });
  };

  const handleEnterClose = (sectionIdx) => {
    // Placeholder for save/close logic
    alert(`Saved section: ${sections[sectionIdx].title}`);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center justify-between px-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Rule of Thumb Loan Terms</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="p-8 space-y-6">
          {sections.map((section, sIdx) => (
            <LoanTermsCard
              key={section.title}
              title={section.title}
              fields={section.fields}
              onFieldChange={(fieldIdx, value) => handleFieldChange(sIdx, fieldIdx, value)}
              onEnterClose={() => handleEnterClose(sIdx)}
            />
          ))}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
} 