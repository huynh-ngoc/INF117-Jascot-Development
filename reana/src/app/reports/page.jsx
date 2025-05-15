// src/app/reports/page.jsx
'use client';

import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    {
      key: 'property-comparison',
      label: 'Property Comparison Report',
      action: () => {
        // opens the API route and triggers PDF download
        window.open('/api/location-report-pdf', '_blank');
      },
    },
    {
      key: 'investors-summary',
      label: 'Investors Summary Report',
      action: () => alert('Export coming soon'),
    },
    {
      key: 'buyers-summary',
      label: 'Buyers Summary Report',
      action: () => alert('Export coming soon'),
    },
    {
      key: 'loan-comparison',
      label: 'Loan Comparison Report',
      action: () => alert('Export coming soon'),
    },
  ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Reports</h1>
          <p className="text-sm text-gray-600 mb-6">
            Note: Only the Property Comparison Report works right now. It fetches the Location Reports page as a PDF to demonstrate future export capabilities.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reports.map(report => (
              <Card
                key={report.key}
                onClick={report.action}
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
