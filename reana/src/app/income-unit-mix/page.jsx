"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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

export default function IncomeUnitMixPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");

  const [propertyData, setPropertyData] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTemporaryProperty, setIsTemporaryProperty] = useState(false);

  const [unitCount, setUnitCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [tempUnitCount, setTempUnitCount] = useState(0);
  const [unitData, setUnitData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!propertyId) {
        setError("Property ID is required");
        setLoading(false);
        return;
      }

      try {
        const propertyResponse = await fetch(`/api/properties/${propertyId}`);

        if (propertyResponse.ok) {
          const propertyResult = await propertyResponse.json();

          setPropertyData(propertyResult.property);
          setIsTemporaryProperty(false);

          // Try to get existing analysis data (including user-saved unit mix)
          const analysisResponse = await fetch(
            `/api/properties/${propertyId}/analysis`
          );

          let analysisResult = { analysis: { unitMix: [] } };
          let existingUnitMix = [];

          if (analysisResponse.ok) {
            analysisResult = await analysisResponse.json();
            // Check for user-saved unit mix data first
            existingUnitMix = analysisResult.analysis?.unitMix || [];
          }

          setAnalysisData(analysisResult.analysis);

          const numberOfUnits =
            propertyResult.property.basicInfo?.numberOfUnits ||
            propertyResult.property.propertyMetrics?.numberOfUnits ||
            existingUnitMix.length ||
            1;

          setUnitCount(numberOfUnits);
          setTempUnitCount(numberOfUnits);

          // Use existing unit mix if available, otherwise generate defaults
          if (existingUnitMix.length > 0) {
            // User has saved unit mix data - use it
            setUnitData(existingUnitMix);
          } else {
            // No saved unit mix - generate defaults from property data
            const totalBedrooms =
              propertyResult.property.basicInfo?.numberOfbedrooms ||
              propertyResult.property.propertyMetrics?.numberOfbedrooms ||
              0;
            const totalBathrooms =
              propertyResult.property.basicInfo?.numberOfbathrooms ||
              propertyResult.property.propertyMetrics?.numberOfbathrooms ||
              0;
            const totalSqFt =
              propertyResult.property.basicInfo?.propertySize ||
              propertyResult.property.propertyMetrics?.propertySize ||
              0;

            const defaultUnitData = Array.from(
              { length: numberOfUnits },
              (_, i) => ({
                id: i + 1,
                furnished: false,
                sqft: Math.floor(totalSqFt / numberOfUnits) || 0,
                bedrooms: Math.floor(totalBedrooms / numberOfUnits) || 0,
                bathrooms: Math.floor(totalBathrooms / numberOfUnits) || 0,
                perComps: 0,
                scheduledRent: 0,
                currentRent: 0,
              })
            );

            setUnitData(defaultUnitData);
          }
        } else if (propertyResponse.status === 404) {
          // Handle temporary property data (unchanged)
          const tempPropertyData = localStorage.getItem(
            `temp_property_${propertyId}`
          );

          if (tempPropertyData) {
            const tempData = JSON.parse(tempPropertyData);
            setPropertyData(tempData);
            setIsTemporaryProperty(true);

            const numberOfUnits =
              tempData.basicInfo?.numberOfUnits ||
              tempData.propertyMetrics?.numberOfUnits ||
              1;

            setUnitCount(numberOfUnits);
            setTempUnitCount(numberOfUnits);

            // Check if there's saved unit mix data in localStorage
            const savedUnitMix = tempData.unitMix;

            if (savedUnitMix && savedUnitMix.length > 0) {
              // User has saved unit mix data in localStorage
              setUnitData(savedUnitMix);
            } else {
              // Generate defaults
              const totalBedrooms =
                tempData.basicInfo?.numberOfbedrooms ||
                tempData.propertyMetrics?.numberOfbedrooms ||
                0;
              const totalBathrooms =
                tempData.basicInfo?.numberOfbathrooms ||
                tempData.propertyMetrics?.numberOfbathrooms ||
                0;
              const totalSqFt =
                tempData.basicInfo?.propertySize ||
                tempData.propertyMetrics?.propertySize ||
                0;

              const defaultUnitData = Array.from(
                { length: numberOfUnits },
                (_, i) => ({
                  id: i + 1,
                  furnished: false,
                  sqft: Math.floor(totalSqFt / numberOfUnits) || 0,
                  bedrooms: Math.floor(totalBedrooms / numberOfUnits) || 0,
                  bathrooms: Math.floor(totalBathrooms / numberOfUnits) || 0,
                  perComps: 0,
                  scheduledRent: 0,
                  currentRent: 0,
                })
              );

              setUnitData(defaultUnitData);
            }

            setAnalysisData({ unitMix: savedUnitMix || [] });
          } else {
            throw new Error(
              "Property not found and no temporary data available"
            );
          }
        } else {
          throw new Error("Failed to fetch property data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [propertyId]);

  const saveUnitMixData = async (updatedUnitData) => {
    try {
      if (isTemporaryProperty) {
        const tempPropertyData = localStorage.getItem(
          `temp_property_${propertyId}`
        );
        if (tempPropertyData) {
          const tempData = JSON.parse(tempPropertyData);
          tempData.unitMix = updatedUnitData;
          localStorage.setItem(
            `temp_property_${propertyId}`,
            JSON.stringify(tempData)
          );
        }
        return;
      }

      const response = await fetch(`/api/properties/${propertyId}/analysis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          analysisData: {
            ...analysisData,
            unitMix: updatedUnitData,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save unit mix data");
      }
    } catch (error) {}
  };

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
        const updatedUnitData = [...unitData, ...newUnits];
        setUnitData(updatedUnitData);
        saveUnitMixData(updatedUnitData);
      } else if (tempUnitCount < unitData.length) {
        const updatedUnitData = unitData.slice(0, tempUnitCount);
        setUnitData(updatedUnitData);
        saveUnitMixData(updatedUnitData);
      }
    }
  };

  const handleCancelClick = () => {
    setTempUnitCount(unitCount);
    setIsEditing(false);
  };

  const handleUnitDataChange = (unitId, field, value) => {
    const updatedUnitData = unitData.map((unit) =>
      unit.id === unitId ? { ...unit, [field]: value } : unit
    );
    setUnitData(updatedUnitData);

    saveUnitMixData(updatedUnitData);
  };

  const savePropertyToDatabase = async () => {
    if (!isTemporaryProperty) return;

    try {
      // First save the property
      const propertyResponse = await fetch(`/api/properties/${propertyId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: propertyData.address,
          basicInfo: propertyData.basicInfo || {},
          marketData: propertyData.marketData || {},
          // Include other property data from localStorage
          ...propertyData,
        }),
      });

      if (propertyResponse.ok) {
        // Then save the analysis data including current unit mix
        const analysisResponse = await fetch(
          `/api/properties/${propertyId}/analysis`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              analysisData: {
                unitMix: unitData, // Save current unit data
                // Include any other analysis data
                ...analysisData,
              },
            }),
          }
        );

        if (analysisResponse.ok) {
          localStorage.removeItem(`temp_property_${propertyId}`);
          setIsTemporaryProperty(false);
        }
      }
    } catch (error) {
      // Silent error handling for production
    }
  };

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

  const addressDisplay =
    propertyData?.originalAddress ||
    `${propertyData?.address?.street}, ${propertyData?.address?.city}, ${propertyData?.address?.state} ${propertyData?.address?.zip}` ||
    "Unknown Address";

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        {isTemporaryProperty && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 m-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-2">⚠️</span>
              This property hasn't been saved yet. Changes are stored locally.
            </div>
            <Button onClick={savePropertyToDatabase} size="sm">
              Save to Database
            </Button>
          </div>
        )}

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
              {addressDisplay}
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
