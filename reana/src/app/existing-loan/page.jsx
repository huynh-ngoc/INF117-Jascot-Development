'use client';

import React, { useState, useEffect, useRef } from 'react';
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

// Add a simple modal component
function ConfirmModal({ open, onConfirm, onCancel, message }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
        <div className="mb-4 text-[#2D3142] font-montserrat">{message}</div>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 rounded bg-gray-200 text-[#2D3142] font-montserrat">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded bg-[#00A3E0] text-white font-montserrat">Confirm</button>
        </div>
      </div>
    </div>
  );
}

// Transaction summary for each loan
function TransactionSummary({ fields }) {
  const balance = fields.find(f => f.label === 'Existing Loan Balance')?.value || '';
  const rate = fields.find(f => f.label === 'Interest Rate')?.value || '';
  const monthPay = fields.find(f => f.label === 'Current Payment Schedule (Month)')?.value || '';
  const annualPay = fields.find(f => f.label === 'Current Payment Schedule (Annual)')?.value || '';
  return (
    <div className="bg-[#F8F9FA] border border-[#4F5D75] rounded-lg p-4 mt-2 mb-6">
      <div className="font-montserrat text-[#2D3142] mb-2">This Transaction</div>
      <div className="grid grid-cols-2 gap-2 font-lato text-sm">
        <div>Loan Balance:</div><div>{balance}</div>
        <div>Interest Rate:</div><div>{rate}</div>
        <div>Monthly Payment:</div><div>{monthPay}</div>
        <div>Annual Payment:</div><div>{annualPay}</div>
      </div>
    </div>
  );
}

export default function AssumeExistingLoanPage() {
  const [loans, setLoans] = useState([
    { id: 1, fields: initialFields, saved: false }
  ]);
  const [nextId, setNextId] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [pendingStrategyId, setPendingStrategyId] = useState(null);

  const resetLoans = () => {
    setLoans([{ id: 1, fields: initialFields, saved: false }]);
    setNextId(2);
  };

  const handleFieldChange = (loanId, idx, newValue) => {
    setLoans(prevLoans => prevLoans.map(loan => {
      if (loan.id !== loanId) return loan;
      const updatedFields = [...loan.fields];
      updatedFields[idx] = { ...updatedFields[idx], value: newValue };
      if (updatedFields[idx].label === 'Current Payment Schedule (Month)') {
        const annualValue = calculateAnnual(updatedFields);
        const annualIdx = updatedFields.findIndex(f => f.label === 'Current Payment Schedule (Annual)');
        if (annualIdx !== -1) {
          updatedFields[annualIdx] = { ...updatedFields[annualIdx], value: annualValue };
        }
      }
      return { ...loan, fields: updatedFields, saved: false };
    }));
  };

  const handleAddLoan = () => {
    setLoans(prev => ([
      ...prev,
      { id: nextId, fields: initialFields, saved: false }
    ]));
    setNextId(id => id + 1);
  };

  const handleSaveLoan = (loanId) => {
    setLoans(prevLoans => {
      const updated = prevLoans.map(loan =>
        loan.id === loanId ? { ...loan, saved: true } : loan
      );
      localStorage.setItem('existingLoans', JSON.stringify(updated));
      return updated;
    });
  };

  const handleNext = () => {
    // TODO: implement navigation
    alert('Go to next step!');
  };

  const handleBack = () => {
    // TODO: implement navigation
    window.location.href = '/dashboard';
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    resetLoans();
  };
  const handleModalCancel = () => {
    setShowModal(false);
    // Optionally revert strategyId in parent/context
  };

  // Warn on page unload if unsaved
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (loans.some(loan => !loan.saved)) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [loans]);

  const allSaved = loans.every(loan => loan.saved);

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
          {loans.map((loan, idx) => (
            <div key={loan.id}>
              <LoanTermsCard
                title={`Assume/Subject to existing loan${loans.length > 1 ? ` #${idx + 1}` : ''}`}
                fields={loan.fields}
                onFieldChange={(fieldIdx, value) => handleFieldChange(loan.id, fieldIdx, value)}
                onEnterClose={() => handleSaveLoan(loan.id)}
              />
              <TransactionSummary fields={loan.fields} />
            </div>
          ))}
          <Button
            variant="outline"
            className="w-full font-montserrat text-[#2D3142] border-[#4F5D75] hover:bg-[#F8F9FA]"
            onClick={handleAddLoan}
          >
            Add Another Loan (Secondary Financing)
          </Button>
          <div className="flex gap-4 mt-8">
            <Button
              className="flex-1 font-montserrat"
              onClick={handleNext}
              variant={allSaved ? 'default' : 'disabled'}
              disabled={!allSaved}
            >
              Next
            </Button>
            <Button
              className="flex-1 font-montserrat"
              onClick={handleBack}
              variant="outline"
            >
              Back to Dashboard
            </Button>
          </div>
          <SettlementCostsActions />
        </main>
        <ConfirmModal
          open={showModal}
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
          message="You have unsaved changes. Changing your investment strategy will reset all loan data. Continue?"
        />
      </SidebarInset>
    </SidebarProvider>
  );
} 