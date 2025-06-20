'use client';

import React from 'react';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import RuleOfThumbTable from '@/components/rule-of-thumb/rule-of-thumb-table';

export default function RuleOfThumbMetricsClient({ addressID }) {
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
                <BreadcrumbLink href="#">Local Rule of Thumb</BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
            </Breadcrumb>
        </header>
        <main className="p-8 space-y-6">
            <RuleOfThumbTable propertyId={addressID} />
        </main>
        </SidebarInset>
    </SidebarProvider>
    );
} 