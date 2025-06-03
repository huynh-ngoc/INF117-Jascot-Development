"use client";

import * as React from "react";
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
              {/*
                Change h-8 w-8 → h-12 w-12 (48×48px) for a larger logo container:
              */}
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

            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md border bg-transparent">
                <img
                  src={app.logo}
                  alt="Page 1"
                  className="max-h-4 max-w-4 object-contain"
                />
              </div>
              <div className="text-muted-foreground font-medium">Page 1</div>
            </DropdownMenuItem>

            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md border bg-transparent">
                <img
                  src={app.logo}
                  alt="Page 2"
                  className="max-h-4 max-w-4 object-contain"
                />
              </div>
              <div className="text-muted-foreground font-medium">Page 2</div>
            </DropdownMenuItem>

            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md border bg-transparent">
                <img
                  src={app.logo}
                  alt="Page 3"
                  className="max-h-4 max-w-4 object-contain"
                />
              </div>
              <div className="text-muted-foreground font-medium">Page 3</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
