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

// Placeholder: get selectedFinancingType from context/prop
const selectedFinancingType = 'Assume/Subject to Existing Loan'; // TODO: Replace with real value from context/prop

if (selectedFinancingType !== 'Assume/Subject to Existing Loan') {
  // Redirect or show message
  if (typeof window !== 'undefined') {
    window.location.href = '/dashboard';
  }
  return <div className="p-8">You have not selected this financing option. Redirecting...</div>;
}

// Add a simple modal component
function ConfirmModal({ open, onConfirm, onCancel, message }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
        <div className="mb-4 text-[#2D3142] font-montserrat">
          {message || 'Changing the financing option will erase all loan information you have entered on this page. Are you sure you want to continue?'}
        </div>
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

function formatLoanFieldsForUI(fields) {
  return fields.map(f => {
    let value = f.value;
    if (typeof value === 'number') {
      if (f.label.toLowerCase().includes('rate') || f.label.includes('%')) {
        // Convert decimal to percent string
        value = (value * 100).toFixed(2) + '%';
      } else if (f.label.toLowerCase().includes('loan balance') || f.label.toLowerCase().includes('payment')) {
        // Format as $X,XXX
        value = '$' + Number(value).toLocaleString();
      }
    }
    return { ...f, value };
  });
}

// Add form validation for Save button
function isLoanValid(fields) {
  return fields.every(f => f.value !== '' && f.value !== null && f.value !== undefined);
}

export default function AssumeExistingLoanPage({ strategyId }) {
  const [loans, setLoans] = useState([
    { id: 1, fields: initialFields, saved: false }
  ]);
  const [nextId, setNextId] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [pendingStrategyId, setPendingStrategyId] = useState(null);
  const prevStrategyId = useRef(strategyId);
  const [loading, setLoading] = useState(true);

  // Fetch existing loans from the database on mount
  useEffect(() => {
    async function fetchLoans() {
      setLoading(true);
      try {
        const res = await fetch('/api/existing-loan');
        const data = await res.json();
        if (data.success && Array.isArray(data.existingLoans) && data.existingLoans.length > 0) {
          setLoans(data.existingLoans.slice(0,2).map((loan, idx) => ({
            id: idx + 1,
            fields: formatLoanFieldsForUI(loan.fields || initialFields),
            saved: true
          })));
          setNextId(data.existingLoans.length + 1);
        } else {
          setLoans([{ id: 1, fields: initialFields, saved: false }]);
          setNextId(2);
        }
      } catch (e) {
        setLoans([{ id: 1, fields: initialFields, saved: false }]);
        setNextId(2);
      }
      setLoading(false);
    }
    fetchLoans();
  }, []);

  // Listen for strategy change
  useEffect(() => {
    if (prevStrategyId.current !== strategyId) {
      if (loans.some(loan => !loan.saved)) {
        setShowModal(true);
        setPendingStrategyId(strategyId);
      } else {
        resetLoans();
        prevStrategyId.current = strategyId;
      }
    }
    // eslint-disable-next-line
  }, [strategyId, loans]);

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

  const handleSaveLoan = async (loanId) => {
    setLoans(prevLoans => {
      const idx = prevLoans.findIndex(loan => loan.id === loanId);
      if (idx === -1) return prevLoans;
      const loanToSave = prevLoans[idx];
      // Validate fields before saving
      if (!isLoanValid(loanToSave.fields)) {
        alert('Please fill in all required fields before saving.');
        return prevLoans;
      }
      // Clean fields before sending
      const cleanedFields = loanToSave.fields.map(f => {
        let value = f.value;
        if (typeof value === 'string') {
          if (f.label.toLowerCase().includes('rate') || f.label.includes('%')) {
            value = parseFloat(value.replace('%', '')) / 100;
          } else if (f.label.toLowerCase().includes('loan balance') || f.label.toLowerCase().includes('payment')) {
            value = parseFloat(value.replace(/[$,]/g, ''));
          }
        }
        return { ...f, value };
      });
      // PATCH only this loan
      fetch('/api/existing-loan', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loanIndex: idx, loanData: { fields: cleanedFields } }),
      }).then(res => {
        if (res.ok) {
          alert('Loan info saved!');
        } else {
          alert('Failed to save.');
        }
      });
      // Mark as saved in UI
      return prevLoans.map((loan, i) => i === idx ? { ...loan, saved: true } : loan);
    });
  };

  const handleNext = () => {
    // Navigate to Purchase & Rehab Settlement Costs page
    window.location.href = '/detailed-settlement-fees';
  };

  const handleBack = () => {
    
    window.location.href = '/dashboard';
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    resetLoans();
    prevStrategyId.current = pendingStrategyId;
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
              <Button
                variant="primary"
                className="w-full font-montserrat mt-4 bg-[#00A3E0] text-white hover:bg-[#0077AC]"
                onClick={() => handleSaveLoan(loan.id)}
                disabled={!isLoanValid(loan.fields)}
              >
                Save Changes
              </Button>
            </div>
          ))}
          {loans.length < 2 && (
            <Button
              variant="outline"
              className="w-full font-montserrat text-[#2D3142] border-[#4F5D75] hover:bg-[#F8F9FA]"
              onClick={handleAddLoan}
            >
              Add Another Loan (Secondary Financing)
            </Button>
          )}
          <div className="flex gap-4 mt-8">
            <Button
              variant="primary"
              className="w-full font-montserrat mt-4 bg-[#00A3E0] text-white hover:bg-[#0077AC]"
              onClick={handleNext}
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