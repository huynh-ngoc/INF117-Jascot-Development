'use client';

import React, { useState, useEffect } from 'react';
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
    key: 'conventional',
    title: 'Conventional, Seller or Private Financing',
    fields: [
      { label: 'Max LTV', value: '70%', editable: true },
      { label: 'Amortization (Yrs) or Interest Only (I.O)', value: '30', editable: true },
      { label: 'Interest Rate', value: '7.00%', editable: true },
      { label: 'Ballon Payment Due (yrs)', value: '5', editable: true },
    ],
  },
  {
    key: 'dscr',
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
    key: 'assume',
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
    key: 'additional',
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

// Map financingOption to section key
const financingOptionToKey = {
  'Conventional Loan': 'conventional',
  'Seller Financing': 'conventional',
  'Private Financing': 'conventional',
  'DSCR Bridge Loan for Fix n Flip': 'dscr',
  'DSCR Bridge + Permanent Loan for BRRR': 'dscr',
  'Assume/Subject to existing loan': 'assume',
  'Additional Financing': 'additional',
};

export default function LoanTermsPage() {
  const [sections, setSections] = useState(initialSections);
  const [expandedIdx, setExpandedIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [savingIdx, setSavingIdx] = useState(null);

  // Fetch financingOption and loanTerms on mount
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // 1. Get financingOption
      let financingOption = null;
      try {
        const res = await fetch('/api/user-investment-strategies/investment-preferences');
        if (res.ok) {
          const data = await res.json();
          financingOption = data.investmentPrefs?.financingOption;
        }
      } catch (e) { /* ignore */ }
      // 2. Get loanTerms
      let loanTerms = {};
      try {
        const res = await fetch('/api/user-loan-terms');
        if (res.ok) {
          const data = await res.json();
          loanTerms = data.loanTerms || {};
        }
      } catch (e) { /* ignore */ }
      // 3. Merge loanTerms into sections
      setSections(prev => prev.map(section => {
        const saved = loanTerms[section.key];
        if (saved && Array.isArray(saved.fields)) {
          return { ...section, fields: saved.fields };
        }
        return section;
      }));
      // 4. Auto-expand
      if (financingOption && financingOptionToKey[financingOption]) {
        const idx = initialSections.findIndex(s => s.key === financingOptionToKey[financingOption]);
        setExpandedIdx(idx >= 0 ? idx : 0);
      } else {
        setExpandedIdx(0);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleFieldChange = (sectionIdx, fieldIdx, newValue) => {
    setSections(prev => {
      const updated = [...prev];
      if (updated[sectionIdx].key === 'assume') {
        const monthIdx = updated[sectionIdx].fields.findIndex(f => f.label.includes('Current Payment Schedule (Month)'));
        const annualIdx = updated[sectionIdx].fields.findIndex(f => f.label.includes('Current Payment Schedule (Annual)'));
        let newFields = [...updated[sectionIdx].fields];
        if (fieldIdx === monthIdx) {
          // Update monthly field
          newFields[monthIdx] = { ...newFields[monthIdx], value: newValue };
          // Calculate and update annual field
          const match = newValue.match(/\$?([\d,\.]+)/);
          const monthly = match ? parseFloat(match[1].replace(/,/g, '')) : 0;
          const annual = monthly * 12;
          newFields[annualIdx] = { ...newFields[annualIdx], value: annual > 0 ? `$${annual.toLocaleString()}` : '' };
        } else {
          // Update only the field being edited
          newFields[fieldIdx] = { ...newFields[fieldIdx], value: newValue };
        }
        updated[sectionIdx] = { ...updated[sectionIdx], fields: newFields };
        return updated;
      }
      // Default logic for other sections
      updated[sectionIdx] = {
        ...updated[sectionIdx],
        fields: updated[sectionIdx].fields.map((f, i) =>
          i === fieldIdx ? { ...f, value: newValue } : f
        ),
      };
      return updated;
    });
  };

  const handleEnterClose = async (sectionIdx) => {
    setSavingIdx(sectionIdx);
    const section = sections[sectionIdx];
    try {
      await fetch('/api/user-loan-terms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loanType: section.key, terms: { fields: section.fields } }),
      });
      alert(`Saved section: ${section.title}`);
    } catch (e) {
      alert('Failed to save.');
    }
    setSavingIdx(null);
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
          {!loading && sections.map((section, sIdx) => (
            <div key={section.title}>
              <div
                className="cursor-pointer mb-2"
                onClick={() => setExpandedIdx(sIdx)}
              >
                <span className={`font-semibold ${expandedIdx === sIdx ? 'text-[#00A3E0]' : ''}`}>{section.title}</span>
              </div>
              {expandedIdx === sIdx && (
                <LoanTermsCard
                  title={section.title}
                  fields={section.fields}
                  onFieldChange={(fieldIdx, value) => handleFieldChange(sIdx, fieldIdx, value)}
                  onEnterClose={() => handleEnterClose(sIdx)}
                />
              )}
            </div>
          ))}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
} 