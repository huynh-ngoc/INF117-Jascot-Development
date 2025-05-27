// src/components/sidebar/app-sidebar.jsx
'use client'

import * as React from "react"
import {
  BookOpen,
  Bot,
  Settings2,
  SquareTerminal,
  Ruler,
} from "lucide-react"
import { NavMain } from "@/components/sidebar/nav-main"
import { AboutApp } from "./about-app"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const data = {
  app: {
    name: "Reana",
    slogan: "Real Estate Investment Assistant",
    logo: "/image/logo.jpg",
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
  ],
  // Put RJ review links here
  navRJ: [
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
      title: "Local Rule of Thumb",
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
      title: "Loan Costs by Rule of Thumb",
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
    },    {
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
  ],
}

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarTrigger className="place-content-center ml-1" />
        <AboutApp app={data.app} />
      </SidebarHeader>

      <SidebarContent>
        {/* primary pages */}
        <NavMain items={data.navMain} />

        {/* header for RJ review links */}
        <div className="px-4 pt-6 pb-2 text-xs font-semibold uppercase text-gray-500">
          Pages below for RJ review 
        </div>
        <NavMain items={data.navRJ} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
