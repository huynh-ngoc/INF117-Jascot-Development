"use client";

import React, { Suspense, useState, useEffect } from "react";
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
import RentalComps from "@/components/maps/rental-comps";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function InnerRentalCompsPage() {
  const router = useRouter();
  const params = useSearchParams();
  const propertyId = params.get("propertyId");

  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState("Unknown");

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!propertyId) {
        setError("Property ID is required");
        setLoading(false);
        return;
      }

      try {
        // First try to get property from database
        const propertyResponse = await fetch(`/api/properties/${propertyId}`);

        if (propertyResponse.ok) {
          const propertyResult = await propertyResponse.json();
          setPropertyData(propertyResult.property);

          // Set address from property data
          const fullAddress =
            propertyResult.property.originalAddress ||
            `${propertyResult.property.address?.street}, ${propertyResult.property.address?.city}, ${propertyResult.property.address?.state} ${propertyResult.property.address?.zip}`;
          setAddress(fullAddress);
        } else if (propertyResponse.status === 404) {
          // Try to get from localStorage (temporary property)
          const tempPropertyData = localStorage.getItem(
            `temp_property_${propertyId}`
          );

          if (tempPropertyData) {
            const tempData = JSON.parse(tempPropertyData);
            setPropertyData(tempData);

            // Set address from temporary data
            const fullAddress =
              tempData.originalAddress ||
              `${tempData.address?.street}, ${tempData.address?.city}, ${tempData.address?.state} ${tempData.address?.zip}`;
            setAddress(fullAddress);
          } else {
            throw new Error(
              "Property not found and no temporary data available"
            );
          }
        } else {
          throw new Error("Failed to fetch property data");
        }
      } catch (err) {
        console.error("Error fetching property data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [propertyId]);

  if (loading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-lg">Loading property data...</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  if (error) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-red-600">
              <h2 className="text-xl font-bold mb-2">
                Unable to Load Property
              </h2>
              <p className="mb-4">{error}</p>
              <Button onClick={() => router.push("/prop-analysis-dashboard")}>
                Return to Dashboard
              </Button>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    onClick={() =>
                      router.push(
                        `/prop-analysis-dashboard?propertyId=${propertyId}`
                      )
                    }
                  >
                    Property Analysis Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbLink>Rental Comparables</BreadcrumbLink>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="px-8">
            <DarkLightSwitch className="place-content-center" />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 px-8 p-4 pt-0">
          <header>
            <h1 className="text-5xl font-bold">Rental Comparables</h1>
            <p className="mt-1 text-xl text-gray-600">{address}</p>
          </header>
          <div>
            <RentalComps
              address={address}
              propertyData={propertyData}
              propertyId={propertyId}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function RentalCompsPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <InnerRentalCompsPage />
    </Suspense>
  );
}
