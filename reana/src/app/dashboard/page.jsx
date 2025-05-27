"use client";
import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DarkLightSwitch from "@/components/mode-toggle/dark-light-switch";
import {
  FilePlus2,
  FilePen,
  ChartNoAxesCombined,
  ScanSearch,
  HousePlus,
} from "lucide-react";

function Dashboard({ userName = "User" }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2 px-8">
            <DarkLightSwitch className="place-content-center" />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 px-8 p-4 pt-0">
          <header>
            <h1 className="text-5xl font-bold">Hello {userName}!</h1>
            <p className="mt-1 text-xl">Welcome to Your Reana Dashboard</p>
          </header>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
            style={{ gridAutoRows: "1fr" }}
          >
            {[
              {
                id: 1,
                icon: <FilePlus2 className="h-6 w-6 text-blue-500" />,
                title: "Create New Investor Profile",
                btn: "Create Now",
                path: "/userinvestmentstrategies",
              },
              {
                id: 2,
                icon: <FilePen className="h-6 w-6 text-green-500" />,
                title: "Edit Existing Investor Profile",
                btn: "Edit Profile",
                // change path to User Investment Strategies page (exist file in database)
                path: "/userinvestmentstrategies",
              },
              {
                id: 3,
                icon: <ChartNoAxesCombined className="h-6 w-6 text-red-500" />,
                title: "Analyze a Property",
                btn: "Analyze Now",
                path: "/prop-analysis-list",
              },
              {
                id: 4,
                icon: <ScanSearch className="h-6 w-6 text-fuchsia-500" />,
                title: "Explore Neighborhoods that Match Your Goals",
                btn: "Explore Now",
                path: "/location-reports",
              },
              // }, {
              //     id: 5,
              //     icon: <HousePlus className="h-6 w-6 text-amber-500" />,
              //     title: "Search Properties that Match Your Goals",
              //     btn: "Search Now",
              //     // change path to Search Properties page
              //     path: "/"
              // }
            ].map((item) => (
              <Card
                key={item.id}
                className="hover:shadow-lg transition-shadow w-full h-full flex flex-col"
              >
                <CardHeader className="flex justify-center p-4">
                  {item.icon}
                </CardHeader>
                <CardContent className="flex-1 flex flex-col items-center justify-center">
                  <h2 className="text-xl mb-8 text-center">{item.title}</h2>
                  <Link href={item.path}>
                    <Button as="a" className="mt-auto font-bold">
                      {item.btn}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
            {/* Search Properties that Match Your Goals  */}
            <Card
              key="5"
              className="hover:shadow-lg transition-shadow w-full h-full flex flex-col"
            >
              <CardHeader className="flex justify-center p-4">
                <HousePlus className="h-6 w-6 text-amber-500" />
              </CardHeader>
              <CardContent className="flex-1 flex flex-col items-center justify-center">
                <h2 className="text-xl mb-8 text-center">
                  Search Properties that Match Your Goals
                </h2>
                <Button as="a" className="mt-auto font-bold" variant="disabled">
                  Search Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Dashboard;
