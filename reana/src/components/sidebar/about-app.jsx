"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function AboutApp({ app }) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square h-12 w-12 items-center justify-center rounded-lg overflow-hidden">
                <img
                  src={app.logo}
                  alt={`${app.name} logo`}
                  className="max-h-10 max-w-10 object-contain"
                />
              </div>

              <div className="ml-2 grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{app.name}</span>
                <span className="truncate text-[10px]">{app.slogan}</span>
              </div>

              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              About Us
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <Link href="/about/our-story" passHref>
              <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                <div className="flex h-6 w-6 items-center justify-center rounded-md border bg-transparent">
                  <img
                    src={app.logo}
                    alt="Our Story"
                    className="max-h-4 max-w-4 object-contain"
                  />
                </div>
                <div className="text-muted-foreground font-medium">Our Story</div>
              </DropdownMenuItem>
            </Link>

            <Link href="/about/terms" passHref>
              <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                <div className="flex h-6 w-6 items-center justify-center rounded-md border bg-transparent">
                  <img
                    src={app.logo}
                    alt="Terms & Conditions"
                    className="max-h-4 max-w-4 object-contain"
                  />
                </div>
                <div className="text-muted-foreground font-medium">Terms & Conditions</div>
              </DropdownMenuItem>
            </Link>

            <Link href="/about/help" passHref>
              <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                <div className="flex h-6 w-6 items-center justify-center rounded-md border bg-transparent">
                  <img
                    src={app.logo}
                    alt="Help Center"
                    className="max-h-4 max-w-4 object-contain"
                  />
                </div>
                <div className="text-muted-foreground font-medium">Help Center</div>
              </DropdownMenuItem>
            </Link>

            <Link href="/about/faq" passHref>
              <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                <div className="flex h-6 w-6 items-center justify-center rounded-md border bg-transparent">
                  <img
                    src={app.logo}
                    alt="Q&A"
                    className="max-h-4 max-w-4 object-contain"
                  />
                </div>
                <div className="text-muted-foreground font-medium">Q&A</div>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
