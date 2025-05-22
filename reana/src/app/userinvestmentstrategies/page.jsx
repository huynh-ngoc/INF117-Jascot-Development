"use client";

import { useEffect, useState } from "react";
import InvestorProfileForm from "@/components/forms/InvestorProfileForm";
import InvestmentPreferencesForm from "@/components/forms/InvestmentPreferencesForm";
import PropertyProfileForm from "@/components/forms/PropertyProfileForm";
import PropertyFeaturesForm from "@/components/forms/PropertyFeaturesForm";
import TargetMetricsForm from "@/components/forms/TargetMetricsForm";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DarkLightSwitch from "@/components/mode-toggle/dark-light-switch";

export default function InvestmentStrategies() {
  const [profileName, setProfileName] = useState("");
  const [existingProfiles, setExistingProfiles] = useState([
    "JohnDoe",
    "JaneSmith",
  ]);
  const [isNewProfile, setIsNewProfile] = useState(false);
  const [userType, setUserType] = useState("User");

  const [hasChanges, setHasChanges] = useState(false);
  const [showDefaultPopup, setShowDefaultPopup] = useState(false);
  const [showNotice, setShowNotice] = useState(true);

  const [profile, setProfile] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    license: "",
    company: "",
  });

  const [investmentDetails, setInvestmentDetails] = useState({
    // Investment Preferences Section
    investmentType: "",
    holdingPeriod: 1,
    acquisitionMargin: 0,
    outOfState: "No",
    financingOption: "",
    operationalPreferences: [],
    //--------------------------

    // Property Profile Section
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
    //--------------------------
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

  // Show popup after changes
  // useEffect(() => {
  //   if (hasChanges) {
  //     const timer = setTimeout(() => {
  //       setShowDefaultPopup(true);
  //       setHasChanges(false);
  //     }, 500);
  //     return () => clearTimeout(timer);
  //   }
  // }, [hasChanges]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setHasChanges(true);
  };

  const handleInvestmentChange = (e) => {
    const { name, value } = e.target;
    setInvestmentDetails((prev) => ({ ...prev, [name]: value }));
    setHasChanges(true);
  };

  const handleMultiSelectChange = (field, value) => {
    setInvestmentDetails((prev) => {
      const current = prev[field] || [];
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
    setHasChanges(true);
    console.log("Investment Details:", investmentDetails);
  };

  const handlePropertyMultiSelectChange = (field, value) => {
    setPropertyFeatures((prev) => {
      const current = prev[field] || [];
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
    setHasChanges(true);
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
    setHasChanges(true);
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
    setHasChanges(true);
  };

  const addLocation = () => {
    setInvestmentDetails((prev) => ({
      ...prev,
      locations: [...prev.locations, { zipCode: "", radius: 10 }],
    }));
    setHasChanges(true);
  };

  const handleLocationChange = (index, field, value) => {
    const updated = [...investmentDetails.locations];
    updated[index][field] = value;
    setInvestmentDetails((prev) => ({
      ...prev,
      locations: updated,
    }));
    setHasChanges(true);
    console.log(investmentDetails.locations);
  };

  const handlePropertyFeaturesChange = (e) => {
    const { name, value } = e.target;
    setPropertyFeatures((prev) => ({ ...prev, [name]: value }));
    setHasChanges(true);
  };

  const handleTargetMetricsChange = (e) => {
    const { name, value } = e.target;
    setTargetMetrics((prev) => ({ ...prev, [name]: parseFloat(value) }));
    setHasChanges(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profileName) {
      alert("Please enter or select a profile name.");
      return;
    }

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

      // Investment Preferences Section
      const investPrefResponse = await fetch(
        "/api/user-investment-strategies/investment-preferences",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            investmentType: investmentDetails.investmentType,
            holdingPeriod: investmentDetails.holdingPeriod,
            acquisitionMargin: investmentDetails.acquisitionMargin,
            outOfState: investmentDetails.outOfState,
            financingOption: investmentDetails.financingOption,
            operationalPreferences: investmentDetails.operationalPreferences,
          }),
        }
      );

      if (!investPrefResponse.ok) {
        const errorData = await investPrefResponse.json();
        throw new Error(
          errorData.error || "Failed to save investment preferences"
        );
      }

      // Property Profile Section

      const propertyProfileResponse = await fetch(
        "/api/user-investment-strategies/property-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            landlordFriendly:
              investmentDetails.tenantPreferences.landlordFriendly,
            tenantClass: investmentDetails.tenantPreferences.tenantClass,
            specialtyTenants:
              investmentDetails.tenantPreferences.specialtyTenants,
            propertyTypes: investmentDetails.propertyTypes,
            locations: investmentDetails.locations,
            areaType: investmentDetails.areaType,
            schoolQuality: investmentDetails.schoolQuality,
            crimeTolerance: investmentDetails.crimeTolerance,
          }),
        }
      );
      if (!propertyProfileResponse.ok) {
        const errorData = await propertyProfileResponse.json();
        throw new Error(errorData.error || "Failed to save property profile");
      }

      // Property Features Section
      const propertyFeaturesResponse = await fetch(
        "/api/user-investment-strategies/property-features",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            minSqft: propertyFeatures.minSqft,
            maxSqft: propertyFeatures.maxSqft,
            minLotSize: propertyFeatures.minLotSize,
            minBedrooms: propertyFeatures.minBedrooms,
            maxBedrooms: propertyFeatures.maxBedrooms,
            minBathrooms: propertyFeatures.minBathrooms,
            maxBathrooms: propertyFeatures.maxBathrooms,
            condition: propertyFeatures.condition,
            parking: propertyFeatures.parking,
          }),
        }
      );
      if (!propertyFeaturesResponse.ok) {
        const errorData = await propertyFeaturesResponse.json();
        throw new Error(errorData.error || "Failed to save property features");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert(`Error saving data: ${error.message}`);
    }

    console.log("Profile Name:", profileName);
    console.log("User Type:", userType);
    console.log("Profile:", profile);
    console.log("Investment Details:", investmentDetails);
    alert("Profile Saved! (Check Console)");
  };

  const handleCloseNotice = () => {
    setShowNotice(false);
  };

  useEffect(() => {
    if (
      userType === "Realtor" &&
      profile.name &&
      investmentDetails.investmentType
    ) {
      const firstInitial = profile.name.trim().charAt(0);
      const lastName = profile.name.trim().split(" ").slice(-1)[0];
      const investment = investmentDetails.investmentType.replace(/\s/g, "");
      setProfileName(`${firstInitial}${lastName}${investment}`);
    }
  }, [userType, profile.name, investmentDetails.investmentType]);

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
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
                <p className="text-lg font-semibold mb-2">Welcome!</p>
                <p className="text-sm mb-4">
                  Taking a few minutes to fill in this page will enable Reana to
                  get you the information you need with the least amount of
                  input per property analyzed.
                </p>
                <button
                  onClick={handleCloseNotice}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  OK
                </button>
              </div>
            </div>
          )}

          {showDefaultPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
                <p className="text-lg font-semibold mb-2">Set New Default?</p>
                <p className="text-sm mb-4">
                  You've updated your strategy. Would you like to set this as
                  your new default?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setShowDefaultPopup(false);
                      console.log("✅ Set as new default");
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowDefaultPopup(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Profile Selection + Role */}
          <div>
            <label className="font-medium block mb-1">
              Select Profile Name
            </label>
            <select
              className="border p-2 rounded w-full"
              value={isNewProfile ? "new" : profileName}
              onChange={(e) => {
                if (e.target.value === "new") {
                  setIsNewProfile(true);
                  setProfileName("");
                } else {
                  setIsNewProfile(false);
                  setProfileName(e.target.value);
                }
              }}
            >
              <option value="">Select Profile</option>
              {existingProfiles.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
              <option value="new">+ New Profile</option>
            </select>

            {isNewProfile && userType === "User" && (
              <input
                className="mt-2 border p-2 rounded w-full"
                type="text"
                maxLength={12}
                placeholder="Enter new profile name (max 12 chars)"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
              />
            )}

            <label className="block mt-4 font-medium">Role</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="User">User</option>
              <option value="Realtor">Realtor</option>
            </select>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
            <InvestorProfileForm
              profile={profile}
              onProfileChange={handleProfileChange}
              userType={userType}
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
              onMultiSelectChange={handlePropertyMultiSelectChange}
            />
            <TargetMetricsForm
              metrics={targetMetrics}
              onMetricChange={handleTargetMetricsChange}
            />

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 self-start"
            >
              Save Profile
            </button>
          </form>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
