// src/app/reports/page.jsx
'use client';

import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    { key: 'property-comparison', label: 'Property Comparison Report' },
    { key: 'investors-summary',   label: 'Investors Summary Report' },
    { key: 'buyers-summary',      label: 'Buyers Summary Report' },
    { key: 'loan-comparison',     label: 'Loan Comparison Report' },
  ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Reports</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reports.map(report => (
              <Card
                key={report.key}
                className="flex flex-col items-center justify-center p-6 cursor-pointer hover:shadow-lg transition"
              >
                <FileText className="w-12 h-12 text-red-600" />
                <CardContent className="mt-4 text-center">
                  {report.label}
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
