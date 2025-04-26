"use client"; 
import { useState } from "react";

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
    outOfState: "no",
    financingOption: "",
    operationalPreferences: [],
    tenantPreferences: {
      landlordFriendly: "no",
      tenantClass: [],
      specialtyTenants: [],
    },
    propertyTypes: [],
    locations: [{ zipCode: "", radius: 10 }],
    areaType: [],
    schoolQuality: "medium",
    crimeTolerance: "some",
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleInvestmentChange = (e) => {
    setInvestmentDetails({ ...investmentDetails, [e.target.name]: e.target.value });
  };

  const addLocation = () => {
    setInvestmentDetails({
      ...investmentDetails,
      locations: [...investmentDetails.locations, { zipCode: "", radius: 10 }],
    });
  };

  const handleLocationChange = (index, field, value) => {
    const updatedLocations = [...investmentDetails.locations];
    updatedLocations[index][field] = value;
    setInvestmentDetails({ ...investmentDetails, locations: updatedLocations });
  };

  const handleMultiSelectChange = (field, value) => {
    setInvestmentDetails((prevState) => {
      const current = prevState[field];
      if (current.includes(value)) {
        return { ...prevState, [field]: current.filter((item) => item !== value) };
      } else {
        return { ...prevState, [field]: [...current, value] };
      }
    });
  };

  const handleTenantClassChange = (value) => {
    setInvestmentDetails((prevState) => {
      const current = prevState.tenantPreferences.tenantClass;
      const updatedTenantClass = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return {
        ...prevState,
        tenantPreferences: { ...prevState.tenantPreferences, tenantClass: updatedTenantClass },
      };
    });
  };

  const handleSpecialtyTenantChange = (value) => {
    setInvestmentDetails((prevState) => {
      const current = prevState.tenantPreferences.specialtyTenants;
      const updatedSpecialtyTenants = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return {
        ...prevState,
        tenantPreferences: { ...prevState.tenantPreferences, specialtyTenants: updatedSpecialtyTenants },
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile:", profile);
    console.log("Investment Details:", investmentDetails);
    alert("Profile saved! (Check console for details.)");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Manage Investment Strategies & Preferences</h1>
      <form onSubmit={handleSubmit}>
        <h2>Investor Profile</h2>
        <input name="name" placeholder="Profile Name" onChange={handleProfileChange} required /><br/>
        <input name="email" placeholder="Email" onChange={handleProfileChange} required /><br/>
        <input name="phone" placeholder="Phone" onChange={handleProfileChange} /><br/>

        <h2>Investment Preferences</h2>
        <label>Type of Investment (required):</label><br/>
        <select name="investmentType" onChange={handleInvestmentChange} required>
          <option value="">Select...</option>
          <option value="fix_n_flip">Fix n Flip</option>
          <option value="brrr">BRRR</option>
          <option value="ltr">Long Term Rental (LTR)</option>
          <option value="str">Short Term Rental (STR)</option>
        </select><br/>

        <label>Target Holding Period (years): {investmentDetails.holdingPeriod}</label><br/>
        <input type="range" name="holdingPeriod" min="1" max="10" value={investmentDetails.holdingPeriod} onChange={handleInvestmentChange} /><br/>

        <label>Desired Acquisition Margin (% of ARV): {investmentDetails.acquisitionMargin}%</label><br/>
        <input type="range" name="acquisitionMargin" min="0" max="100" value={investmentDetails.acquisitionMargin} onChange={handleInvestmentChange} /><br/>

        <label>Open to Out-of-State Investing?</label><br/>
        <select name="outOfState" onChange={handleInvestmentChange}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select><br/>

        <label>Acquisition Financing Option (required):</label><br/>
        <select name="financingOption" onChange={handleInvestmentChange} required>
          <option value="">Select...</option>
          <option value="cash">Pay Cash</option>
          <option value="conventional">Conventional Loan</option>
          <option value="dscr_fix_flip">DSCR Bridge Loan for Fix n Flip</option>
          <option value="dscr_brrr">DSCR Bridge + Permanent Loan for BRRR</option>
          <option value="seller_financing">Seller Financing</option>
        </select><br/>

        <label>Operational Preferences (select multiple):</label><br/>
        {["property_manager", "self_managed", "rehab_contractor", "self_contracted", "maintenance_contractors", "self_maintained", "tenant_screening_outsourced", "self_tenant_acquisition"]
          .map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                onChange={() => handleMultiSelectChange("operationalPreferences", option)}
                checked={investmentDetails.operationalPreferences.includes(option)}
              />
              {option.replace(/_/g, " ")}
            </label>
          ))}
        <br/>

        <h2>Property Profile</h2>
        <label>Landlord-friendly laws required?</label><br/>
        <select name="landlordFriendly" onChange={(e) => {
          setInvestmentDetails({
            ...investmentDetails,
            tenantPreferences: { ...investmentDetails.tenantPreferences, landlordFriendly: e.target.value }
          });
        }}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select><br/>

        <label>Desired Tenant Class:</label><br/>
        {["affluent", "high-end", "middle_class", "working_professionals", "working_class", "may_need_assistance", "low_income", "higher_risk"]
          .map((value) => (
            <label key={value}>
              <input
                type="checkbox"
                onChange={() => handleTenantClassChange(value)}
                checked={investmentDetails.tenantPreferences.tenantClass.includes(value)}
              />
              {value.replace(/_/g, " ")}
            </label>
          ))}
        <br/>

        <label>Specialty Tenants:</label><br/>
        {["traveling_nurses", "student_housing", "corporate", "senior_living", "shared_living"]
          .map((value) => (
            <label key={value}>
              <input
                type="checkbox"
                onChange={() => handleSpecialtyTenantChange(value)}
                checked={investmentDetails.tenantPreferences.specialtyTenants.includes(value)}
              />
              {value.replace(/_/g, " ")}
            </label>
          ))}
        <br/>

        <label>Property Types:</label><br/>
        {["single_family", "duplex", "triplex", "fourplex", "5+_units", "mixed_use"]
          .map((value) => (
            <label key={value}>
              <input
                type="checkbox"
                onChange={() => handleMultiSelectChange("propertyTypes", value)}
                checked={investmentDetails.propertyTypes.includes(value)}
              />
              {value.replace(/_/g, " ")}
            </label>
          ))}
        <br/>

        <h3>Property Locations</h3>
        {investmentDetails.locations.map((loc, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Zip Code"
              value={loc.zipCode}
              onChange={(e) => handleLocationChange(index, "zipCode", e.target.value)}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={loc.radius}
              onChange={(e) => handleLocationChange(index, "radius", e.target.value)}
            />
            {loc.radius} miles
          </div>
        ))}
        <button type="button" onClick={addLocation}>+ Add Another Location</button><br/>

        <label>Area Type (select all that apply):</label><br/>
        {["urban", "suburban", "rural"].map((area) => (
          <label key={area}>
            <input
              type="checkbox"
              onChange={() => handleMultiSelectChange("areaType", area)}
              checked={investmentDetails.areaType.includes(area)}
            />
            {area}
          </label>
        ))}
        <br/>

        <label>School Quality Importance:</label><br/>
        <select name="schoolQuality" onChange={handleInvestmentChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select><br/>

        <label>Crime Tolerance:</label><br/>
        <select name="crimeTolerance" onChange={handleInvestmentChange}>
          <option value="avoid_high">Avoid High Crime</option>
          <option value="some">Okay with Some Crime</option>
          <option value="open">Open to All</option>
        </select><br/>

        <br/>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}


