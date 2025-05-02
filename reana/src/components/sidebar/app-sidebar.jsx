"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import { NavMain } from "@/components/sidebar/nav-main"
import { AboutApp } from "./about-app"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger
} from "@/components/ui/sidebar"

const data = {
  app: {
    name: "Reana",
    slogan: "Real Estate Investment Assistant",
    logo: "/image/logo.jpg"
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
    }
  ],
}

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarTrigger className="place-content-center cone-ml-1" />
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
