import Section from "@/components/ui/Section";
import SelectField from "@/components/ui/SelectField";
import MultiCheckboxGroup from "@/components/ui/MultiCheckboxGroup";
import InputField from "@/components/ui/InputField";

export default function PropertyProfileForm({
  investmentDetails,
  onInvestmentChange,
  onMultiSelectChange,
  onTenantClassChange,
  onSpecialtyTenantChange,
  onLocationChange,
  addLocation,
}) {
  return (
    <Section title="Property Profile">
      {/* --- Landlord Friendly --- */}
      <div className="form-group">
        <label htmlFor="landlordFriendly">Landlord Friendly Laws Required</label>
        <SelectField
          name="landlordFriendly"
          value={investmentDetails.tenantPreferences.landlordFriendly}
          onChange={(e) =>
            onInvestmentChange({
              target: {
                name: "tenantPreferences",
                value: {
                  ...investmentDetails.tenantPreferences,
                  landlordFriendly: e.target.value,
                },
              },
            })
          }
          options={[
            { value: "No", label: "No" },
            { value: "Yes", label: "Yes" },
          ]}
        />
      </div>

      {/* --- Desired Tenant Class --- */}
      <div className="form-group">
        <label className="block font-medium mb-2">
          Desired Tenant Class <span className="text-sm text-gray-500">(Select all that apply)</span>
        </label>
        <div className="checkbox-grid">
          <MultiCheckboxGroup
            options={[
              { value: "Affluent", label: "Affluent" },
              { value: "High-End", label: "High-End" },
              { value: "Middle Class", label: "Middle Class" },
              { value: "Working Professionals", label: "Working Professionals" },
              { value: "Working Class", label: "Working Class" },
              { value: "May Need Assistance", label: "May Need Assistance" },
              { value: "Low Income", label: "Low Income" },
              { value: "Higher Risk", label: "Higher Risk" },
            ]}
            selected={investmentDetails.tenantPreferences.tenantClass}
            onChange={onTenantClassChange}
          />
        </div>
      </div>

      {/* --- Specialty Tenants --- */}
      <div className="form-group">
        <label className="block font-medium mb-2">
          Specialty Tenants <span className="text-sm text-gray-500">(Select all that apply)</span>
        </label>
        <div className="checkbox-grid">
          <MultiCheckboxGroup
            options={[
              { value: "Traveling Nurses", label: "Traveling Nurses" },
              { value: "Student Housing", label: "Student Housing" },
              { value: "Corporate", label: "Corporate" },
              { value: "Senior Living", label: "Senior Living" },
              { value: "Shared Living", label: "Shared Living" },
            ]}
            selected={investmentDetails.tenantPreferences.specialtyTenants}
            onChange={onSpecialtyTenantChange}
          />
        </div>
      </div>

      {/* --- Property Types --- */}
      <div className="form-group">
        <label className="block font-medium mb-2">
          Property Types <span className="text-sm text-gray-500">(Select all that apply)</span>
        </label>
        <div className="checkbox-grid">
          <MultiCheckboxGroup
            options={[
              { value: "Single Family", label: "Single Family" },
              { value: "Duplex", label: "Duplex" },
              { value: "Triplex", label: "Triplex" },
              { value: "Fourplex", label: "Fourplex" },
              { value: "5+ Units", label: "5+ Units" },
              { value: "Mixed Use", label: "Mixed Use" },
            ]}
            selected={investmentDetails.propertyTypes}
            onChange={(value) => onMultiSelectChange("propertyTypes", value)}
          />
        </div>
      </div>

      {/* --- Property Locations --- */}
      <div className="form-group">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-base">Property Locations</h3>
          <button
            type="button"
            onClick={addLocation}
            className="text-blue-600 hover:underline text-sm"
          >
            + Add Another Location
          </button>
        </div>

        {investmentDetails.locations.map((loc, index) => (
          <div key={index} className="location-entry mb-4">
            <label className="block mb-1">The Property is located within:</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="100"
                value={loc.radius}
                onChange={(e) => onLocationChange(index, "radius", e.target.value)}
                className="slider w-40"
              />
              <span className="text-sm">{loc.radius} Miles of</span>
              <input
                type="text"
                className="zip-input border rounded px-2 py-1"
                placeholder="Zip Code"
                value={loc.zipCode}
                onChange={(e) => onLocationChange(index, "zipCode", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* --- Area Type --- */}
      <div className="form-group">
        <label className="block font-medium mb-2">
          Area Type <span className="text-sm text-gray-500">(Select all that apply)</span>
        </label>
        <div className="checkbox-grid">
          <MultiCheckboxGroup
            options={[
              { value: "Urban", label: "Urban" },
              { value: "Suburban", label: "Suburban" },
              { value: "Rural", label: "Rural" },
            ]}
            selected={investmentDetails.areaType}
            onChange={(value) => onMultiSelectChange("areaType", value)}
          />
        </div>
      </div>

      {/* --- School Quality --- */}
      <div className="form-group">
        <label htmlFor="schoolQuality">School Quality Importance</label>
        <SelectField
          name="schoolQuality"
          value={investmentDetails.schoolQuality}
          onChange={onInvestmentChange}
          options={[
            { value: "Low", label: "Low" },
            { value: "Medium", label: "Medium" },
            { value: "High", label: "High" },
          ]}
        />
      </div>

      {/* --- Crime Tolerance --- */}
      <div className="form-group">
        <label htmlFor="crimeTolerance">Crime Tolerance</label>
        <SelectField
          name="crimeTolerance"
          value={investmentDetails.crimeTolerance}
          onChange={onInvestmentChange}
          options={[
            { value: "Avoid High", label: "Avoid High Crime" },
            { value: "Some", label: "Okay with Some Crime" },
            { value: "Open", label: "Open to All" },
          ]}
        />
      </div>
    </Section>
  );
}
