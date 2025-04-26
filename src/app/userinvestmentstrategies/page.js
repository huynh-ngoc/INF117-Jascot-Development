"use client";

import { useState } from "react";
import InvestorProfileForm from "@/components/InvestorProfileForm";
import InvestmentPreferencesForm from "@/components/InvestmentPreferencesForm";
import PropertyProfileForm from "@/components/PropertyProfileForm";
import PropertyFeaturesForm from "@/components/PropertyFeaturesForm";
import TargetMetricsForm from "@/components/TargetMetricsForm";
import styles from "./page.module.css"; 


// THIS FUNCTION WRAPS EVERYTHING
export default function InvestmentStrategies() {
  
  // --- All your useState here ---
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
  
  
  

  // --- All your handlers here ---
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleInvestmentChange = (e) => {
    const { name, value } = e.target;
    setInvestmentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (field, value) => {
    setInvestmentDetails((prevDetails) => {
      const current = prevDetails[field];
      if (current.includes(value)) {
        return { ...prevDetails, [field]: current.filter((item) => item !== value) };
      } else {
        return { ...prevDetails, [field]: [...current, value] };
      }
    });
  };

  const handleTenantClassChange = (value) => {
    setInvestmentDetails((prevDetails) => ({
      ...prevDetails,
      tenantPreferences: {
        ...prevDetails.tenantPreferences,
        tenantClass: prevDetails.tenantPreferences.tenantClass.includes(value)
          ? prevDetails.tenantPreferences.tenantClass.filter((item) => item !== value)
          : [...prevDetails.tenantPreferences.tenantClass, value],
      },
    }));
  };

  const handleSpecialtyTenantChange = (value) => {
    setInvestmentDetails((prevDetails) => ({
      ...prevDetails,
      tenantPreferences: {
        ...prevDetails.tenantPreferences,
        specialtyTenants: prevDetails.tenantPreferences.specialtyTenants.includes(value)
          ? prevDetails.tenantPreferences.specialtyTenants.filter((item) => item !== value)
          : [...prevDetails.tenantPreferences.specialtyTenants, value],
      },
    }));
  };

  const addLocation = () => {
    setInvestmentDetails((prevDetails) => ({
      ...prevDetails,
      locations: [...prevDetails.locations, { zipCode: "", radius: 10 }],
    }));
  };

  const handleLocationChange = (index, field, value) => {
    const updatedLocations = [...investmentDetails.locations];
    updatedLocations[index][field] = value;
    setInvestmentDetails((prevDetails) => ({
      ...prevDetails,
      locations: updatedLocations,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile:", profile);
    console.log("Investment Details:", investmentDetails);
    alert("Profile Saved! (Check Console)");
  };

  const handlePropertyFeaturesChange = (e) => {
    const { name, value } = e.target;
    setPropertyFeatures((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTargetMetricsChange = (e) => {
    const { name, value } = e.target;
    setTargetMetrics((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };
  
  
  

  // --- RETURN YOUR HTML HERE ---
  return (
    <div className={styles.container}>
       <h1 className={styles.pageTitle}>Manage Investment Strategies & Preferences</h1>
      <form onSubmit={handleSubmit}>
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


        <button type="submit" className={styles.submitButton}>Save Profile</button>
      </form>
    </div>
  );
}
