// src/components/sidebar/app-sidebar.jsx
"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Settings2,
  DollarSign,
  SquareTerminal,
  Archive,
} from "lucide-react";
import { NavMain } from "@/components/sidebar/nav-main";
import { AboutApp } from "./about-app";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const data = {
  app: {
    name: "Reana",
    slogan: "Real Estate Investment Assistant",
    logo: "/reana-logo.png",
  },
  user: {
    name: "User",
    email: "user@example.com",
    avatar: "/image/user.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: false,
      items: [],
    },
    {
      title: "Investment Strategies",
      url: "/userinvestmentstrategies",
      icon: Bot,
      items: [],
    },
    {
      title: "Location Reports",
      url: "/location-reports",
      icon: BookOpen,
      items: [],
    },
    {
      title: "Property Report",
      url: "/property-report",
      icon: Settings2,
      items: [],
    },
    {
      title: "Sales",
      url: "/sales-comps",
      icon: DollarSign,
      items: [],
    },
    {
      title: "Archive",
      url: "/archive",
      icon: Archive,
      items: [],
    },
  ],
};

/*
ARCHIVED NAVIGATION ITEMS - For RJ Review (moved from production sidebar)
============================================================================
These items were previously in the sidebar under "Pages below for RJ review"
Future developers can reference this archive to restore or modify these routes.

const archivedNavRJ = [
  {
    title: "Realtor Profile",
    url: "/realtor-pop-up",
    icon: BookOpen,
    items: [],
  },
  {
    title: "Investor Cash",
    url: "/investor-cash",
    icon: SquareTerminal,
    items: [],
  },
  {
    title: "Income Unit Mix",
    url: "/income-unit-mix",
    icon: Bot,
    items: [],
  },
  {
    title: "DSCR Bridge Loan",
    url: "/dscr-bridge-loan",
    icon: BookOpen,
    items: [],
  },
  {
    title: "DSCR Bridge Perm",
    url: "/dscr-bridge-perm",
    icon: SquareTerminal,
    items: [],
  },
  {
    title: "DSCR Bridge Rehab",
    url: "/dscr-bridge-rehab",
    icon: Bot,
    items: [],
  },
  {
    title: "Rule of Thumb Metrics",
    url: "/rule-of-thumb-metrics",
    icon: Ruler,
    items: [],
  },
  {
    title: "Rule of Thumb Operating Budget",
    url: "/rule-of-thumb-opr-budget",
    icon: Ruler,
    items: [],
  },
  {
    title: "Rule of Thumb Loan Cost",
    url: "/rule-of-thumb-loan-cost",
    icon: Ruler,
    items: [],
  },
  {
    title: "Rule of Thumb Loan Terms",
    url: "/rule-of-thumb-loan-terms",
    icon: Ruler,
    items: [],
  },
  {
    title: "Existing Loan",
    url: "/existing-loan",
    icon: Ruler,
    items: [],
  },
  {
    title: "Rehab and Renovation",
    url: "/rehab-renovation",
    icon: Ruler,
    items: [],
  },
  {
    title: "Detailed lender fees 1st",
    url: "/detailed-lender-fees-1st",
    icon: SquareTerminal,
    items: [],
  },
  {
    title: "Detailed lender fees 2nd",
    url: "/detailed-lender-fees-2nd",
    icon: SquareTerminal,
    items: [],
  },
  {
    title: "Detailed inspection fees",
    url: "/detailed-inspection-fees",
    icon: SquareTerminal,
    items: [],
  },
  {
    title: "Detailed settlement fees",
    url: "/detailed-settlement-fees",
    icon: SquareTerminal,
    items: [],
  },
  {
    title: "reports page",
    url: "/reports",
    icon: SquareTerminal,
    items: [],
  },
  {
    title: "Ltr-Brrrr Oper Budget",
    url: "/ltr-brrrr-operbudget",
    icon: Receipt,
    items: [],
  },
  {
    title: "Fix-n-flip Oper Budget",
    url: "/fix-n-flip-operbudget",
    icon: Receipt,
    items: [],
  },
  {
    title: "Total Investment",
    url: "/total-investment",
    icon: Receipt,
    items: [],
  },
];

To restore archived items:
1. Add the required icons to the import statement
2. Uncomment the archivedNavRJ array
3. Add a section header and NavMain component in SidebarContent
4. Example:
   <div className="px-4 pt-6 pb-2 text-xs font-semibold uppercase text-gray-500">
     Archived Features
   </div>
   <NavMain items={archivedNavRJ} />
============================================================================
*/

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarTrigger className="place-content-center ml-1" />
        <AboutApp app={data.app} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}