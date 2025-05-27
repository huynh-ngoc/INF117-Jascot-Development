// src/app/investor-cash/page.jsx
"use client";

import React, { useState } from "react";
import UnitRentTable from "./UnitRentTable";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import DarkLightSwitch from "@/components/mode-toggle/dark-light-switch";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const mockAddress = {
  street: "123 Main St",
  city: "Anytown",
  state: "CA",
  zip: "12345",
  units: 3,
  unitData: [
    {
      id: 1,
      furnished: false,
      sqft: 500,
      bedrooms: 1,
      bathrooms: 1,
      perComps: 700,
      scheduledRent: 500,
      currentRent: 500,
    },
    {
      id: 2,
      furnished: false,
      sqft: 1000,
      bedrooms: 3,
      bathrooms: 1,
      perComps: 1150,
      scheduledRent: 850,
      currentRent: 850,
    },
    {
      id: 3,
      furnished: false,
      sqft: 656,
      bedrooms: 1,
      bathrooms: 1,
      perComps: 700,
      scheduledRent: 500,
      currentRent: 0,
    },
  ],
};

export default function IncomeUnitMixPage() {
  const router = useRouter();
  const [unitCount, setUnitCount] = useState(mockAddress.units);
  const [isEditing, setIsEditing] = useState(false);
  const [tempUnitCount, setTempUnitCount] = useState(unitCount);
  const [unitData, setUnitData] = useState(mockAddress.unitData);

  const handleEditClick = () => {
    setTempUnitCount(unitCount);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (tempUnitCount > 0) {
      setUnitCount(tempUnitCount);
      setIsEditing(false);

      if (tempUnitCount > unitData.length) {
        const newUnits = [];
        for (let i = unitData.length + 1; i <= tempUnitCount; i++) {
          newUnits.push({
            id: i,
            furnished: false,
            sqft: 0,
            bedrooms: 0,
            bathrooms: 0,
            perComps: 0,
            scheduledRent: 0,
            currentRent: 0,
          });
        }
        setUnitData([...unitData, ...newUnits]);
      } else if (tempUnitCount < unitData.length) {
        setUnitData(unitData.slice(0, tempUnitCount));
      }
    }
  };

  const handleCancelClick = () => {
    setTempUnitCount(unitCount);
    setIsEditing(false);
  };

  const handleUnitDataChange = (unitId, field, value) => {
    setUnitData((prevData) =>
      prevData.map((unit) =>
        unit.id === unitId ? { ...unit, [field]: value } : unit
      )
    );
  };

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink onClick={() => router.back()}>
                    Property Analysis Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbLink>Income Unit Mix</BreadcrumbLink>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="px-8">
            <DarkLightSwitch className="place-content-center" />
          </div>
        </header>

        <div className="flex-1 flex flex-col gap-4 px-8 py-6">
          <header>
            <h1 className="text-2xl font-bold text-[#2D3142] font-montserrat">
              {mockAddress.street}, {mockAddress.city}, {mockAddress.state}{" "}
              {mockAddress.zip}
            </h1>
            <p className="mt-1 text-lg font-lato text-gray-600">
              Unit Mix & Rent Variables and High/Low Rental Market Value
            </p>
          </header>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border">
            <span className="font-medium text-[#2D3142] font-montserrat">
              Number of Units:
            </span>

            {!isEditing ? (
              <>
                <span className="text-lg font-bold text-[#00A3E0]">
                  {unitCount}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEditClick}
                  className="ml-2"
                >
                  Edit
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={100}
                  className="w-20 border rounded px-2 py-1 text-center font-medium"
                  value={tempUnitCount}
                  onChange={(e) => setTempUnitCount(Number(e.target.value))}
                  autoFocus
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSaveClick}
                  disabled={tempUnitCount <= 0}
                >
                  Save
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleCancelClick}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>

          <UnitRentTable
            unitCount={unitCount}
            unitData={unitData}
            onUnitDataChange={handleUnitDataChange}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
