"use client";

import { useState } from "react";
import InvestorProfileForm from "@/components/forms/InvestorProfileForm";
import InvestmentPreferencesForm from "@/components/forms/InvestmentPreferencesForm";
import PropertyProfileForm from "@/components/forms/PropertyProfileForm";
import PropertyFeaturesForm from "@/components/forms/PropertyFeaturesForm";
import TargetMetricsForm from "@/components/forms/TargetMetricsForm";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DarkLightSwitch from "@/components/mode-toggle/dark-light-switch";

import styles from "./page.module.css"; // Keep your styles

export default function InvestmentStrategies() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [investmentDetails, setInvestmentDetails] = useState({
    investmentType: "",
    holdingPeriod: 1,
    acquisitionMargin: 0,
    outOfState: "No",
    financingOption: "",
    operationalPreferences: [],
    tenantPreferences: {
      landlordFriendly: "No",
      tenantClass: [],
      specialtyTenants: [],
    },
    propertyTypes: [],
    locations: [{ zipCode: "", radius: 10 }],
    areaType: [],
    schoolQuality: "Medium",
    crimeTolerance: "Some",
  });

  const [propertyFeatures, setPropertyFeatures] = useState({
    minSqft: "",
    maxSqft: "",
    minLotSize: "",
    minBedrooms: "",
    maxBedrooms: "",
    minBathrooms: "",
    maxBathrooms: "",
    condition: [],
    parking: [],
  });

  const [targetMetrics, setTargetMetrics] = useState({
    capRate: 6,
    cashOnCash: 8,
    dscr: 1.3,
    grm: 15,
  });

  const [showNotice, setShowNotice] = useState(true);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleInvestmentChange = (e) => {
    const { name, value } = e.target;
    setInvestmentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (field, value) => {
    setInvestmentDetails((prev) => {
      const current = prev[field];
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
  };

  const handleTenantClassChange = (value) => {
    setInvestmentDetails((prev) => ({
      ...prev,
      tenantPreferences: {
        ...prev.tenantPreferences,
        tenantClass: prev.tenantPreferences.tenantClass.includes(value)
          ? prev.tenantPreferences.tenantClass.filter((item) => item !== value)
          : [...prev.tenantPreferences.tenantClass, value],
      },
    }));
  };

  const handleSpecialtyTenantChange = (value) => {
    setInvestmentDetails((prev) => ({
      ...prev,
      tenantPreferences: {
        ...prev.tenantPreferences,
        specialtyTenants: prev.tenantPreferences.specialtyTenants.includes(
          value
        )
          ? prev.tenantPreferences.specialtyTenants.filter(
              (item) => item !== value
            )
          : [...prev.tenantPreferences.specialtyTenants, value],
      },
    }));
  };

  const addLocation = () => {
    setInvestmentDetails((prev) => ({
      ...prev,
      locations: [...prev.locations, { zipCode: "", radius: 10 }],
    }));
  };

  const handleLocationChange = (index, field, value) => {
    const updated = [...investmentDetails.locations];
    updated[index][field] = value;
    setInvestmentDetails((prev) => ({
      ...prev,
      locations: updated,
    }));
  };

  const handlePropertyFeaturesChange = (e) => {
    const { name, value } = e.target;
    setPropertyFeatures((prev) => ({ ...prev, [name]: value }));
  };

  const handleTargetMetricsChange = (e) => {
    const { name, value } = e.target;
    setTargetMetrics((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const profileResponse = await fetch(
        "/api/user-investment-strategies/investor-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            profileName: profile.name,
            email: profile.email,
            phone: profile.phone,
          }),
        }
      );

      if (!profileResponse.ok) {
        const errorData = await profileResponse.json();
        throw new Error(errorData.error || "Failed to save profile");
      }

      console.log("Profile:", profile);
      console.log("Investment Details:", investmentDetails);
      alert("Profile Saved! (Check Console)");
    } catch (error) {
      console.error("Error saving data:", error);
      alert(`Error saving data: ${error.message}`);
    }
  };

  const handleCloseNotice = () => {
    setShowNotice(false);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center justify-between px-8">
          <h1 className="text-2xl font-semibold">Investment Strategy</h1>
          <DarkLightSwitch />
        </header>

        <div className="flex flex-col gap-4 px-8 py-4">
          {showNotice && (
            <div className={styles.popupOverlay}>
              <div className={styles.popupBox}>
                <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  Welcome!{" "}
                </p>
                <p>
                  Taking a few minutes to fill in this page will enable Reana to
                  get you the information you need with the least amount of
                  input per property analyzed.
                </p>
                <button
                  onClick={handleCloseNotice}
                  className={styles.popupButton}
                >
                  OK
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <InvestorProfileForm
              profile={profile}
              onProfileChange={handleProfileChange}
            />
            <InvestmentPreferencesForm
              investmentDetails={investmentDetails}
              onInvestmentChange={handleInvestmentChange}
              onMultiSelectChange={handleMultiSelectChange}
            />
            <PropertyProfileForm
              investmentDetails={investmentDetails}
              onInvestmentChange={handleInvestmentChange}
              onMultiSelectChange={handleMultiSelectChange}
              onTenantClassChange={handleTenantClassChange}
              onSpecialtyTenantChange={handleSpecialtyTenantChange}
              onLocationChange={handleLocationChange}
              addLocation={addLocation}
            />
            <PropertyFeaturesForm
              propertyFeatures={propertyFeatures}
              onPropertyFeaturesChange={handlePropertyFeaturesChange}
            />
            <TargetMetricsForm
              metrics={targetMetrics}
              onMetricChange={handleTargetMetricsChange}
            />

            <button type="submit" className={styles.submitButton}>
              Save Profile
            </button>
          </form>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
