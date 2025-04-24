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
      title: "Page 1",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Sub Page 1",
          url: "#",
        },
        {
          title: "Sub Page 2",
          url: "#",
        },
        {
          title: "Sub Page 3",
          url: "#",
        },
      ],
    },
    {
      title: "Page 2",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Sub Page 1",
          url: "#",
        },
        {
          title: "Sub Page 2",
          url: "#",
        },
        {
          title: "Sub Page 3",
          url: "#",
        },
      ],
    },
    {
      title: "Page 3",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Sub Page 1",
          url: "#",
        },
        {
          title: "Get Sub Page 2",
          url: "#",
        },
        {
          title: "Sub Page 3",
          url: "#",
        },
      ],
    },
    {
      title: "Page 4",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Sub Page 1",
          url: "#",
        },
        {
          title: "Sub Page 2",
          url: "#",
        },
        {
          title: "Sub Page 3",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({
  ...props
}) {
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
